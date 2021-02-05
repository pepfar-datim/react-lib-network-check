import { NetworkState } from "../../types/networkState.type";
import { testNetworkState } from "./setupTestEnv";

export type HttpMock = ()=>Promise<any>;

export const httpMock:HttpMock = ()=>{
  switch(testNetworkState){
    case NetworkState.online: return Promise.resolve({ok: true});
    case NetworkState.offline: return Promise.reject();
    case NetworkState.expired: return Promise.resolve({ok:false});
  }
};
