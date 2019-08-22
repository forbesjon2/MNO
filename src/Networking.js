import Store from "./Store";
import {AsyncStorage} from 'react-native';


/*********************************************************************
 * This class handles all communications between the server and the
 * instance of the app.
 * 
 * Spacing format is 2 before new process (see below) and 2 between
 * functions
 * 
 * 
 * The order of processes are as follows...
 *      Create: create routes in the webserver are communicated to
 * via these functions. Create events/servers/posts...
 * 
 *      Update: update routes in the webserver are communicated to
 * via these function. Handles login/logout/follow/like/server sub
 * 
 *      Retrieve: retrieve routes in the webserver are communicated
 * to via these functions. Handles
 * 
 *      StoreMng: handles managing both the the redux store as well
 * as the AsyncStorage store
 * 
 *      Other: random functions go here
 *********************************************************************/









 /*************************************************************************
 * ######################################################################
 * ######################################################################
 * ######################################################################
 *                          #################
 *                          
 *                               Create
 *                          
 *                          #################
 * ######################################################################
 * ######################################################################
 * ######################################################################
 * ######################################################################
 *************************************************************************/


/*********************************************************************
 * Sends the request to create the user's account. Recieves and stores
 * the user's uuid and their session token in redux & in the localstorage
 * 
 * This will return 'success' if everything went well. If not it will
 * alert the user. (It's used by SignUp.js)
 * 
 * type: create,
 * action: create_user
 * payload:
 *    {
 *      "email": "<user's email>", "name":"<user's full name>", 
 *      "name": "<user's name (can be blank)>",
 *      "description":"<user description can be blank>",
 *      "sub_name":"<user's degree (can be blank)>", 
 *      "image_uri":"<image link can be blank>",
 *      "alias":"<the username>", "password":"<user password>", 
 *      "device_id":"<some id>"
 *     }
 * 
 * full query example
 * {"type":"create","action":"create_user", "payload":{"email":"jack@twitter.com", "name":"Jack TwitterDude", "sub_name":"Criminal justice", "description":"example description", "image_uri":"awebsite", "alias":"jack", "password":"iLoveSafeSpaces", "device_id":"woke"}}
 * 
 * response: (separated by two spaces)
 * '<uuid>  <session_token>'
 * 
 * @argument email user's email
 * @argument alias user's alias (separate from full name)
 * @argument group_id the group's id
 * @argument password user's password
 **********************************************************************/
async function createAccount(email, alias, group_id, password){
    let ws = await initializeWebsocket();
    await ws.send('{"type":"create", "action":"create_user", "payload":{"email":"' + email + '", "name":""'
    + ', "description":"", "sub_name":"", "image_uri":"", "group_id":"' + group_id + '", "alias":"' + alias + '", "password":"' + password + '", "device_id":""}}');
    ws.onmessage = (message) => {
        let user_id = message["data"].toString().split("  ")[0];
        let session_token = message["data"].toString().split("  ")[1];
        let account_info = Store.getState().Global.accountInfo;
        account_info["user_id"] = user_id;
        account_info["email"] = email;
        AsyncStorage.multiSet([["accountInfo", account_info], ["sessionToken", session_token]]).catch(()=> null);
        Store.dispatch({type:"SET_SESSION_TOKEN", payload:session_token});
        Store.dispatch({type:"SET_ACCOUNT_INFO", payload:account_info});
        return "success";
    }
}


/*********************************************************************
 * Goes through the process of creating a post. 
 * 
 * Returns a promise with the message data (outlined below) if successful.
 * The response will either be 'successful' or include an error message
 * 
 * 
 * type: create,
 * action: create_post
 * payload:
 *    {
 *      "server_unique_id":"<uuid>", 
 *      "user_unique_id":"<uuid>",
 *      "content":"<text>", 
 *      "type":"<data type>", 
 *      "incog":"<bool>"
 *    }
 * 
 * full query example
 * {"type":"create", "action":"create_post", "payload":{"server_unique_id":"69e11007-5dcc-456b-a0c7-2d2371e20501", "user_unique_id":"69e11007-5dcc-456b-a0c7-2d2371e20501", "content":"Moving out party", "type":"text", "incog":"true"}}
 * 
 * @argument server_unique_id       uuid of the server you're posting to
 * @argument user_unique_id         uuid of the user that's posting
 * @argument content                the content of the post
 * @argument type                   type of post
 * @argument incog                  determines whether or not the user's
 *      account info will appear to other users
 **********************************************************************/
async function createPost(server_unique_id, user_unique_id, content, type, incog){
    return new Promise(function(resolve, reject){
        let ws = await initializeWebsocket();
        await ws.send('{"type":"create", "action":"create_post", "payload":{"server_unique_id":"' + 
            server_unique_id + '", "user_unique_id":"' + user_unique_id + '", "content":"' + content 
            + '", "type":"' + type + '", "incog":' + incog + '}}');
        
        ws.onmessage = (message) => {
            if(message["data"].includes("error")) reject(message["data"]);
            else resolve(JSON.parse(message["data"]));
        }
        ws.onerror = (err) => {reject(err)}
    });
}

/*********************************************************************
 * Goes through the process of creating an event. 
 * 
 * type: create,
 * action: create_event
 * payload:
 *    {
 *      "reference_unique_id":"<server, group, or user unique ID>",
 *      "reference_type":"<'server', 'group', or 'user'",
 *      "heading":"<>",
 *      "description":"<description>", "location":"<no particular format>",
 *      "start_time":"<ISO 8601 format>", "end_time":"<ISO 8601 format>",
 *      "attending":["<uuid1>", "<uuid2>"]
 *    }
 * 
 * 
 * @argument reference_unique_id
 * @argument reference_type
 * @argument heading
 * @argument description
 * @argument location
 * @argument start_time
 * @argument end_time
 * @argument attending
 **********************************************************************/
async function createEvent(reference_unique_id, reference_type, heading, description, location, start_time, end_time, attending){
    return new Promise(function(resolve, reject){
        let ws = await initializeWebsocket();
        await ws.send('{"type":"create", "action":"create_event", "payload":{"reference_unique_id":"' + 
            reference_unique_id + '", "reference_type":"' + reference_type 
            + '", "heading":"' + heading + '", "description":"' + description 
            + '", "location":"' + location + '", "start_time":' + start_time + ', "end_time":' + end_time 
            + '}}');
        
        ws.onmessage = (message) => {
            if(message["data"].includes("error")) reject(message["data"]);
            else resolve(JSON.parse(message["data"]));
        }
        ws.onerror = (err) => {reject(err)}
    });   
}








 /*************************************************************************
 * ######################################################################
 * ######################################################################
 * ######################################################################
 *                          #################
 *                          
 *                               Update
 *                          
 *                          #################
 * ######################################################################
 * ######################################################################
 * ######################################################################
 * ######################################################################
 *************************************************************************/


/**********************************************************************
 * Logs the user in given an email address & the password. When done, 
 * this will return a newly created session token and the user's
 * stored user ID. The store gets an updated email, user ID, & token
 * 
 * type: retrieve,
 * action: login
 * payload:
 *    {
 *      "email":"<user's email>",
 *      "password":"<user's password>"
 *    }
 * 
 * response (if successful):
 *  {
 *      "session_token":"<token>",
 *      "unique_id":"<user's unique id>"
 *  }
**********************************************************************/
function login(email, password, ws){
    return new Promise(function(resolve, reject){
        ws.send('{"type":"retrieve", "action":"login", "payload":{"email":"' + email + '", "password":"' + password + '"}}');
        ws.onmessage = (message) => {
            if(message == "error"){
                reject("error");
            }else{
                let data = JSON.parse(message["data"]);
                let accountInfo = JSON.parse(JSON.stringify(Store.getState().Global.accountInfo));
                console.log("got data ", data);
                accountInfo["email"] = email;
                accountInfo["user_id"] = data["unique_id"];

                //add that to the store
                Store.dispatch({type:"SET_SESSION_TOKEN", payload:data["session_token"]});
                Store.dispatch({type:"SET_ACCOUNT_INFO", payload:accountInfo});

                //add that to asyncStorage
                AsyncStorage.multiSet([['sessionToken', data["session_token"]], ['accountInfo', accountInfo]]).catch(() => null);
                resolve("success");
            }
        }
    });
}


/*********************************************************************
 * Logic for following a group. Will return 'success' if the email
 * was successfully sent or some error message otherwise. Regardless,
 * this will return the message sent by the server 
 * 
 * type: update,
 * action: follow_group
 * payload:
 *    {
 *      "user_unique_id":"<group uuid>",
 *      "group_unique_id":"<group uuid>",
 *      "user_email":"<user_email>"
 *    }
 * 
 * full query example
 * {"type":"update","action":"follow_group", "payload":{"user_email":"jforbes@unl.edu", "group_unique_id":"0260732b-4e92-46c1-9a0c-0fd91d21491b", "user_unique_id":"41460d4c-8355-4653-bb23-37afc020fd8d"}}
 * 
 * @argument email user's email
 * @argument group_id group's uuid
 * @argument user_id user's uuid
 **********************************************************************/
async function groupSub(email, group_id, user_id){
    let ws = await initializeWebsocket();
    await ws.send('{"type":"update", "action":"follow_group", "payload":{"user_email":"' + email + '", '
                    + '"group_unique_id":"' + group_id + '", "user_unique_id":"' + user_id + '"}}');
    ws.onmessage = (message) => {return message};
}







 /*************************************************************************
 * ######################################################################
 * ######################################################################
 * ######################################################################
 *                          #################
 *                          
 *                               Retrieve
 *                          
 *                          #################
 * ######################################################################
 * ######################################################################
 * ######################################################################
 * ######################################################################
 *************************************************************************/


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


/***********************************************************************
 * Retrieves a particular user's data given a uuid. This can be used to
 * get a separate user's data or the current user's data. All it needs
 * is a uuid. 
 * 
 * Returns a promise with a response detailed below
 * 
 * type: retrieve,
 * action: get_user
 * payload:
 *    {
 *      "uuid":"<uuid>"
 *    }
 * 
 * response:
 *  {
 *      "name":"<user's name>",
 *      "sub_name":"<user sub name>",
 *      "description":"<user description>",
 *      "image_uri":"<image link>",
 *      "friends":["uuid1", "uuid2"],
 *      "groups":["uuid1", "uuid2"],
 *      "tags":["tag1", "tag2]
 *  }
 * 
 **********************************************************************/
async function retrieveAccountInfo(uuid){
    return new Promise(function(resolve, reject){
        let ws = await initializeWebsocket();
        await ws.send('{"type":"retrieve","action":"get_user","payload":{"uuid":"' + uuid +'"}}');
        ws.onmessage = (message) => {resolve(JSON.parse(message["data"]));}
        ws.onerror = (err) => {reject(err)}
    });
}










 /*************************************************************************
 * ######################################################################
 * ######################################################################
 * ######################################################################
 *                          #################
 *                          
 *                               StoreMng
 *                          
 *                          #################
 * ######################################################################
 * ######################################################################
 * ######################################################################
 * ######################################################################
 *************************************************************************/


 /*********************************************************************
 * This deletes everything from the local storage. It is used in
 * Loading.js
 *********************************************************************/
async function nukeStore(){
    AsyncStorage.getAllKeys((err, keys) => {keys.forEach((key) => AsyncStorage.removeItem(key));});
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
    var keyListVariables = [];
    keyList.forEach((item) => keyListVariables.push(item["variable"]));

    AsyncStorage.getAllKeys((err, keys) => {
        AsyncStorage.multiGet(keys, (err, stores) => {
            stores.map((result, i, store) => {
                let key = store[i][0];
                let location = keyListVariables.indexOf(key);
                if(location != -1){
                    console.log("dispatching " + keyList[location]["dispatch"]);
                    // keyList[location]["lastPinged"] = Date.now();
                    Store.dispatch({type:keyList[location]["dispatch"], payload: store[i][1]});
                }else{AsyncStorage.removeItem(key);}
            });
        });
    });
}











/*************************************************************************
 * ######################################################################
 * ######################################################################
 * ######################################################################
 *                          #################
 *                          
 *                               Other
 *                          
 *                          #################
 * ######################################################################
 * ######################################################################
 * ######################################################################
 * ######################################################################
 *************************************************************************/


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


/***********************************************************************
 * initalizes a websocket. If one exists (in the redux Store), it returns 
 * that websocket. Else it will return a promise that resolves with 
 * initialized websocket, rejects after failure/timeout.
 * 
 * Sorta Credit: Klues 
 * https://stackoverflow.com/questions/29881957/websocket-connection-timeout
 ***********************************************************************/
function initializeWebsocket(){
return new Promise(function(resolve, reject){
    var existingWebsocket = Store.getState().Global.webSocket;
    var URL= "ws://159.65.180.85:8080";
    
    function rejectInternal(message){
        Store.dispatch({type:"SET_CONNECTION_VIEW", payload:true});
        Store.dispatch({type:"SET_CONNECTION_VIEW_CONNECTING", payload:true});
        reject(message);
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











module.exports = {
    test:  function(msg){return msg;},
    loadFromStore: loadFromStore,
    nukeStore: nukeStore,
    ping: ping,
    initializeWebsocket: initializeWebsocket,
    retrieveGroups: retrieveGroups,
    login: login,
    createAccount: createAccount,
    groupSub: groupSub,
    retrieveAccountInfo,
}