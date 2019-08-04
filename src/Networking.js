const WebSocket = require('ws');
import Store from "./Store";
import {AsyncStorage} from 'react-native';



/*********************************************************************
 * This class handles all communications between the server and the
 * instance of the app. 
 *********************************************************************/
module.exports = {
    
    test:  function(msg){
        return msg;
    },

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
    loadFromStore: async function(){
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
    },

    /*********************************************************************
     * This deletes everything from the local storage. It is used in
     * Loading.js
     *********************************************************************/
    nukeStore: async function(){
        AsyncStorage.getAllKeys((err, keys) => {
            AsyncStorage.multiGet(keys, (err, stores) => {
              stores.map((result, i, store) => {
                for(let i in keyList)  AsyncStorage.removeItem(store[i][0]);
            });
          });
        });
    },

    /*********************************************************************
     * This deletes everything from the local storage. It is used in
     * Loading.js
     *********************************************************************/
    loadGroups: async function(){
        
        
    },

    /*********************************************************************
     * this is supposed to be called frequently. It checks for outdated
     * values and queries the server for those respective values
     *********************************************************************/
    ping: async function(){
        Store.getState().Global.keyList.forEach((item) =>{
            if(Date.now() >= (Number(item["lastPinged"]) + Number(item["maxTimeoutMs"]) || Number(item["lastPinged"] == 0))){
                console.log("updating ", item);
                //query server for data, update values
            }
        });
    },

    readAndPrint: async function(){
        const {sessionToken, accountInfo} = Store.getState().Global;
        console.log("SESSion token ", sessionToken);
        console.log("account info ", accountInfo);

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
        },
}