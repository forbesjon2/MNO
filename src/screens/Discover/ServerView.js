import React from 'react';
import {Text, View, ScrollView, Image, TextInput, TouchableWithoutFeedback, Animated, TouchableOpacity, Keyboard, FlatList} from 'react-native';
import {Ionicons} from '@expo/vector-icons';
import {styles} from "../../Styles";
import Store from "../../Store";
import {retrieveUsers, retrieveEvents, retrieveServers} from "../../Networking";

    /*************************************************************************
    * Shows more details about a particular server
    * 
    * Navigating to this requires the following
    * serverName: name of the server
    * serverAlias: the server's alias
    * serverID: server's uuid
    * followers: number of followers following this server
    * 
    * after rendering, this page will send requests to retrieve the following:
    * serverDescription: server's description
    * permissionString: serversPermissionString
    * 
    * it will send requests to retrieve the founder of the server
    *************************************************************************/
export default class ServerView extends React.Component{
    static navigationOptions = ({navigation}) => ({
        header: null 
    });
    constructor(props){
        super(props);
        // this.state = {
        // }
        //set safe area background
        Store.dispatch({type:"SET_SAFE_AREA_BACKGROUND", payload:"#ffffff"});
    }
    /*************************************************************************
    * This performs operations essential for retrieving users, events, & server
    * data
    *************************************************************************/
   componentWillMount(){
       const {navigation} = this.props;
        let serverName = navigation.getParam("serverName");
        let serverAlias = navigation.getParam("serverAlias");
        let serverID = navigation.getParam("serverID");
        let followers = navigation.getParam("followers");
        // let serverDescription = navigation.getParam("serverDescription");
        // let permissionString = navigation.getParam("permissionString");
   }
   render(){
    return(
    <ScrollView style={{flex:1, backgroundColor:"#F5F5F5"}}>
        
        
    {/* Join button view */}
    <TouchableOpacity onPress={() => console.log("join group pressed")}>
    <View style={{minHeight:160}}>
        <View style={{height:80, width:80, backgroundColor:"white", borderRadius:44, borderColor:"black", borderWidth:1, justifyContent:"center", alignSelf:"center", marginTop:40}}>
            <Text style={{fontFamily:"DidactGothic-Regular", fontSize:24, alignSelf:"center"}}>JOIN</Text>
        </View>
    </View>
    </TouchableOpacity>


    {/* Group name & details */}
    <View style={{minHeight:160}}>
        <Text numberOfLines={2} style={{fontFamily:"Khula-Light", fontSize:24, lineHeight:30, marginTop:10, marginHorizontal:12, marginBottom:18}}>Operating systems and open source group</Text>
        <Text numberOfLines={1} style={{fontFamily:"Khula-ExtraBold", fontSize:18, lineHeight:25, marginHorizontal:12}}>@os2g</Text>
        <Text numberOfLines={1} style={{fontFamily:"Khula-ExtraBold", fontSize:18, lineHeight:25, marginHorizontal:12}}>28 Followers</Text>
    </View>




    {/*  */}



    </ScrollView>);
   }
}