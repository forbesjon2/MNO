import {createStackNavigator, createAppContainer} from "react-navigation";
import MessagesHome from "./MessagesHome";
import Chat from "./Chat";



const messagesRoutes = createStackNavigator({
    MessagesHome:{screen:MessagesHome},
    Chat:{screen: Chat},
},{
    initialRouteName:"MessagesHome",
    mode:"card",
});
export default createAppContainer(messagesRoutes);