import * as React from "react";
import {ReactText} from "react";
import {OptionsObject, SnackbarKey, SnackbarMessage, withSnackbar} from "notistack";
import {NetworkState} from "./types/networkState.type";
import {checkNetwork} from "./services/checkNetwork.service";
import {testUrl} from "./services/testUrl.service";

interface Props{
    intervalMs: number;
    networkCheckTimeoutS: number;
    baseUrl: string;
}

const noNetwork:(netorkState:NetworkState)=>boolean = (networkState:NetworkState)=> [NetworkState.offline,NetworkState.expired].includes(networkState);

class NetworkCheck extends React.Component<{
    enqueueSnackbar: (message: SnackbarMessage, options?: OptionsObject) => SnackbarKey;
    closeSnackbar: (key?: SnackbarKey) => void;
    intervalMs: number;
    networkCheckTimeoutS: number;
    baseUrl: string;
},{}>{
    constructor(props:any) {
        super(props);
        testUrl(this.props.baseUrl);
        if (this.props.intervalMs) this.interval = setInterval(this.checkNetwork, this.props.intervalMs);
    }
    interval:NodeJS.Timeout|null=null;
    checkInProgress=false;
    currentState:{
        networkState: NetworkState,
        dialog: ReactText|null,
        from: Date|null
    } = {
        networkState: NetworkState.online,
        dialog: null,
        from: null
    }
    tooOld = (fromDate:Date)=>{
        let from = fromDate.getTime();
        let now = (new Date()).getTime();
        return (now-from)>this.props.networkCheckTimeoutS*1000;
    }

    checkNetwork = async ()=>{
        if (this.checkInProgress) return;
        this.checkInProgress = true;
        let newState:NetworkState = await checkNetwork(this.props.baseUrl);
        this.checkInProgress = false;
        if (this.currentState.networkState===NetworkState.online&&newState===NetworkState.online) return;
        if (this.currentState.networkState===NetworkState.online&&noNetwork(newState)) return this.goOffline(newState);
        if (noNetwork(this.currentState.networkState)&&newState===NetworkState.online) return this.goOnline();
        if (noNetwork(this.currentState.networkState)&&newState===NetworkState.offline&&this.tooOld(this.currentState.from as Date)) clearInterval(this.interval as NodeJS.Timeout);
    }

    goOffline = (newState:NetworkState)=>{
        let message;
        if (newState===NetworkState.offline) message = `You're now offline`;
        else message = `Your DATIM session has expired. Try logging back in other tab.`
        this.currentState = {
            networkState: newState,
            dialog:  this.props.enqueueSnackbar(message, {variant:'error', persist: true}),
            from: new Date()
        }
    }

    goOnline = ()=>{
        this.currentState = {
            networkState: NetworkState.online,
            dialog:  this.props.enqueueSnackbar(`You're back online`, {variant:'success'}),
            from: new Date()
        }
    }

    render(){
        return null;
    }
}

export default withSnackbar(NetworkCheck) as any as React.ElementType<Props>;
