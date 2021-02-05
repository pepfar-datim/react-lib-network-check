import * as React from "react";
import { ReactText } from "react";
import { OptionsObject, SnackbarKey, SnackbarMessage, withSnackbar } from "notistack";
import { NetworkState } from "./types/networkState.type";
import { checkNetwork } from "./services/checkNetwork.service";
import { testUrl } from "./services/testUrl.service";

interface Props{
    intervalMs: number;
    baseUrl: string;
}

class NetworkCheck extends React.Component<{
    enqueueSnackbar: (message: SnackbarMessage, options?: OptionsObject) => SnackbarKey;
    closeSnackbar: (key?: SnackbarKey) => void;
    intervalMs: number;
    baseUrl: string;
},{}>{
    constructor(props:any) {
        super(props);
        testUrl(this.props.baseUrl);
        if (this.props.intervalMs) setInterval(this.checkNetwork, this.props.intervalMs);
    }
    isOfflineMessage:ReactText|null=null;
    checkNetwork = async ()=>{
        let networkState:NetworkState = await checkNetwork(this.props.baseUrl);
        if (this.isOfflineMessage&&networkState===NetworkState.online) {
            this.props.closeSnackbar(this.isOfflineMessage);
            this.isOfflineMessage=null;
            this.props.enqueueSnackbar(`You're back online`, {variant:'success'});
        }
        if (!this.isOfflineMessage&&[NetworkState.offline,NetworkState.expired].includes(networkState)){
            let message;
            if (networkState===NetworkState.offline) message = `You're now offline`;
            else message = `Your DATIM session has expired. Try logging back in other tab.`
            this.isOfflineMessage = this.props.enqueueSnackbar(message, {variant:'error', persist: true});
        }
    }
    render(){
        return null;
    }
}

export default withSnackbar(NetworkCheck) as any as React.ElementType<Props>;
