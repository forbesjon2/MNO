const WebSocket = require('ws');

function initWebsocket(existingWebsocket, URL) {
    var timeoutMs = 5000
    URL = [URL == null ? "ws://localhost:8080" : URL];
    var numberOfRetries = 10;
    var hasReturned = false;
    var promise = new Promise((resolve, reject) => {
        setTimeout(function () {if(!hasReturned) rejectInternal();}, timeoutMs);
        
        if (!existingWebsocket || existingWebsocket["target"]["readyState"] != 1) {
            //if a ws exists but it is not open, close it
            if (existingWebsocket) existingWebsocket.close(); 
            //initialize a ws
            var websocket = new WebSocket(URL);
            websocket.onopen = (ws) => [hasReturned ? websocket.close() : resolve(ws)];
            websocket.on('close', ()=> rejectInternal());
            websocket.on('error', () => rejectInternal());
        } else {
            resolve(existingWebsocket);
        }
        //Runs after a closed/failed connection. Reduces # of retries or rejects
        function rejectInternal() {
            if(numberOfRetries <= 0) {
                reject();
            } else if(!hasReturned) {
                hasReturned = true;
                initWebsocket(URL, null, timeoutMs, numberOfRetries-1).then(resolve, reject);
            }
        }
    });
    promise.then(function () {hasReturned = true;}, function () {hasReturned = true;});
    return promise;
}


initWebsocket().then((ws) =>{
    console.log(ws["target"]["readyState"]);
    ws.close();
}).catch((err)=>{
    console.log("ERR ", err);
});
    