import React from 'react';
import {Text, View, StyleSheet, TouchableWithoutFeedback, FlatList, Image} from 'react-native';
import { connect } from "react-redux";
import {Ionicons} from '@expo/vector-icons';
import ContentView from './ContentView';

class HomeComponent extends React.Component{
    constructor(props){
        super(props);
        this.state = {
            imgHeight: null,
            imgWidth: null
        }
    }

    render(){
    const {homeData, currentGroup} = this.props;
    const dataObj = getHomeData(homeData, currentGroup);
    return(
    <FlatList style={styles.mainView}
        data={dataObj["content"]}
        
        renderItem={({item, separators}) =>(
        <View style={styles.mainView}>
        
        {/* This is the styling for each of the headers date is not yet included*/}
        <View style={styles.headerView}>
            <Image source={{uri:item.imageURI}} style={styles.headerImgView}/>
            <View style={styles.headerTextView}>
                <Text numberOfLines={1} style={styles.headerName}>{item.name}</Text>
                <Text numberOfLines={1} style={styles.headerSubName}>{item.subName}</Text>
            </View>
            {/* <Text style={{flex:1, minWidth:60, textAlign:"right", alignSelf:"flex-end", fontFamily:"Khula-Regular", fontSize:14}}>6 minutes ago</Text> */}
        </View>

        {/* Text or image content (uses type property*/}
        <View style={styles.contentView}>
            <ContentView content={item.content} type={item.type} />
        </View>

        {/* Sub content view. This includes the heart icon & the to be implemented @ icon */}
        <View style={styles.subContentView}>
        <TouchableWithoutFeedback style={{flex:1, flexDirection:"column"}}>
            <View style={{flex:1, flexDirection:"row"}}>
                <Ionicons name="ios-heart-empty" style={{fontSize:21, flex:1, flexDirection:"column"}} color={"#ED1A7C"}/>  
                <Text style={{fontFamily:"Khula-Regular", fontSize:12, flex:1, flexDirection:"column", textAlign:"left", alignSelf:"center"}}>17</Text> 
            </View>
            
        </TouchableWithoutFeedback>
        {/* <TouchableWithoutFeedback style={{flex:1, flexDirection:"column"}}>
            <Ionicons name="ios-at" style={{fontSize:21}} color={"#00B5E1"}/>
        </TouchableWithoutFeedback> */}
            <View style={{flex:5, flexDirection:"column"}}></View>
        </View>    
        </View>
        )}/>
    );
    }
};

/*************************************************************************
 * Checks the redux variable 'homeData' for data in what's stored as
 * the redux variable 'currentGroup'. A similar instance of this is found
 * in Home.js
 * 
 * @param {*} homeData see the readme in data for examples/description
 * @param {*} currentGroup <home>@<group> format
 **************************************************************************/
function getHomeData(homeData, currentGroup){
    let name = currentGroup.toString().split("@")[0];
    let server = "@" + currentGroup.toString().split("@")[1];
    for(let i in homeData["data"]){
        if(name == homeData["data"][i]["name"]){
            for(let j in homeData["data"][i]["servers"]) if(homeData["data"][i]["servers"][j]["name"] == server) return homeData["data"][i]["servers"][j];
        }
    }
    return;
}

const styles = StyleSheet.create({
    mainView:{
        flex: 1, 
        flexDirection:"column",
        paddingTop:20,
        paddingBottom:20,
    },
    headerView:{
        flex:1,
        flexDirection:"row",
        paddingLeft:10,
        paddingRight:10,
    },
    headerTextView:{
        flex:3,
        flexDirection:"column",
        paddingLeft:12
    },
    headerName:{
        fontFamily:"Khula-Bold",
        fontSize:20,
        color:"black"
    },
    headerSubName:{
        fontFamily:"Khula-Regular",
        fontSize:14,

    },
    headerImgView:{
        width:50,
        height:50,
        borderRadius:10,
    },
    subContentView:{
        paddingLeft:10,
        paddingRight:10,
        paddingTop:10,
        flex:1,
        flexDirection:"row"
    },
    contentView:{
        paddingTop:10
    }
})



const mapStateToProps = (store) => ({
    homeData: store.Global.homeData,
    currentGroup: store.Global.currentGroup
});

const homeComponentScreen = connect(mapStateToProps)(HomeComponent);
export default homeComponentScreen;