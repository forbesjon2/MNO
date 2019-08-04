import Store from "./Store";
import {AsyncStorage} from 'react-native';


/*********************************************************************
 * This class handles all communications between the server and the
 * instance of the app. 
 *********************************************************************/



/*********************************************************************
 * this is supposed to be called frequently. It checks for outdated
 * values and queries the server for those respective values
 *********************************************************************/
async function ping(){
    Store.getState().Global.keyList.forEach((item) =>{
        if(Date.now() >= (Number(item["lastPinged"]) + Number(item["maxTimeoutMs"]) || Number(item["lastPinged"] == 0))){
            console.log("updating ", item);
            //query server for data, update values
        }
    });
}


/*********************************************************************
 * This deletes everything from the local storage. It is used in
 * Loading.js
 *********************************************************************/
async function nukeStore(){
    AsyncStorage.getAllKeys((err, keys) => {
        AsyncStorage.multiGet(keys, (err, stores) => {
            stores.map((result, i, store) => {
            for(let i in keyList)  AsyncStorage.removeItem(store[i][0]);
        });
        });
    });
}


/***********************************************************************
 * initalizes a websocket. If one exists (in the redux Store), it returns 
 * that websocket. Else it will return a promise that resolves with 
 * initialized websocket, rejects after failure/timeout.
 ***********************************************************************/
function initializeWebsocket(){
return new Promise(function(resolve, reject){
    var existingWebsocket = Store.getState().Global.webSocket;
    var URL= "ws://134.209.2.86:8080";
    
    function rejectInternal(message){
        Store.dispatch({type:"SET_CONNECTION_VIEW", payload:true});
        Store.dispatch({type:"SET_CONNECTION_VIEW_CONNECTING", payload:true});
        reject(message)
    }
    
    if (!existingWebsocket || existingWebsocket.OPEN != existingWebsocket.readyState) {
        var websocket = new WebSocket(URL);
        websocket.onopen = () => resolve(websocket);
        websocket.onclose = (e) => rejectInternal(e.message);
        websocket.onerror = (e) => rejectInternal(e.message);
    }else{
        resolve(existingWebsocket);
    }
});
}

/*********************************************************************
 * Performed at initialization to load from the storage saved on 
 * the device and copies them to the redux variables.
 * 
 * Keys, dispatch variables, and time last pinged are tracked in the 
 * redux variable 'keyList'.
 * 
 * If a key is found in AsyncStorage but not in 'keyList' than it
 * deletes the key in AsyncStorage
 *********************************************************************/
async function loadFromStore(){
    var keyList = Store.getState().Global.keyList;

    AsyncStorage.getAllKeys((err, keys) => {
        AsyncStorage.multiGet(keys, (err, stores) => {
            stores.map((result, i, store) => {
            for(let i in keyList){
                let key = store[i][0];
                if(keyList[i]["variable"] == key){
                    let value = store[i][1];
                    // keyList[i]["lastPinged"] = Date.now();
                    Store.dispatch({action:keyList["dispatch"], payload: value});
                }else{AsyncStorage.removeItem(key);}
            }
            });
        });
        });
}



/*********************************************************************
 * Standard function for sending a payload to a particular server
 * 
 * @param payload   the payload of the message being sent. Usually
 *        this is
 * @return {Promise}
 *********************************************************************/
function sendMessage(payload, ws){
    return new Promise(function(resolve, reject){
        ws.send(payload);
        ws.onmessage = (message) => resolve(message["data"]);
        ws.onerror = (err) => reject(err);
    });
}

/***********************************************************************
 * Retrieves a list of groups and saves that to the redux store & the
 * local storage
 * 
 * type: retrieve,
 * action: get_groups
 * payload:
 *    {
 *      <nothing>
 *    }
 * 
 * response:
 * {
 *      "unique_id":"<group uuid>",
 *      "image_uri":"<group image uri>",
 *      "servers": "<number of servers>",
 *      "users":"<number of users>",
 *      "alias":"<group alias"
 * }
 * 
 **********************************************************************/
async function retrieveGroups(){
    let ws = await initializeWebsocket();
    let groupData = Store.getState().Global.groupData;
    await ws.send('{"type":"retrieve","action":"get_groups","payload":{}}');
    ws.onmessage = (message) => {
        groupData["groups"] = JSON.parse(message["data"]);
        AsyncStorage.setItem("groupData", groupData).catch(()=>null);
        Store.dispatch({type:"SET_GROUP_DATA", payload: groupData});
    }
}





















    // /***********************************************************************
    //  * initalizes a websocket. If one exists (in the redux Store), it returns 
    //  * that websocket. Else it will return a promise that resolves with 
    //  * initialized websocket, rejects after failure/timeout.
    //  * 
    //  * @param URL the websocket URL to init. This exists for testing purposes
    //  *            and can be null
    //  * @return {Promise}
    //  * 
    //  * Credit: Klues 
    //  * https://stackoverflow.com/questions/29881957/websocket-connection-timeout
    //  **********************************************************************/
    // initWebSocket: function(URL, numberOfRetries) {
    //     var existingWebsocket = Store.getState().Global.webSocket;
    //     URL = [URL == null ? "ws://localhost:8080" : URL];
    //     numberOfRetries = numberOfRetries ? numberOfRetries : 8;
    //     var hasReturned = false;
    //     Store.dispatch({type:"SET_CONNECTION_VIEW", payload:true});
    //     Store.dispatch({type:"SET_CONNECTION_VIEW_CONNECTING", payload:true});
    //     var promise = new Promise((resolve, reject) => {
    //         if (!existingWebsocket || existingWebsocket.OPEN != existingWebsocket.readyState) {
    //             //if a ws exists but it is not open, close it
    //             if (existingWebsocket) existingWebsocket.close();
    //             //initialize a ws
    //             var websocket = new WebSocket(URL);
    //             websocket.onopen = (ws) => [hasReturned ? websocket.close() : resolve(ws)];
    //             websocket.onclose = (e) => rejectInternal();
    //             websocket.onerror = (e) => rejectInternal();
    //         } else {
    //             resolve(existingWebsocket);
    //         }
    //         //Runs after a closed/failed connection. Reduces # of retries or rejects
    //         function rejectInternal() {
    //             if(numberOfRetries <= 0) {
    //                 reject();
    //             } else if(!hasReturned) {
    //                 hasReturned = true;
    //                 initWebsocket(URL, numberOfRetries-1).then(resolve, reject);
    //             }
    //         }
    //     });
    //     promise.then(function () {hasReturned = true;}, function () {hasReturned = true;});
    //     return promise;
    // },






module.exports = {
    test:  function(msg){return msg;},
    loadFromStore: loadFromStore,
    nukeStore: nukeStore,
    ping: ping,
    initializeWebsocket: initializeWebsocket,
    retrieveGroups: retrieveGroups
}