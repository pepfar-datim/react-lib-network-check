export function testUrl(url:string){
    if (!/https:\/\/.+\//.test(url)) throw new Error(`Provided url must be in form 'https://xxx/'\nReceived: ${url}`);
}
