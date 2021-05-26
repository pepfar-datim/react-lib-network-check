export function testUrl(url:string){
    if (!/\/$/.test(url)) throw new Error(`Provided url must end with \/'\nReceived: ${url}`);
}
