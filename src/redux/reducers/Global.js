export default function reducer(
    state = {
        //Global variables
        loading: true,
        connectionView:false,
        connectionViewConnecting:true,
        accountInfo: null,
        safeAreaBackground:"#ffffff",
        sessionToken: null,
        webSocket: null,
        
        //nav
        pageID: 1,
        showNav: false,

        //page data
        notifications: [],
        calendarData: null,
        groupData: null,
        serverData: null,
        chats: null,
        homeData: null,
        messagesHome: null,
        
        //home
        homeGroups: "",

        //event subnav
        startEventTime: "---",
        endEventTime: "---",

        //ping keylist
        keyList: [
            {dispatch:"SET_SESSION_TOKEN", variable:"sessionToken", lastPinged:"", maxTimeoutMs:"31556952000"},
            {dispatch:"SET_ACCOUNT_INFO", variable:"accountInfo", lastPinged:"", maxTimeoutMs:""}
        ]
    },
    action
    
){
    // console.log("GOOTT ", action);
    switch(action.type){
        /*****************************************************************
         * GLOBAL VARIABLES
         * 
         *      SET_ACCOUNT_INFO Sets the user's account info
         * 
         *      SET_SAFE_AREA_BACKGROUND
         * This changes the safe area's background color. It's a component
         * for iOS that defines a safe area to put content in but this app
         * also implements a rough version for android. 
         * 
         * This is outside of the notch and a little over the bottom of the 
         * screen. It's changed according to the background color of the
         * screen behind it
         * 
         * This must be in hex form!
         * 
         *      SET_SESSION_TOKEN
         * Sets the user's session token. (expires in 1 year)
         * 
         *      SET_KEY_LIST
         * this variable is used in Networking.js It basically defines what
         * keys to look out for on initialization so it can load it from
         * async storage.. 
         *  dispatch: the dispatch var required in setting that key
         *  variable: the redux variable name & the 'key' found in asyncstorage
         *  lastPinged: time in ms since the epoch. Updated when it grabs
         *              its value from the server
         *  maxTimeoutMs: the max amount of time that this is allowed to
         *                exist for without being labeled as 'outdated' and
         *                updating in Networking.ping
         *  
         *  
         ******************************************************************/
        case "SET_ACCOUNT_INFO": return{...state, accountInfo: action.payload};
        case "SET_SAFE_AREA_BACKGROUND": return{...state, safeAreaBackground: action.payload};
        case "SET_SESSION_TOKEN": return{...state, sessionToken: action.payload};
        case "SET_KEY_LIST": return{...state, keylist: action.payload};

        /*****************************************************************
         * PAGE INDEX SUMMARY
         * 
         * id's
         *  1 = home
         *  2 = events
         *  3 = discover
         *  (4 = messages)
         *  4 = profile
         *  5 = settings
         ******************************************************************/
        case "SET_PAGE":
            return{...state, pageID: action.id};

        /*****************************************************************
         * MAIN EVENTS
         * 
         *      SET_CALENDAR_DATA
         * 
         *      SET_ACCOUNT_INFO
         * 
         *      SET_GROUP_DATA
         * 
         *      SET_CHATS
         * 
         *      SET_HOME_DATA
         * 
         *      SET_MESSAGES_HOME
         * 
         *      SET_SERVER_DATA
         * 
         *      SHOW_NAV
         * can be used by pages listed inside appRoutes.js to show the navBar
         *      HIDE_NAV
         * can be used by pages listed inside appRoutes.js to hide the navBar
         *      SET_LOADED
         * sets the page to loaded changing the loading screen to the actual content
         ******************************************************************/
        case "SET_NOTIFICATIONS": return{...state};
        case "SET_CALENDAR_DATA": return{...state, calendarData: action.payload};
        case "SET_ACCOUNT_INFO": return{...state, accountInfo: action.payload};
        case "SET_GROUP_DATA": return{...state, groupData: action.payload};
        case "SET_CHATS": return{...state, chats: action.payload};
        case "SET_HOME_DATA": return{...state, homeData: action.payload};
        case "SET_MESSAGES_HOME": return{...state, messagesHome: action.payload};
        case "SET_SERVER_DATA": return{...state, serverData: action.payload};
        case "SHOW_NAV": return{...state, showNav: true};
        case "HIDE_NAV": return{...state, showNav: false};
        case "SET_LOADED": return{...state, loading:false};
        case "SET_CONNECTION_VIEW": return{...state, connectionView:action.payload};



        /*****************************************************************
         * EVENT SUBNAV
         * 
         *      SET_START_EVENT_TIME & SET_END_EVENT_TIME
         * This is fired by the AndroidDatePicker (as well as the ios
         * DatePicker) inside the TimePicker.js file.
         * 
         * 
         ******************************************************************/
        case "SET_START_EVENT_TIME":
            return{...state, startEventTime: action.payload};
        case "SET_END_EVENT_TIME":
            return{...state, endEventTime: action.payload};
        


        default:
            return state;
        
    }
}