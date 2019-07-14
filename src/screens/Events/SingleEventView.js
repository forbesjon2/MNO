import React from 'react';
import {Text, View, Button, TouchableWithoutFeedback, StyleSheet, ScrollView} from 'react-native';
import {Ionicons} from '@expo/vector-icons';
import { connect } from "react-redux";

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
class SingleEventView extends React.Component{
    static navigationOptions = ({navigation}) => ({
        header: null 
    });
    constructor(props){
        super(props);
        //set safe area background
        this.props.dispatch({type:"SET_SAFE_AREA_BACKGROUND", payload:"#5D75F7"});
    }
    render(){
        const {navigation} = this.props;
        return(
    <ScrollView style={{flex:1}}>
        <View style={{minHeight:200, backgroundColor:"#5D75F7"}}>
            <TouchableWithoutFeedback title="Go back" onPress={() => this.props.navigation.goBack()}>
                <View style={{margin:10, maxHeight: 50, maxWidth:200, flex:1, flexDirection:"row", minHeight:50}}>
                <Ionicons name="ios-arrow-back" style={{color:"white", maxWidth:26, marginTop:4, flex:1, flexDirection:"column", fontSize:25}}/>
                <Text style={{color:"white", flex:4, flexDirection:"column", fontSize:24, textAlign:"left", fontFamily:"Roboto-Regular"}}>{dateToMonth(navigation.getParam("date"))}</Text>
                </View>
            </TouchableWithoutFeedback>
            <Text numberOfLines={3} style={{marginLeft:16, marginRight:20, lineHeight:34, fontFamily:"Roboto-Medium", fontSize:26, color:"white"}}>{navigation.getParam("heading")}</Text>
            <Text numberOfLines={1} style={[styles.dateText, {marginTop:30}]}>Thursday, February 28, 2019</Text>
            <Text numberOfLines={1} style={{color:"white", fontFamily:"Roboto-Light", marginLeft:16, fontSize:16, marginBottom:20}}>10:00am - 12:00pm</Text>
        </View>
            <View style={styles.itemView}>
            <Ionicons name="md-paper" style={styles.icon}/>
            <View style={styles.textBorder}>
                <Text style={{fontFamily:"Roboto-Light", lineHeight:24, fontSize:14}}>{navigation.getParam("description")}</Text>
            </View>
            </View>
            <View style={[styles.itemView, {maxHeight:40}]}>
            <Ionicons name="ios-pin" style={styles.icon}/>
            <View style={styles.textBorder}>
                <Text style={{fontFamily:"Roboto-Regular", lineHeight:24, fontSize:14}}>{navigation.getParam("location")}</Text>
            </View>
            </View>
            <View style={[styles.itemView, {maxHeight:40}]}>
            <Ionicons name="ios-people" style={styles.icon}/>
            <View style={styles.textBorder}>
                <Text style={{fontFamily:"Roboto-Regular", lineHeight:24, fontSize:14}}>{navigation.getParam("attending").length} Attending</Text>
            </View>
            </View>
            {/* <Text>{navigation.getParam("start_time")}</Text>
            <Text>{navigation.getParam("end_time")}</Text> */}
    </ScrollView>
        );
    }
}

const styles = StyleSheet.create({
    dateText:{
        color:"white",
        fontFamily:"Roboto-Light",
        marginLeft:16,
        fontSize:16,
    },
    icon:{
        color:"#897BD1",
        flex:1,
        flexDirection:"column",
        textAlign:"center",
        fontSize:24
    },
    itemView:{
        flex:1,
        flexDirection:"row",
        marginTop:10,
        marginRight:10
    },
    textBorder:{
        flex:7,
        flexDirection:"column",
        borderBottomColor:"#BEBEBE",
        borderBottomWidth:1.5,
        paddingBottom:12
    }
});

function dateToMonth(date){
    const monthArray = ["Janurary", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
    return monthArray[Number(date.split("-")[1]-1)];
}


const mapStateToProps = (store) => ({
    
});

const SingleEventViewScreen = connect(mapStateToProps)(SingleEventView);
export default SingleEventViewScreen;