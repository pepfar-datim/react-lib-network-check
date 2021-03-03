import {mockNetworkState, setupTestEnv} from "./lib/setupTestEnv";
import {noText, pause} from "@dhis2-app/test-tools";
import {NetworkState} from "../types/networkState.type";
import {screen} from "@testing-library/react";
import {lastCheck} from "./lib/httpMock.service";

beforeEach(()=>setupTestEnv());

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
    it('Should timeout when offline',async ()=>{
        await pause(0.2);
        noText(`You're now offline`);
        await lastCheckUpdated(true);
        mockNetworkState(NetworkState.offline);
        await screen.findByText(`You're now offline`);
        await lastCheckUpdated(true);
        await pause(2.5);
        await lastCheckUpdated(false);
    });

    it('Should timeout on session expire',async ()=>{
        await pause(0.2);
        noText(`session has expired`);
        await lastCheckUpdated(true);
        mockNetworkState(NetworkState.expired);
        await screen.findByText(/session has expired/);
        await lastCheckUpdated(true);
        await pause(2.5);
        await lastCheckUpdated(false);
    });
});