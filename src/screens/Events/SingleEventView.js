import React from 'react';
import {Text, View, Button, TouchableWithoutFeedback, StyleSheet, ScrollView} from 'react-native';
import {Ionicons} from '@expo/vector-icons';

/**
 * This is the page that shows the individual event.
 * It appears when you click on a particular event in the
 * events page and redirects you here.
 * 
 * The purpose of this page is to show more details, and a full
 * description/title of the evnet
 * 
 * TODO style this
 */
export default class SingleEventView extends React.Component{
    static navigationOptions = ({navigation}) => ({
        header: null 
    });
    constructor(props){
        super(props);
    }
    render(){
        const {navigation} = this.props;
        return(
    <View style={{flex:1}}>
        <View style={{flex:1, height:250, backgroundColor:"#0A60E2"}}>
            <TouchableWithoutFeedback title="Go back" onPress={() => this.props.navigation.goBack()}>
                <View style={{margin:10, maxHeight: 50, maxWidth:200, flex:1, flexDirection:"row"}}>
                <Ionicons name="ios-arrow-back" style={{color:"white", maxWidth:26, marginTop:4, flex:1, flexDirection:"column", fontSize:25}}/>
                <Text style={{color:"white", flex:4, flexDirection:"column", fontSize:24, textAlign:"left"}}>{dateToMonth(navigation.getParam("date"))}</Text>
                </View>
            </TouchableWithoutFeedback>
        </View>
        <View style={{flex:2}}>
            <Text>Event {navigation.getParam("date")}</Text>
            <Text>{navigation.getParam("heading")}</Text>
            <Text>{navigation.getParam("location")}</Text>
            <Ionicons name="ios-pin" />
            <Ionicons name="ios-people" />
            <Text>{navigation.getParam("start_time")}</Text>
            <Text>{navigation.getParam("end_time")}</Text>
            <Ionicons name="ios-calendar" />
            <Ionicons name="ios-time" />
            <Text>{navigation.getParam("description")}</Text>
        </View>
    </View>
        );
    }
}


function dateToMonth(date){
    const monthArray = ["Janurary", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
    return monthArray[Number(date.split("-")[1]-1)];
}