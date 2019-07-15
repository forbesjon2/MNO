import React from 'react';
import {Text, View, Animated, Image, StyleSheet, TouchableWithoutFeedback, ScrollView, Dimensions, PanResponder} from 'react-native';
import { connect } from "react-redux";
import {Ionicons} from '@expo/vector-icons';
import HomeComponent from './HomeComponent';
import NavigationService from "../../navigation/NavigationService";

class Home extends React.Component{
    constructor(props){
        super(props);

        /*************************************************************************
         * panResponder handles
         * Some redux variables need the latest value. in which case it has to be
         * referenced at that instance
         *************************************************************************/
        const panResponder = PanResponder.create({
            onStartShouldSetPanResponder: (evt, gesture) => {
                if((Math.abs(gesture.dx) < 20)) return false;
                return true;
            },
            onMoveShouldSetPanResponder: (evt, gesture) => {
                if((Math.abs(gesture.dx) < 20)) return false;
                return true;
            },
            onPanResponderMove: (evt, gesture) => {
                this.moveSidebar(gesture.dx);
            },
            onPanResponderRelease: (evt, gesture) => {
                let setNavExpanded = [gesture.dx < 82.5 ? true : false];
                this.setState({navExpanded: setNavExpanded});
                this.animateSidebar(0, 250, 200);
                
            }
        });

        this.state = {
            navExpanded: false,
            positionValue: new Animated.Value(-250),
            mainPositionValue: new Animated.Value(0),
            panResponder
        }
        //set safe area background
        this.props.dispatch({type:"SET_SAFE_AREA_BACKGROUND", payload:"#ffffff"});
        this.animateSidebar = this.animateSidebar.bind(this);
    }
    //Handles the animation for the sidebar aka leftNav (specific to the homescreen)
    animateSidebar(r1, r2, speed){
        const {positionValue, navExpanded, mainPositionValue} = this.state;
        Animated.timing(
            positionValue,{
                toValue: [navExpanded ? -250 : r1][0],
                duration: speed,
            }
        ).start();
        Animated.timing(
            mainPositionValue,{
                toValue:[navExpanded ? 0 : r2][0],
                duration: speed,
            }
        ).start();
        this.setState({navExpanded: !navExpanded});
    }

    moveSidebar(value){
        const {positionValue, mainPositionValue, navExpanded} = this.state;
        if(value >= 165 || navExpanded == true) return;
        
        Animated.timing(
          positionValue,{
              toValue: (1.5 * value) - 250,
              duration:0
          }
        ).start();

        Animated.timing(
          mainPositionValue,{
              toValue: 1.5* value,
              duration:0
          }
        ).start();
    }


    render(){
    const {homeData, currentGroup}= this.props;
    const {navState} = this.state;
    const currentGroupContent = getHomeData(homeData, currentGroup);
    let handles = this.state.panResponder.panHandlers;
    return(
    <View style={{flex: 1, backgroundColor:"white"}} {...handles}>
    {/* The header with the (not yet functional) search and side menu feature */}
        <Animated.View style={[styles.header, {width: Dimensions.get("window").width, left:this.state.mainPositionValue}]}>
            <TouchableWithoutFeedback onPress={() => this.animateSidebar(0, 250, 400)}>
                <Ionicons name="ios-menu" style={[styles.headerIcon, {textAlign:"right", marginRight:8}]} color={"black"}/>
            </TouchableWithoutFeedback>
            <Text style={styles.headerText} numberOfLines={1}>{currentGroupContent["title"]}</Text>
            <TouchableWithoutFeedback>
                <Ionicons name="ios-information-circle-outline" style={[styles.headerIcon, {textAlign:"left", marginLeft:8}]} color={"black"}/>
            </TouchableWithoutFeedback>
        </Animated.View>

        {/* The main view with all of the content */}
        <Animated.View style={[styles.mainView, {width:Dimensions.get("window").width, left:this.state.mainPositionValue}]}>
            <View style={{flex:1}}>
            <HomeComponent />
            </View>
        </Animated.View>


        <Animated.View style={{width:250, left:this.state.positionValue, top:0, bottom:0, position:"absolute", backgroundColor:"#F8F8FA"}} elevation={0}>
        {/* This view shows general information about your account */}
        {getAccountDetails(this.props.dispatch)}
        
        {/* This is a list that shows all of your subscribed to channels */}
        <ScrollView style={{flex:1}}>
        {getButtonList(homeData["data"], currentGroup, this.props.dispatch)}
        </ScrollView>
        </Animated.View>
    </View>
    );
    }
};


function getAccountDetails(dispatch){
    return(
        <TouchableWithoutFeedback onPress={() => {
            NavigationService.navigate("Profile");
            dispatch({type: "SET_PAGE", id:5});
        }}>
        <View style={{minHeight:180, borderBottomColor:"black"}}>
            {randomLanguage()}
            <Image source={{uri:'https://facebook.github.io/react-native/docs/assets/favicon.png'}} style={styles.topViewImage}/>
            <Text style={styles.topViewName}>Hello,</Text>
            <Text numberOfLines={1} style={[styles.topViewName, {marginBottom:20}]}>Marshall</Text>
        </View>
        </TouchableWithoutFeedback>
    );
}

/**************************************************************************
 * returns the word menu in one of 6 randome languages
 **************************************************************************/
function randomLanguage(){
    switch(Math.floor(Math.random() * 6) + 1){    
        case 1:
            return(<Text style={styles.languageMenu}>功能表</Text>);
        case 2:
            return(<Text style={styles.languageMenu}>메뉴</Text>);
        case 3:
            return(<Text style={styles.languageMenu}>菜单</Text>);
        case 4:
            return(<Text style={styles.languageMenu}>Menú</Text>);
        case 5:
            return(<Text style={styles.languageMenu}>Меню</Text>);
        case 4:
            return(<Text style={styles.languageMenu}>Menü</Text>);
        case 5:
            return(<Text style={styles.languageMenu}>منوی</Text>);
        default:
            return(<Text style={styles.languageMenu}>メニュー</Text>);  
    }
}

/**************************************************************************
 * Gets the button list for the slide out menu. Returns an array with the
 * (required) unique keys for every element
 * 
 * @param {*} homeData  the redux variable homeData which contains all of
 *      the users subscribed to groups. For examples & a better description
 *      of whats in the JSON see the data folder
 * @param {*} currentGroup  a string representing the currently selected
 *      group. This is <global>@<server>
 * @param {*} dispatch  an instance of the 'this.props.dispatch' redux var
 **************************************************************************/
function getButtonList(homeData, currentGroup, dispatch){
    let returnObj = [];
    let current_group_view = currentGroup.split("@")[0];
    let current_group_server = "@" + currentGroup.split("@")[1];
    for(var i in homeData){
        //generates the channel header
        let view = homeData[i]["name"];
        let isInGroup = view == current_group_view;
        let iconOpacity = [isInGroup ? {opacity: 1, color: "black"} : {opacity:0.5, color:"black"}];
        returnObj.push(<View key={"header" + i.toString()} style={[sideListStyles.headerView]}><Ionicons name="ios-globe" style={[sideListStyles.headerIcon, iconOpacity[0]]} color={"black"}/><Text style={[sideListStyles.headerText, iconOpacity[0]]}>{homeData[i]["name"]}</Text></View>);
        //Generates header contents (each server)
        for(var j in homeData[i]["servers"]){
            let group = homeData[i]["servers"][j]["name"];
            var elementStyle, viewStyle;
            [group == current_group_server && isInGroup ? elementStyle = sideListStyles.elementSelected : elementStyle = sideListStyles.elementView];
            [group == current_group_server && isInGroup ? viewStyle = sideListStyles.selectedView : viewStyle = sideListStyles.normalView];
            returnObj.push(<TouchableWithoutFeedback key={"item" + i.toString() + "element" + j} onPress={() => {dispatch({type:"SET_CURRENT_GROUP", payload: "" + view + group})}}><View style={viewStyle}><Text style={[sideListStyles.elementText, elementStyle]}>{homeData[i]["servers"][j]["name"]}</Text></View></TouchableWithoutFeedback>);
        }
    }
    return returnObj;
}


/*************************************************************************
 * Checks the redux variable 'homeData' for data in what's stored as
 * the redux variable 'currentGroup'. A similar instance of this is found
 * in HomeComponent.js
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
    languageMenu:{
        fontSize: 48,
        marginLeft:18,
        marginTop:10,
        color:"black"
    },
    header:{
        textAlign:"center",
        alignSelf:"center",
        height:100,
        flex:1,
        flexDirection:"row",
        maxHeight:40,
        paddingTop:8,
    },
    headerText:{
        fontFamily:"DidactGothic-Regular",
        fontSize:21,
        color:"black",
        flex:8,
        flexDirection:"column",
        textAlign:"center"
    },
    headerIcon:{
        fontSize:28,
        flex:1,
        flexDirection:"column",
    },
    mainView:{
        flex:1,
    },
    topViewImage:{
        width:60,
        height:60,
        borderRadius:30,
        left:30,
        top:14
    },
    topViewName:{
        fontFamily: "Roboto-Bold",
        fontSize: 36,
        top:25,
        color:"black",
        left:20,
        width:230
    },
    settingsButton:{
        height:50, 
        backgroundColor:"white",
        borderTopColor:"#ECECEC",
        borderTopWidth:2        
    },
    bottomText:{
        fontFamily: "Khula-Light",
        fontSize: 20,
        alignSelf:"center",
        textAlign:"left",
        flex:5,
        flexDirection:"column",
    },
    bottomIcon:{
        fontSize:25,
        marginRight:9,
        lineHeight:23,
        textAlign:"right",
        alignSelf:"center",
        flex:2,
        flexDirection:"column",
    }
})

// Styles for the scrollView (list of pages)
const sideListStyles = StyleSheet.create({
    headerText:{
        fontFamily: "Khula-SemiBold",
        fontSize: 28,
        flex:5,
        flexDirection:"column",
    },
    headerView:{
        left:8,
        flex:1,
        flexDirection:"row",
        marginTop:22,
    },
    headerIcon:{
        fontSize:30,
        flex:1,
        lineHeight:34,
        flexDirection:"column",
        color:"gray"
    },
    elementText:{
        paddingLeft:23,
        fontFamily: "Khula-Regular",
        fontSize: 21,
        flex:5,
        flexDirection:"column"
    },
    elementSelected:{
        flex:1,
        flexDirection:"row",
        color:"black",
        opacity: 1
    },
    elementView:{
        left:20,
        flex:1,
        flexDirection:"row",
        opacity:0.6
    },
    selectedView:{
        borderLeftWidth: 2,
        borderLeftColor:"#0000ff",
        marginLeft:20,
        marginBottom:10
    },
    normalView:{
        marginBottom:10,
    }
})



const mapStateToProps = (store) => ({
    homeData: store.Global.homeData,
    currentGroup: store.Global.currentGroup,
    groupLastUpdated: store.Global.groupLastUpdated,
    accountInfo: store.Global.accountInfo,
});

const homeScreen = connect(mapStateToProps)(Home);
export default homeScreen;