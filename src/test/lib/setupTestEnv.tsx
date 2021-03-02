import {render} from "@testing-library/react";
import React from "react";
import { SnackbarProvider } from "notistack";
import NetworkCheck from "../../index";
import { NetworkState } from "../../types/networkState.type";

export let testNetworkState:NetworkState = NetworkState.online;

export function mockNetworkState(newState:NetworkState){
    testNetworkState = newState;
}

export function setupTestEnv(){
    render(<SnackbarProvider>
        <NetworkCheck intervalMs={50} networkCheckTimeoutS={2} baseUrl={'https://x/'}/>
    </SnackbarProvider>)
}
