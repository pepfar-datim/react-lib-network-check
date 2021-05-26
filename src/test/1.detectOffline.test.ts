import { mockNetworkState, setupTestEnv } from "./lib/setupTestEnv";
import {screen} from "@testing-library/react";
import { NetworkState } from "../types/networkState.type";
import {noText, pause} from "@dhis2-app/test-tools";

// beforeEach(()=>setupTestEnv());
//
// describe('Should detect offline/online',()=>{
//     it('Should detect offline/online',async ()=>{
//         await pause(0.2);
//         noText(`You're now offline`);
//         mockNetworkState(NetworkState.offline);
//         await screen.findByText(`You're now offline`);
//         mockNetworkState(NetworkState.online);
//         await screen.findByText(`You're back online`);
//     });
// });

beforeEach(()=>setupTestEnv());

test('Should detect offline/online',async ()=>{
    await pause(0.2);
    noText(`You're now offline`);
    mockNetworkState(NetworkState.offline);
    await screen.findByText(`You're now offline`);
    mockNetworkState(NetworkState.online);
    await screen.findByText(`You're back online`);
});
