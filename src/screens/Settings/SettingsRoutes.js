import {createStackNavigator, createAppContainer} from "react-navigation";
import {Language, BlockedAccounts, Password, Payments, SearchHistory,
    SwitchTutor, Verify, AccountPrivacy, PushNotifications, EmailNotifications,
    ReportBug, ResolveIssue,} from "./SettingsPages";
import Settings from "./Settings";




const settingsRoutes = createStackNavigator({
    Settings:{screen:Settings},
    Language:{screen: Language},
    BlockedAccounts:{screen: BlockedAccounts},
    Password:{screen: Password},
    Payments:{screen: Payments},
    SearchHistory:{screen:SearchHistory},
    SwitchTutor:{screen:SwitchTutor},
    Verify:{screen:Verify},
    AccountPrivacy:{screen:AccountPrivacy},
    PushNotifications:{screen:PushNotifications},
    EmailNotifications:{screen:EmailNotifications},
    ReportBug:{screen:ReportBug},
    ResolveIssue:{screen:ResolveIssue},
},{
    mode:"card",
    headerMode:"none",
    defaultNavigationOptions:{
        gesturesEnabled:true,
        gestureResponseDistance: 2,
        gestureDirection:"normal",
    },
    initialRouteName:"Settings",
});

export default createAppContainer(settingsRoutes);