import {SET_PAGE, SET_CURRENT_GROUP, SET_HOME_GROUPS, SET_GROUP_LAST_UPDATED, SET_CURRENT_DATE, SET_NOTIFICATIONS} from "../Actions";

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
        butt:"fantastic",
        
        //home
        homeGroups: "",
        currentGroup: "",
        groupLastUpdated: "",

        //events
        events:{},
        currentDate: "",

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
         *      SET_CURRENT_DATE (YYYY-MM-DD format)
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
        case "SET_ACCOUNT_INFO":
            return{...state, accountInfo: action.payload};
        case "SET_SAFE_AREA_BACKGROUND":
            return{...state, safeAreaBackground: action.payload};

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
        case SET_PAGE:
            return{...state, pageID: action.id};

        /*****************************************************************
         * RANDOM EVENTS
         * 
         *      SET_A (through E)
         * used by the init functions, these events are temporary
         *      SHOW_NAV
         * can be used by pages listed inside appRoutes.js to show the navBar
         *      HIDE_NAV
         * can be used by pages listed inside appRoutes.js to hide the navBar
         *      SET_LOADED
         * sets the page to loaded changing the loading screen to the actual content
         ******************************************************************/
        case SET_NOTIFICATIONS:
            return{...state}
        case "SET_A":
            return{...state, calendarData: action.payload};
        case "SET_AI":
            return{...state, accountInfo: action.payload};
        case "SET_B":
            return{...state, groupData: action.payload};
        case "SET_C":
            return{...state, chats: action.payload};
        case "SET_D":
            return{...state, homeData: action.payload};
        case "SET_E":
            return{...state, messagesHome: action.payload};
        case "SET_R":
            return{...state, serverData: action.payload};
        case "SHOW_NAV":
            return{...state, showNav: true};
        case "HIDE_NAV":
            return{...state, showNav: false};
        case "SET_LOADED":
            return{...state, loading:false};


        /*****************************************************************
         * HOME
         * 
         *      SET_HOME_GROUPS
         * 
         *      SET_CURRENT_GROUP
         * 
         *      SET_GROUP_LAST_UPDATED
         * The format is hours since epoch. Its referenced by Scripts.js in
         * the initHome class inside the scripts folder
         * 
         ******************************************************************/
        case SET_HOME_GROUPS:
            return{...state, homeGroups:"ab"};
        case SET_CURRENT_GROUP:
            return{...state, currentGroup: action.payload};
        case SET_GROUP_LAST_UPDATED:
            return{...state, groupLastUpdated: action.payload};


        /*****************************************************************
         * EVENTS (calendar page)
         * 
         *      SET_CURRENT_DATE (YYYY-MM-DD format)
         * dispatched when the user clicks on a specific date on the calendar
         * 
         ******************************************************************/
        case SET_CURRENT_DATE:
            return{...state, currentDate: action.currentDate};
        

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