import React from 'react';
import {Text, View, Button, TouchableWithoutFeedback, ScrollView} from 'react-native';
import {Ionicons} from '@expo/vector-icons';
import Store from "../../Store";
import {styles} from "../../Styles";
/**
 * This is the page that shows the individual event.
 * It appears when you click on a particular event in the
 * events page and redirects you here.
 * 
 * The purpose of this page is to show more details, and a full
 * description/title of the evnet
 * 
 * TODO fix the date & implement attending
 */
export default class SingleEventView extends React.Component{
    static navigationOptions = ({navigation}) => ({
        header: null 
    });
    constructor(props){
        super(props);
        //set safe area background
        Store.dispatch({type:"SET_SAFE_AREA_BACKGROUND", payload:"#5D75F7"});
    }
    render(){
        const {navigation} = this.props;
        const monthArray = ["Janurary", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
        const month = monthArray[new Date(navigation.getParam("start_time")).getMonth()];
        const dateString = new Date(navigation.getParam("start_time")).toDateString();
        const startTime = new Date(navigation.getParam("start_time")).toLocaleTimeString();
        const endTime = new Date(navigation.getParam("end_time")).toLocaleTimeString();
        return(
    <ScrollView style={{flex:1}}>
        <View style={{minHeight:200, backgroundColor:"#5D75F7"}}>
            <TouchableWithoutFeedback title="Go back" onPress={() => this.props.navigation.goBack()}>
                <View style={{margin:10, maxHeight: 50, maxWidth:200, flex:1, flexDirection:"row", minHeight:50}}>
                <Ionicons name="ios-arrow-back" style={{color:"white", maxWidth:26, marginTop:4, flex:1, flexDirection:"column", fontSize:25}}/>
                <Text style={{color:"white", flex:4, flexDirection:"column", fontSize:24, textAlign:"left", fontFamily:"Roboto-Regular"}}>{month}</Text>
                </View>
            </TouchableWithoutFeedback>
            <Text numberOfLines={3} style={styles.singleeventview_heading}>{navigation.getParam("heading")}</Text>
            <Text numberOfLines={1} style={styles.singleeventview_dateText}>{dateString}</Text>
            <Text numberOfLines={1} style={styles.singleeventview_timeText}>{startTime} - {endTime}</Text>
        </View>
            <View style={styles.singleeventview_itemView}>
            <Ionicons name="md-paper" style={styles.singleeventview_icon}/>
            <View style={styles.singleeventview_textBorder}>
                <Text style={{fontFamily:"Roboto-Light", lineHeight:24, fontSize:14}}>{navigation.getParam("description")}</Text>
            </View>
            </View>
            <View style={[styles.singleeventview_itemView, {maxHeight:40}]}>
            <Ionicons name="ios-pin" style={styles.singleeventview_icon}/>
            <View style={styles.singleeventview_textBorder}>
                <Text style={{fontFamily:"Roboto-Regular", lineHeight:24, fontSize:14}}>{navigation.getParam("location")}</Text>
            </View>
            </View>
            <View style={[styles.singleeventview_itemView, {maxHeight:40}]}>
            <Ionicons name="ios-people" style={styles.singleeventview_icon}/>
            <View style={styles.singleeventview_textBorder}>
                <Text style={{fontFamily:"Roboto-Regular", lineHeight:24, fontSize:14}}>{navigation.getParam("attending").length} Attending</Text>
            </View>
            </View>
            {/* <Text>{navigation.getParam("start_time")}</Text>
            <Text>{navigation.getParam("end_time")}</Text> */}
    </ScrollView>
        );
    }
}