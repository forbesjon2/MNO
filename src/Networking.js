const WebSocket = require('ws');
import srcStore from "./Store";


/*********************************************************************
 * This class handles all communications between the server and the
 * instance of the app. 
 *********************************************************************/
module.exports = {
    
    test:  function(msg){
        return msg;
    },


    loadFromStore: async function(){
        // const rs = await AsyncStorage.getItem("accountInfo");
        // return rs;
    },


    /*********************************************************************
     * Standard function for sending a payload to a particular server
     * 
     * @param payload   the payload of the message being sent. Usually
     *        this is
     * @return {Promise}
     *********************************************************************/
    sendMessage: function(payload, ws){
        return new Promise(function(resolve, reject){
            ws.send(payload);
            ws.onmessage = (message) => resolve(message["data"]);
            ws.onerror = (err) => reject(err);
        });
    },


    /***********************************************************************
     * initalizes a websocket. If one exists, it returns that websocket. 
     * Else it will return a promise that resolves with initialized websocket,
     * rejects after failure/timeout.
     * 
     * TODO make this work with ws
     *
     * @param URL the websocket URL to init. This exists for testing purposes
     *            and can be null
     * @param existingWebsocket The already existing(?) websocket. This field
     *        can be null
     * @return {Promise}
     * 
     * Credit: Klues 
     * https://stackoverflow.com/questions/29881957/websocket-connection-timeout
     **********************************************************************/
    initWebsocket: function(existingWebsocket, URL) {
        var timeoutMs = 5000
        URL = [URL == null ? "ws://localhost:8080" : URL];
        var numberOfRetries = 10;
        var hasReturned = false;
        var promise = new Promise((resolve, reject) => {
            setTimeout(function () {if(!hasReturned) rejectInternal();}, timeoutMs);
            
            if (!existingWebsocket || existingWebsocket.readyState != existingWebsocket.OPEN) {
                //if a ws exists but it is not open, close it
                if (existingWebsocket) existingWebsocket.close(); 
                
                //initialize a ws
                var websocket = new WebSocket(URL);
                websocket.onopen = function () {
                    if(hasReturned) websocket.close();
                    else resolve(websocket);
                };
                websocket.onclose = () => rejectInternal();
                websocket.onerror = () => rejectInternal();
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
        },
}