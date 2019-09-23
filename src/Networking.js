import Store from "./Store";
import {AsyncStorage} from 'react-native';
import NavigationService from "./navigation/NavigationService";

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
function createPost(server_unique_id, user_unique_id, content, type, incog){
    return new Promise((resolve, reject) => {
        initializeWebsocket().then((ws) =>{
            ws.send('{"type":"create", "action":"create_post", "payload":{"server_unique_id":"' + 
                server_unique_id + '", "user_unique_id":"' + user_unique_id + '", "content":"' + content 
                + '", "type":"' + type + '", "incog":' + incog + '}}');
            return ws;
        }).then((ws)=> {
            ws.onmessage = (message) => {
                if(message["data"].includes("error")) {
                    reject(message["data"]);
                    errorEventHandler(message["data"]);
                }
                else {
                    resolve(JSON.parse(message["data"]));
                }
            }
            ws.onerror = (err) => {
                errorEventHandler(err);
                reject(err);
            }
        }).catch((err) =>{
            errorEventHandler(err);
            reject(err);
        });
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
function createEvent(reference_unique_id, reference_type, heading, description, location, start_time, end_time, attending){
    return new Promise((resolve, reject) => {
        initializeWebsocket().then((ws) =>{
            ws.send('{"type":"create", "action":"create_event", "payload":{"reference_unique_id":"' + 
                reference_unique_id + '", "reference_type":"' + reference_type + '", "heading":"' 
                + heading + '", "description":"' + description + '", "location":"' + location
                + '", "start_time":' + start_time + ', "end_time":' + end_time + '}}');
            return  ws;
        }).then((ws) =>{
            ws.onmessage = (message) => {
                if(message["data"].includes("error")){
                    errorEventHandler(message["data"]);
                    reject(message["data"]);
                }
                else resolve(JSON.parse(message["data"]));
            }
            ws.onerror = (err) => {
                errorEventHandler(err);
                reject(err);
            }
        }).catch((err) =>{
            errorEventHandler(err);
            reject("execution error in createEvent " + err);
        });
    });   
}

/*********************************************************************
 * Sends the request to create the user's account. Recieves and stores
 * the user's uuid, email, and their session token in redux & in the 
 * localstorage
 * 
 * The response is in the form of a promise. Will resolve if no 'error'
 * string appears in the response message. Both the uuid & session token
 * are scylla (cassandra like) generated uuid's. They would ideally have 
 * no 'error' text, its likely but very improbable
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
function createAccount(email, alias, group_id, password){
    return new Promise((resolve, reject) => {
        initializeWebsocket().then((ws) =>{
            ws.send('{"type":"create", "action":"create_user", "payload":{"email":"' + email + '", "name":""'
                + ', "description":"", "sub_name":"", "image_uri":"", "group_id":"' + group_id + '", "alias":"' 
                + alias + '", "password":"' + password + '", "device_id":""}}');
            return ws;
        }).then((ws) =>{
            ws.onmessage = (message) => {
                if(message["data"].includes("error")) {
                    errorEventHandler(message["data"]);
                    reject(message["data"]);
                }else{
                    let user_id = message["data"].toString().split("  ")[0];
                    let session_token = message["data"].toString().split("  ")[1];
                    let account_info = Store.getState().Global.accountInfo;
                    account_info["user_id"] = user_id;
                    account_info["email"] = email;
                    account_info["groups"][0] = group_id;
                    account_info["alias"] = alias;
                    AsyncStorage.multiSet([["accountInfo", JSON.stringify(account_info)], ["sessionToken", JSON.stringify(session_token)]]).catch(()=> null);
                    Store.dispatch({type:"SET_SESSION_TOKEN", payload:session_token});
                    Store.dispatch({type:"SET_ACCOUNT_INFO", payload:account_info});
                    resolve("success");
                }
            }
            ws.onerror = (err) => {
                errorEventHandler(err);
                reject(err);
            }
        }).catch((err) =>{
            errorEventHandler(err);
            reject("internal error in createAccount " + err);
        });
        
    });
}

/*********************************************************************
 * Goes through the process of creating a server. This requires
 * the corresponding group's uuid as well as the user who's creating
 * the group's uuid (inside followers the creater is by default the
 * owner)
 * 
 * TODO add client side validation, implement global_permission, implement 
 *      alias max length check
 * 
 * If the user has position 1 of their individual permission string = 0 
 * than they will not have access to this function. It uses 
 * checkPermissionLogic to perform this task
 * 
 * type: create,
 * action: create_server
 * payload:
 *    {
 *      "user_id":"<uuid>",
 *      "user_email":"<user's email>",
 *      "name":"<server name (stored in to_primary_key)>",
 *      "session_token":"<user token>",
 *      "alias":"<alias w/o the '@'. Ex os2g>",
 *      "description":"<server description>", 
 *      "global_permission":"<server permission str>",
 *      "group_unique_id":"<uuid of corresponding group>"
 *    }
 * 
 * full query example
 * {"type":"create", "action":"create_server", "payload":{"name":"Operating system open source group", "session_token": "2740b898-4798-4a86-9d5e-6f7272f978a1", "alias":"os2g", "description":"a computer club on campus", "global_permission":"---", "group_unique_id":"adf58ad8-70c7-4fbb-869d-a2d265d815fbr", "followers":["c90f77d9-6016-4450-b96c-5a0068a1bfad"], "user_id":"c90f77d9-6016-4450-b96c-5a0068a1bfad"}}
 *
 * response:
 *      <uuid> of the server if successful
 *      error message including the string 'error' if not successful
 * 
 * @argument server_name    the servers full name (separate from alias)
 * @argument alias          alias (@XXXXXX). No limit so far
 * @argument description    the server's description (not sure if this 
 *           can be null... just keep it != null by default)
 * (@not_argument global_permission not implemented yet)
 * @argument group_unique_id       the server's parent group's ID
 **********************************************************************/
function createServer(server_name, alias, description, group_unique_id, ws){
    return new Promise((resolve, reject) => {
        var store = Store.getState().Global;
        var user_id = store.accountInfo["user_id"];
        var email = store.accountInfo["email"];
        var session_token = store.sessionToken;
        var global_permission = "---";

        initializeWebsocket().then((ws) =>{
            ws.send('{"type":"create", "action":"create_server", "payload":{"user_id":"' 
                + user_id + '", "user_email":"' + email + '", "name":"' + server_name 
                + '", "session_token":"' + session_token + '", "alias":"' + alias +'", "description":"' 
                + description + '", "global_permission":"' + global_permission + '", "group_unique_id":"' 
                + group_unique_id + '"}}');
            return ws
        }).then((ws) => {
            ws.onmessage = (message) => {
                if(message["data"].includes("error")){
                    errorEventHandler(message["data"]);
                    reject(message["data"]);
                }
                resolve(message["data"]);
            }
            ws.onerror = (err) => {
                errorEventHandler(err);
                reject(err);
            }
        }).catch((err) =>{
            errorEventHandler(err);
            reject(err);
        })
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

// async function serverSub(){
    
// }


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
function login(email, password){
    return new Promise((resolve, reject) => {
        initializeWebsocket().then((ws) => {
            ws.send('{"type":"retrieve", "action":"login", "payload":{"email":"' + email + '", "password":"' + password + '"}}');
            return ws;
        }).then((ws) => {
            ws.onmessage = (message) => {
                if(message["data"] == "error"){
                    errorEventHandler(message["data"]);
                    reject("error");
                }else{
                    let data = JSON.parse(message["data"]);
                    let accountInfo = JSON.parse(JSON.stringify(Store.getState().Global.accountInfo));
                    accountInfo["email"] = email;
                    accountInfo["user_id"] = data["user_unique_id"];
                    accountInfo["groups"] = [data["group_unique_id"]];
                    
                    //add that to the store
                    Store.dispatch({type:"SET_SESSION_TOKEN", payload:data["session_token"]});
                    Store.dispatch({type:"SET_ACCOUNT_INFO", payload:accountInfo});

                    //add that to asyncStorage
                    AsyncStorage.multiSet([['sessionToken', JSON.stringify(data["session_token"])], ['accountInfo', JSON.stringify(accountInfo)]]).catch((err) => null);
                    resolve({
                        group_id: data["group_unique_id"],
                        email_verified: data["email_verified"]
                    });
                }
            }
            ws.onerror = (err) => {
                errorEventHandler(err);
                reject(err);
            }
        }).catch((err) => {
            errorEventHandler(err);
            reject("internal error in login " + err);
        });
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
function groupSub(email, group_id, user_id){
    return new Promise((resolve, reject) => {
        initializeWebsocket().then((ws) => {
            ws.send('{"type":"update", "action":"follow_group", "payload":{"user_email":"' + email + '", '
                        + '"group_unique_id":"' + group_id + '", "user_unique_id":"' + user_id + '"}}');
            return ws;
        }).then((ws) => {
            //edit this to add error handling
            ws.onmessage = (message) => {resolve(message);}
            ws.onerror = (err) => {
                errorEventHandler(err);
                reject(err);
            }
        }).catch((err) => {
            errorEventHandler(err);
            reject("internal error in groupSub " + err);
        });
    })
}


/***********************************************************************
 * Updates the current user's data. 
 * 
 * TODO test this
 * 
 * friends & groups format 
 * 
 * Returns a promise with a response detailed below.
 **********************************************************************/
function updateAccountInfo(){
    return new Promise((resolve, reject) => {
        var accountData = JSON.parse(JSON.stringify(Store.getState().Global.accountInfo));
        retrieveAccountInfo(accountData["user_id"]).then((resp) =>{
            accountData["name"] = resp["name"];
            accountData["alias"] = resp["alias"];
            accountData["sub_name"] = resp["sub_name"];
            accountData["description"] = resp["description"];
            accountData["image_uri"] = resp["image_uri"];
            accountData["friends"] = resp["friends"];
            accountData["group_unique_id"] = resp["group_unique_id"];
            accountData["servers"] = resp["servers"];
            AsyncStorage.setItem("accountInfo", JSON.stringify(accountData));
            Store.dispatch({type:"SET_ACCOUNT_INFO", payload: accountData});
            resolve(accountData);
        }).catch((err) => {reject("internal error in updateAccountInfo " + err)})
    });
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
 *      "name":"<group's name>",
 *      "alias":"<group alias>",
 *      "scale":"<image scale>",
 *      "image_uri":"<group image uri>",
 *      "servers": ["uuid1", "uuid2"], 
 *      "users":"<number of users>",
 *      "valid_mail_domains":"<the list of valid mail domains>"
 * }
 * 
 **********************************************************************/
function retrieveGroups(){
    return new Promise((resolve, reject) => {
        initializeWebsocket().then((ws) =>{
            ws.send('{"type":"retrieve","action":"get_groups","payload":{}}');
            return ws;
        }).then((ws) =>{
            ws.onmessage = (message) => {
                let groupData = JSON.parse(JSON.stringify(Store.getState().Global.groupData));
                groupData["groups"] = JSON.parse(message["data"]);
                AsyncStorage.setItem("groupData", groupData).catch(()=>null);
                Store.dispatch({type:"SET_GROUP_DATA", payload: groupData});
                resolve(JSON.parse(message["data"]));
            }
            ws.onerror = (err) => {
                errorEventHandler(err);
                reject(err)
            }
        }).catch((err) => {
            errorEventHandler(err);
            reject("internal error in retrieveGroups " + err);
        });
    });
}

/*********************************************************************
 * This gets and stores all events for a user by tracking the groups,
 * servers, and user uuid's that are associated with a particular user
 * 
 * The user has to be apart of a particular group or server to view
 * events associated by either of the two
 * 
 * It checks if you have a valid session
 * 
 * type: retrieve,
 * action: get_events
 * payload:
 *    {
 *      "username":"<user's email>",
 *      "session_token":"<user's session token>",
 *      "sub_list":["uuid1", "uuid2", ...],
 *      "date_created":"<retrieve events before this date>",
 *    }
 * 
 * response:
 * [{
 *      "heading":"<event's heading>",
 *      "description":"<event's description>",
 *      "location":"<event's location (in no particular format)>",
 *      "start_time":"<start time in ISO 8601 format>",
 *      "end_time":"<end time in ISO 8601 format>",
 *      "attending":["<user uuid1>", "<user uuid2>"],
 *      "unique_id":"<event's unique_id>",
 *      "type":"<event type>"
 * }]
 * 
 * full query example (requires valid data)
 * {"type":"retrieve","action":"get_events", "payload":{"username":"jack@twitter.com", "session_token":"91727e5b-6e21-4eed-8bbd-0303944f64ff", "sub_list":["91727e5b-6e21-4eed-8bbd-0303944f64ff", "91727e5b-6e21-4eed-8bbd-0303944f64ff"], "date_created":"2019-07-30 18:00:00"}}
 **********************************************************************/
function retrieveEvents(){
    return new Promise((resolve, reject) => {
        initializeWebsocket().then(async (ws) =>{
            //need user email, 
            const accountData = await Store.getState().Global.accountInfo;
            const session_token = await Store.getState().Global.sessionToken;
            const eventIDs = await retrieveIDForEvents();
            var currentDate = new Date();
            currentDate.setMonth(currentDate.getMonth() + 4);
            ws.send('{"type":"retrieve","action":"get_events", "payload":{"username":"' + accountData["email"] + '", "session_token":"' 
                + session_token + '", "sub_list":' + JSON.stringify(eventIDs) + ', "date_created":"' + currentDate.toISOString() + '"}}');
            return ws;
        }).then((ws) =>{
            ws.onmessage = (message) => {
                if(message["data"].toString().length < 50 && message["data"].toString().includes("error")){
                    errorEventHandler(message["data"]);
                    reject(message["data"]);
                }else{
                    Store.dispatch({type:"SET_CALENDAR_DATA", payload:{"events":message["data"]}});
                    AsyncStorage.setItem("calendarData", JSON.stringify({"events":message["data"]}));
                    resolve(JSON.parse(message["data"]));
                }
            }
            ws.onerror = (err) => {
                errorEventHandler(err);
                reject(err);
            }
        }).catch((err) => {
            errorEventHandler(err);
            reject("internal error in retrieveEvents " + err);
        });
    });
}


/*********************************************************************
 * Not to be confused with get_servers & getServersLogic, this returns
 * more specific data for server given it's uuid
 * 
 * It requires a valid session and a check that you are subscribed
 * to that group before it returns anything
 * 
 * resolves a stringified version of the response
 * 
 * type: retrieve,
 * action: get_server
 * payload:
 *    {
 *      "unique_id":"<user's unique ID>",
 *      "username":"<user's email>",
 *      "session_token":"<user's session token>",
 *      "server_unique_id":"<server's unique ID>",
 *      "group_unique_id":"<group's unique ID>"
 *    }
 * 
 * response:
 * {
 *      "name":"<server name>",
 *      "alias":"<server alias>",
 *      "description":"<server description>",
 *      "global_permission":"<server's global permission string>",
 *      "followers":"<list of followers>",
 *      "blocked_users":"<list of blocked users>",
 *      "owner_id":"<server owner's uuid>",
 *      "date_created":"<server created timestamp>"
 * }
 * 
 * full query example
 * {"type":"retrieve","action":"get_server", "payload":{"unique_id":"91727e5b-6e21-4eed-8bbd-0303944f64ff", "username":"jack@twitter.com", "session_token":"23811e71-1a5d-40b9-8846-39ed39aeeb52", "server_unique_id":"91727e5b-6e21-4eed-8bbd-0303944f64ff", "group_unique_id": "4f6dc16d-2644-47f4-babd-92f1c5c71a1c"}}
 * 
 * @argument data is the payload
 * @argument client is the instance of the cassandra-driver (connected to scylla)
 **********************************************************************/
function retrieveServer(server_id, group_id){
    return new Promise((resolve, reject) => {
        initializeWebsocket().then((ws) =>{
            const accountData = Store.getState().Global.accountInfo;
            const sessionToken = Store.getState().Global.sessionToken;
            ws.send('{"type":"retrieve","action":"get_server","payload":{"unique_id":"' + accountData["user_id"] + '",'
                    + '"username":"' + accountData["email"] + '", "session_token":"' + sessionToken 
                    + '", "server_unique_id":"' + server_id + '", "group_unique_id":"' + group_id + '"}}');
            ws.onmessage = (message) => {
                if(message["data"].toString().length < 50 && message["data"].toString().includes("error")){
                    errorEventHandler(message["data"]);
                    reject(message["data"]);
                }else{
                    resolve(message["data"]);
                }
            }
            ws.onerror = (err) => {
                errorEventHandler(err);
                reject(err);
            }
        }).catch((err) => {
            errorEventHandler(err);
            reject("internal error in retrieveServer " + err);
        });
    });
}


/*********************************************************************
 * Not to be confused with retrieveServer, this returns the list 
 * of servers that belong to a group given the group's uuid
 * 
 * It checks if you have a valid session and that you are subscribed
 * to that group before it returns anything
 * 
 * resolves a stringified version of the response
 * 
 * type: retrieve,
 * action: get_servers
 * payload:
 *    {
 *      "unique_id":"<user's unique ID>",
 *      "username":"<user's email>",
 *      "session_token":"<user's session token>",
 *      "group_unique_id":"<group's unique ID>",
 *    }
 * 
 * response:
 * [{
 *      "unique_id":"<server's uuid>",
 *      "name":"<server's name>",
 *      "alias":"<server's alias>",
 *      "users":"<number of users in server>"
 * }]
 * 
 * full query example
 * {"type":"retrieve","action":"get_servers", "payload":{"unique_id":"91727e5b-6e21-4eed-8bbd-0303944f64ff", "username":"jack@twitter.com", "session_token":"23811e71-1a5d-40b9-8846-39ed39aeeb52", "group_unique_id": "4f6dc16d-2644-47f4-babd-92f1c5c71a1c"}}
 * 
 * @argument group_id   the uuid of the group that you are retrieving 
 *           servers for (og from accountData["groups"][0])
 **********************************************************************/
function retrieveServers(group_id){
    return new Promise((resolve, reject) => {
        initializeWebsocket().then((ws) =>{
            let accountData = Store.getState().Global.accountInfo;
            let sessionToken = Store.getState().Global.sessionToken;
            ws.send('{"type":"retrieve","action":"get_servers","payload":{"unique_id":"' + accountData["user_id"] + '",'
                    + '"username":"' + accountData["email"] + '", "session_token":"' + sessionToken 
                    + '", "group_unique_id":"' + group_id + '"}}');
            ws.onmessage = (message) => {
                if(message["data"].toString().length < 50 && message["data"].toString().includes("error")){
                    errorEventHandler(message["data"]);
                    reject(message["data"]);
                }else{
                    Store.dispatch({type:"SET_SERVER_DATA", payload:message["data"]});
                    AsyncStorage.setItem("serverData", JSON.stringify(message["data"]));
                    resolve(JSON.stringify(message["data"]));
                }
            }
            ws.onerror = (err) => {
                errorEventHandler(err);
                reject(err);
            }
        }).catch((err) => {
            errorEventHandler(err);
            reject("internal error in retrieveServers " + err);
        });
    });
}
/*********************************************************************
 * This will return the status of a particular user given their uuid
 * so far the status includes only whether or not their email is
 * verified
 * 
 * type: retrieve
 * action: get_status
 * 
 * payload:
 * {"uuid":"<user's unique id>"}
 * 
 * response:
 * {"email_verified":<true/false>}
 *********************************************************************/
function getStatus(){
    return new Promise((resolve, reject) =>{
        initializeWebsocket().then((ws) =>{
            let accountData = Store.getState().Global.accountInfo;
            ws.send('{"type":"retrieve","action":"get_status","payload":{"uuid":"' + accountData["user_id"] + '"}}');

            ws.onmessage = (message) => {
                if(message["data"].toString().length < 50 && message["data"].toString().includes("error")){
                    errorEventHandler(message["data"]);
                    reject(message["data"]);
                }else{
                    resolve(JSON.parse(JSON.stringify(message["data"])));
                }
            }
            ws.onerror = (err) => {
                errorEventHandler(err);
                reject(err);
            }
        }).catch((err) => {
            errorEventHandler(err);
            reject("internal error in getStatus " + err);
        });
    })
}


/*********************************************************************
 * Returns a list of users that belong to a particular group given 
 * that groups uuid. This is then stored in the usersData redux
 * variable (and asyncStorage item)
 * 
 * FIXME modify this to add multi group support
 * 
 * type: retrieve,
 * action: get_group_users
 * payload:
 *    {
 *      "uuid":"<user's uuid>",
 *      "group_uuid":"<group's uuid>",
 *      "session_token":"<user's session token>",
 *      "username":"<user's email>"
 *    }
 * 
 * response:
 *  [{
 *      "name":"<user's name>",
 *      "unique_id":"<user's uuid'>",
 *      "sub_name":"<user's sub name>",
 *      "friends": ["uuid1", "uuid2"],
 *      "image_uri":"<user profile image link>"
 *  }]
 * full query example
 * {"type":"retrieve","action":"get_group_users", "payload":{"uuid":"91727e5b-6e21-4eed-8bbd-0303944f64ff", "group_uuid":"91727e5b-6e21-4eed-8bbd-0303944f64ff", "session_token":"3ofi4i-43ifo-f3inio3", "username":"jack@twitter.com"}}
 * 
 * @argument data is the payload
 * @argument client is the instance of the cassandra-driver (connected to scylla)
 **********************************************************************/
function retrieveUsers(){
    return new Promise((resolve, reject) =>{
        initializeWebsocket().then((ws) =>{
            let accountData = Store.getState().Global.accountInfo;
            let sessionToken = Store.getState().Global.sessionToken;
            ws.send('{"type":"retrieve","action":"get_group_users", "payload":{"uuid":"' + accountData["user_id"] 
                    + '", "group_uuid":"' + accountData["groups"][0] + '", "session_token":"' + sessionToken 
                    + '", "username":"' + accountData["email"] + '"}}');
            return ws;
        }).then((ws) =>{
            ws.onmessage = (message) => {
                if(message["data"].toString().length < 40 && message["data"].toString().includes("error")){
                    errorEventHandler(message["data"]);
                    reject(message["data"]);
                }else{
                    AsyncStorage.setItem("usersData", JSON.stringify(message["data"]));
                    Store.dispatch({type:"SET_USERS_DATA", payload: message["data"]});
                    resolve(message["data"]);
                }
            }
            ws.onerror = (err) => {
                errorEventHandler(err);
                reject(err);
            }
        }).catch((err) =>{
            errorEventHandler(err);
            reject(err);
        });
    });
}



/*********************************************************************
 * This gets and returns 80 posts that were posted before a certain
 * date.. the date is used as a reference to allow paging. 
 * 
 * Filtering of incog content is done here but filtering of blocked 
 * content is done on the client side. 
 * 
 * 
 * It checks if you have a valid session and that you are subscribed
 * to that group before it returns anything
 * 
 * type: retrieve,
 * action: get_posts
 * payload:
 *    {
 *      "unique_id":"<user's uuid>",
 *      "username":"<user's email>",
 *      "session_token":"<user's session token>",
 *      "server_unique_id":"<server's uuid>",
 *      "date_created":"<reference date to retrieve posts before>",
 *    }
 * 
 * response:
 * [{
 *      "content":"<post content>",
 *      "likes":["<user uuid1>", "<user uuid2>"],
 *      "type":"<post type text/image>",
 *      "incog":"<true/false>",
 *      "date_created":"<ISO 8601 format>",
 *      "unique_id":"<post's unique ID>",
 *      "image_uri":"<link to image>",
 *      "blocked":["user uuid1", "user uuid2"],
 *      "alias":"<user's alias>"
 * }]
 * 
 * full query example (requires valid data)
 * {"type":"retrieve","action":"get_posts", "payload":{"unique_id":"91727e5b-6e21-4eed-8bbd-0303944f64ff", "username":"jack@twitter.com", "session_token":"91727e5b-6e21-4eed-8bbd-0303944f64ff", "server_unique_id":"91727e5b-6e21-4eed-8bbd-0303944f64ff", "date_created":"2019-07-30 18:00:00"}}
 * 
 * @argument date posts returned from present -> past. current timestamp
 *          gets the most recent posts
 **********************************************************************/

function retrievePosts(server_id, date){
    return new Promise((resolve, reject) =>{
        initializeWebsocket().then((ws) =>{
            let accountInfo = Store.getState().Global.accountInfo;
            let sessionToken = Store.getState().Global.sessionToken;
            ws.send('{"type":"retrieve", "action":"get_posts", '
                + '"payload":{"unique_id":"' + accountInfo["user_id"] + '", "username":"'
                + accountInfo["email"] + '", "session_token":"' + sessionToken 
                + '", "server_unique_id":"' + server_id + '", "date_created":"' + date + '"}}');
            return ws;
        }).then((ws) =>{
            ws.onmessage = (message) =>{
                console.log("in networking get posts md " + message["data"]);
                //handle errors & resp
            }
            ws.onerror = (err) => {
                errorEventHandler(err);
                reject(err);
            }
        }).catch((err) =>{
            errorEventHandler(err);
            reject(err);
        });
    });
}


/*********************************************************************
 * Populates the homeData. See data/HomeData.json for an example
 * 
 * This begins by updating the user's account info. Then it gets all
 * of the updated groups and retrieves all group data only for the
 * groups and servers that the user is apart of. The list of groups
 * and servers that the user is apart of can be found in the accountInfo
 * redux variable
 * 
 * It will return a promise that will resolve/reject depending on the
 * status of the retrieve functions. Reject will only be thrown when
 * there is a data error (signals a destroy event so all of the user
 * id's and tokens are reset) and not a network error
 * 
 * 
 * 
 * type: retrieve,
 * payload:
 *    {
 *      "unique_id":"<user's unique ID>",
 *      "username":"<user's email>",
 *      "session_token":"<user's session token>",
 *    }
 * 
 * HomeData format:
 * {
 * "data":[{
 *      "name":"<group name>",
 *      "unique_id":"<group's unique id>",
 *      "alias":"<group alias>",
 *      "scale":"<group's icon scale>",
 *      "image_uri":"<group's image uri>",
 *      "users":"<group's number of users>",
 *      "last_updated":"<iso 8601 last time the group info was updated>",
 *      "unique_id":"<group uuid>",
 *      "servers":[{
 *          "name":"<server's name>",
 *          "unique_id":"<server's unique id>",
 *          "global_permission":"<global permission string>",
 *          "title":"<server's title>",
 *          "description":"<server's description>",
 *          "last_updated":"<iso 8601, last time it sent a request to the server>",
 *          "oldest_post":"<iso 8601, oldest post date (used for pagination)>",
 *          "blocked_users":"<list of blocked users by uuid>",
 *          "owner_id":"<server owner's uuid>",
 *          "date_created":"<server created timestamp>",
 *          "followers":"<number of followers (not uuid list?)>",
 *          "content":[
 *              {"key":"<post uuid>", 
 *               "name":"<user's alias>",
 *               "sub_name":"<user's sub name>",
 *               "image_uri":"<user's profile image>",
 *               "date":"<date of post ISO 8601 format>",
 *               "likes":"<array of user uuid's>",
 *               "type":"<post type either 'text' or the image's scale (WidthxHeight)>",
 *               "content":"<link if image type, text if not>",
 *               "incog":"<bool represents if post is incog or not>"
 *           }
 *          ],
 *          }]
 *      }
 *      ]
 * }
 * 
 **********************************************************************/
async function retrieveHomeData(){
    return new Promise(async (resolve, reject) =>{
    try{
        let uuid = await Store.getState().Global.accountInfo["user_id"];
        var data = [];
        let resp = await retrieveAccountInfo(uuid).catch((err) => reject());
        
        let accountData = JSON.parse(JSON.stringify(Store.getState().Global.accountInfo));
        accountData["name"] = resp["name"];
        accountData["sub_name"] = resp["sub_name"];
        accountData["description"] = resp["description"];
        accountData["image_uri"] = resp["image_uri"];
        accountData["friends"] = resp["friends"];
        accountData["groups"] = [resp["group_unique_id"]];
        accountData["servers"] = resp["servers"];
        
        //set asyncStorage to this and update the state. AsyncStorage will always be a string
        AsyncStorage.setItem("accountInfo", JSON.stringify(accountData));
        Store.dispatch({type:"SET_ACCOUNT_INFO", payload:accountData});
        var currentDate = new Date();
        var groupData = await retrieveGroups();
        
        //refresh all groups & add a timestamp to the
        for(let j in groupData){
            groupData[j]["last_updated"] = currentDate.getTime();
            
            //if the user is subscribed to the group
            if(accountData["groups"].indexOf(groupData[j]["unique_id"])  != -1){
            let servers = [];
            
            for(let i in groupData[j]["servers"]){
                if(accountData["servers"].indexOf(groupData[j]["servers"]["i"]) != -1){
                    var serverResp = await retrieveServer(groupData[j]["servers"][i], groupData[j]["unique_id"]);
                    serverResp = JSON.parse(serverResp);
                    serverResp["last_updated"] = currentDate.getTime();
                    serverResp["content"] = await retrievePosts(serverResp["unique_id"], currentDate.toISOString());
                    servers.push(serverResp);
                }
            }
            groupData[j]["servers"] = servers;
            data.push(groupData[j])
            }
        }
        data = {data:data};
        AsyncStorage.setItem("homeData", JSON.stringify(data));
        Store.dispatch({type:"SET_HOME_DATA", payload:data});
        resolve(JSON.stringify(data));
        // console.log("data is ", JSON.stringify(data));
    }catch(e){reject();}
    }); 
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
 *      "alias":"<user's alias>",
 *      "sub_name":"<user sub name>",
 *      "description":"<user description>",
 *      "image_uri":"<image link>",
 *      "friends":["uuid1", "uuid2"],
 *      "group_unique_id":"<group uuid>",
 *      "servers":["uuid1", "uuid2"],
 *  }
 * 
 **********************************************************************/
function retrieveAccountInfo(uuid){
    return new Promise((resolve, reject) => {
        initializeWebsocket().then((ws) =>{
            ws.send('{"type":"retrieve","action":"get_user","payload":{"uuid":"' + uuid +'"}}');
            return ws;
        }).then((ws) => {
                ws.onmessage = (message) => {
                    if(message["data"] == "error") {
                        errorEventHandler(message["data"]);
                        reject("error");
                    }
                    else resolve(JSON.parse(message["data"]));
                }
                ws.onerror = (err) => {
                    errorEventHandler(err);
                    reject(err);
                }
        }).catch((err) =>{
            errorEventHandler(err);
            reject("internal error in retrieveAccountInfo " + err);
        });
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
                    let payload;
                    try{payload = JSON.parse(store[i][1]);}catch(e){payload = store[i][1];}
                    console.log("dispatching " + keyList[location]["dispatch"]);
                    // keyList[location]["lastPinged"] = Date.now();
                    Store.dispatch({type:keyList[location]["dispatch"], payload: payload});
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
return new Promise((resolve, reject) => {
    var existingWebsocket = Store.getState().Global.webSocket;
    var URL= Store.getState().Global.URL;
    
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

/***********************************************************************
 * Retrieves and labels all groups, servers, and the user's own ID
 * (add friends?)
 * 
 * response:
 * ["<uuid of group/user/server>", "<uuid of group/user/server>"...]
 ***********************************************************************/
function retrieveIDForEvents(){
    const accountData = Store.getState().Global.accountInfo;
    var idList = [];
    for(let i in accountData["groups"]) idList.push(accountData["groups"][i]);
    for(let i in accountData["servers"]) idList.push(accountData["servers"][i]);
    idList.push(accountData["user_id"]);
    return idList;
}



/***********************************************************************
 * Handles different errors that can be thrown by functions in this class.
 * 
 * The purpose of this function is to perform specific actions tailored
 * to certain errors that are thrown.
 * 
 * Here is what is implemented right now
 *      "error - invalid session": nukes the store and logs you out
 * 
 * @argument errorMessage   the error message returned by the server
 ***********************************************************************/
function errorEventHandler(errorMessage){
    switch(errorMessage){
        case "error - invalid session":
            nukeStore();
            NavigationService.navigate("Loading", {source:"signin"});
            break;
        
    }
}





module.exports = {
    testt:  function(msg){return msg;},
    loadFromStore: loadFromStore,
    nukeStore: nukeStore,
    
    //retrieve / init
    initializeWebsocket: initializeWebsocket,
    retrieveGroups: retrieveGroups,
    retrieveServers: retrieveServers,
    retrieveServer: retrieveServer,
    retrieveUsers: retrieveUsers,
    retrieveHomeData: retrieveHomeData,
    retrieveEvents: retrieveEvents,
    login: login,
    getStatus: getStatus,
    createAccount: createAccount,
    groupSub: groupSub,
    retrieveAccountInfo: retrieveAccountInfo,
    ping: ping,
    
    //update
    updateAccountInfo: updateAccountInfo,

    //create
    createPost: createPost,
    createEvent: createEvent,
    createServer: createServer,

    
}