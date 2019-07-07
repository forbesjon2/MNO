import {createStackNavigator, createAppContainer} from "react-navigation";
import Events from "./Events";
import SingleEventView from "./SingleEventView";


const eventRoutes = createStackNavigator({
    Events:{screen:Events},
    SingleEventView:{screen:SingleEventView}
},{
    initialRouteName:"Events",
});

export default createAppContainer(eventRoutes);