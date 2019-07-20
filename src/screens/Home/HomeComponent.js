import React from 'react';
import {Text, View, TouchableWithoutFeedback, FlatList, Image} from 'react-native';
import { connect } from "react-redux";
import {Ionicons} from '@expo/vector-icons';
import ContentView from './ContentView';
import {styles} from "../../Styles";

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
    <FlatList style={styles.homecomponent_mainView}
        data={dataObj["content"]}
        
        renderItem={({item, separators}) =>(
        <View style={styles.homecomponent_mainView}>
        
        {/* This is the styling for each of the headers date is not yet included*/}
        <View style={styles.homecomponent_headerView}>
            <Image source={{uri:item.image_uri}} style={styles.homecomponent_headerImgView}/>
            <View style={styles.homecomponent_headerTextView}>
                <Text numberOfLines={1} style={styles.homecomponent_headerName}>{item.name}</Text>
                <Text numberOfLines={1} style={styles.homecomponent_headerSubName}>{item.sub_name}</Text>
            </View>
            {/* <Text style={{flex:1, minWidth:60, textAlign:"right", alignSelf:"flex-end", fontFamily:"Khula-Regular", fontSize:14}}>6 minutes ago</Text> */}
        </View>

        {/* Text or image content (uses type property*/}
        <View style={styles.homecomponent_contentView}>
            <ContentView content={item.content} type={item.type} />
        </View>

        {/* Sub content view. This includes the heart icon & the to be implemented @ icon */}
        <View style={styles.homecomponent_subContentView}>
        <TouchableWithoutFeedback style={{flex:1, flexDirection:"column"}}>
            <View style={{flex:1, flexDirection:"row"}}>
                <Ionicons name="ios-heart-empty" style={{fontSize:21, flex:1, flexDirection:"column"}} color={"#ED1A7C"}/>  
                <Text style={{fontFamily:"Khula-Regular", fontSize:12, flex:1, flexDirection:"column", textAlign:"left", alignSelf:"center"}}>17</Text> 
            </View>
            
        </TouchableWithoutFeedback>
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



const mapStateToProps = (store) => ({
    homeData: store.Global.homeData,
    currentGroup: store.Global.currentGroup
});

const homeComponentScreen = connect(mapStateToProps)(HomeComponent);
export default homeComponentScreen;