export default function reducer(
    state = {
        //Global variables
        loading: true,
        accountInfo:{},
        safeAreaBackground:"#ffffff",

        //nav
        pageID: 1,
        showNav: true,

        //page data
        notifications: [],
        calendarData:{},
        groupData:{},
        serverData:{},
        chats:{},
        homeData:{},
        messagesHome:{},
        
        //home
        homeGroups: "",

        //event subnav
        startEventTime: "---",
        endEventTime: "---",
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
         ******************************************************************/
        case "SET_ACCOUNT_INFO": return{...state, accountInfo: action.payload};
        case "SET_SAFE_AREA_BACKGROUND": return{...state, safeAreaBackground: action.payload};

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