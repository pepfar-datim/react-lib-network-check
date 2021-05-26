import {render} from "@testing-library/react";
import React from "react";
import {SnackbarProvider} from "notistack";
import NetworkCheck from "../../index";
import {NetworkState} from "../../types/networkState.type";

export let testNetworkState:NetworkState = NetworkState.online;

export function mockNetworkState(newState:NetworkState){
    testNetworkState = newState;
}

export function setupTestEnv(){
    // console.log('set up #1\n\n\n\n\n\n')
    mockNetworkState(NetworkState.online);
    render(<SnackbarProvider>
        <NetworkCheck intervalMs={50} networkCheckTimeoutS={1} baseUrl={'https://x/'}/>
    </SnackbarProvider>)
}
