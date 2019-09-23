import React from 'react';
import {Text, View, ScrollView, Image, TextInput, TouchableWithoutFeedback, Animated, Keyboard, FlatList} from 'react-native';
import {Ionicons} from '@expo/vector-icons';
import {styles} from "../../Styles";
import Store from "../../Store";
import {retrieveUsers, retrieveEvents, retrieveServers} from "../../Networking";


export default class GroupView extends React.Component{
    constructor(props){
        this.state = {

        }
                //set safe area background
                Store.dispatch({type:"SET_SAFE_AREA_BACKGROUND", payload:"#ffffff"});
    }
    /*************************************************************************
    * This performs operations essential for retrieving users, events, & server
    * data
    *************************************************************************/
   componentWillMount(){
   }
   render(){
       return(<Text>in GroupView</Text>);
   }
}