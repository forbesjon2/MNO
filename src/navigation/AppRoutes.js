import {createAppContainer, createSwitchNavigator} from 'react-navigation';
import HomeScreen from "../screens/Home/Home";
import EventRoutes from "../screens/Events/EventRoutes";
import DiscoverScreen from "../screens/Discover/Discover";
import SettingsRoutes from "../screens/Settings/SettingsRoutes";
import MessagesRoutes from "../screens/Messages/MessagesRoutes";
import profileScreen from '../screens/Profile/Profile';


/*************************************************************************
 * HOME ROUTES
 * 
 * Include all of the pages that you may want to navigate to inside the
 * home screen.
 * 
 * Home: the main screen
 * Profile: Happens when a user clicks on the name of another user, it
 *      redirects to their profile
 *************************************************************************/
const homeRoutes = createSwitchNavigator({
    Home:{screen: HomeScreen}, 
    Profile:{screen:profileScreen}});


/*************************************************************************
 * APP ROUTES
 * 
 * Include the most generic forms of every route
 * 
 * Home: the main screen
 * Events: the events screen (with the calendar)
 * Discover: the search screen
 * Profile: your profile screen
 * Settings: the settings screen with many routes inside a stackNavigator
 *          located inside SettingsRoutes.js in the settings folder
 *************************************************************************/
const AppRoutes = createSwitchNavigator({
    Home:{screen: homeRoutes},
    Events:{screen: EventRoutes},
    Discover:{screen: DiscoverScreen},
    // Messages:{screen: MessagesRoutes},
    Profile:{screen: profileScreen},
    Settings:{screen: SettingsRoutes},
}, {
    initialRouteName:"Home",
    // mode: "card",
    // headerMode: "none",
    resetOnBlur: false,
});

export default createAppContainer(AppRoutes);