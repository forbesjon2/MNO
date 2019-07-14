import {createStackNavigator, createAppContainer} from "react-navigation";
import Loading from "./Loading";
import SignIn from "./SignIn";
import SignUp from "./SignUp";
import SchoolSearch from "./SchoolSearch";
import RoomSearch from './RoomSearch';



const initialRoutes = createStackNavigator({
    Loading:{screen:Loading},
    SignIn:{screen: SignIn},
    SignUp:{screen: SignUp},
    SchoolSearch:{screen: SchoolSearch},
    RoomSearch:{screen: RoomSearch},
},{
    mode:"card",
    headerMode:"none",
    defaultNavigationOptions:{
        gesturesEnabled:true,
        gestureResponseDistance: 2,
        gestureDirection:"normal",
    },
    initialRouteName:"SignIn",
});

export default createAppContainer(initialRoutes);