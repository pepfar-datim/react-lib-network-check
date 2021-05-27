import {mockNetworkState, setupTestEnv} from "./lib/setupTestEnv";
import {/*debug, */noText, pause} from "@pepfar-react-lib/jest-tools";
import {NetworkState} from "../types/networkState.type";
import {cleanup, screen} from "@testing-library/react";
import {lastCheck} from "./lib/httpMock.service";

beforeEach(setupTestEnv);
afterEach(cleanup);


async function lastCheckUpdated(updated:boolean):Promise<any>{
    let previous:number = lastCheck?.getTime() as number;
    await pause(0.2);
    let now:number = lastCheck?.getTime() as number;
    if (updated) {
        expect(now).toBeGreaterThan(previous);
        expect(now).not.toEqual(previous);
    }
    else expect(now).toEqual(previous);
}

describe('Network check should timeout after 5 min',()=>{
    test('Should timeout when offline',async ()=>{
        await pause(0.1);
        noText(`You're now offline`);
        await lastCheckUpdated(true);
        mockNetworkState(NetworkState.offline);
        await screen.findByText(`You're now offline`);
        await lastCheckUpdated(true);
        await pause(1);
        await lastCheckUpdated(false);
    });

    test('Should timeout on session expire',async ()=>{
        await pause(0.1);
        noText(`session has expired`);
        await lastCheckUpdated(true);
        mockNetworkState(NetworkState.expired);
        await screen.findByText(/session has expired/);
        await lastCheckUpdated(true);
        await pause(1);
        await lastCheckUpdated(false);
    });
});