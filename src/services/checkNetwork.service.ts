import { NetworkState } from "../types/networkState.type";
import {HttpMock} from "../test/lib/httpMock.service";

let httpMock:HttpMock;
if (process.env.NODE_ENV==='test') httpMock = require('../test/lib/httpMock.service').httpMock;

function reachServer(baseUrl:string):Promise<any>{
    if (httpMock) return httpMock();
    else return fetch(baseUrl+'api/me?fields=id', {credentials:'include'});
}

export async function checkNetwork(baseUrl:string):Promise<NetworkState>{
    try {
        let response = await reachServer(baseUrl);
        if (!response.redirected) return NetworkState.online;
        else return NetworkState.expired;
    } catch (e){
        return NetworkState.offline;
    }
}
