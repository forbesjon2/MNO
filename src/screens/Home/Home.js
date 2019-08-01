import React from 'react';
import {Text, View, Animated, Image, TouchableWithoutFeedback, ScrollView, FlatList, Dimensions, PanResponder} from 'react-native';
import { connect } from "react-redux";
import {Ionicons} from '@expo/vector-icons';
import HomeComponent from './HomeComponent';
import NavigationService from "../../navigation/NavigationService";
import {styles} from "../../Styles";
import BareComponents from "../../components/other/BareComponents";


class Home extends React.Component{
    constructor(props){
        super(props);

        /*************************************************************************
         * panResponder handles
         * Allows for tracking & control of the swiping animation
         *************************************************************************/
        const panResponder = PanResponder.create({
            /*************************************************************************
             * on____ShouldSetPanResponder: These functions determine at what point
             *         should the panResponder track the swiping gesture. If the
             *         number is too low, than very slight movements will trigger
             *      
             *************************************************************************/
            onStartShouldSetPanResponder: (evt, gesture) => {
                if((Math.abs(gesture.dx) < 25)) return false;
                else return true;            },
            onMoveShouldSetPanResponder: (evt, gesture) => {
                if((Math.abs(gesture.dx) < 25)) return false;
                else return true;
            },
            /*************************************************************************
             * This is run when either of those two functions above return true and
             * lasts until the swipe is released. 
             * 
             * gesture.dx can be multiplied by anything to make the swipe faster.
             * 
             * once the gesture is released, the function onPanResponderRelease is run
             *************************************************************************/
            onPanResponderMove: (evt, gesture) => {
                let distance = (Number(gesture.dx) * 1.5) + Number(this.state.xReference);
                this.moveSidebar(distance);
            },
            /*************************************************************************
             * onPanResponderRelease is run when the gesture is released.
             * 
             * swipeConst: defines the appropriate distance for a navigation drawer
             *      state change. That determines whether or not to open/close the
             *      left or right nav.
             * 
             * if the gestures distance is less than what is defined in swipeConst
             * than it reverts back to it's original state
             *************************************************************************/
            onPanResponderRelease: (evt, gesture) => {
                const {leftNavExpanded, rightNavExpanded} = this.state;
                const swipeConst = 40;
                
                //right swipe swipeConst
                if(Number(gesture.dx) * 1.5 >= swipeConst){
                    //if left & right nav is closed, than open left nav
                    if(!leftNavExpanded && !rightNavExpanded){
                        this.animateSidebar(250, 200, true);
                    //if right nav is open, close right nav
                    }else if(rightNavExpanded){
                        this.animateSidebar(0, 200, false);
                        this.setState({xReference: 0});    
                    }


                //left swipe swipeConst
                }else if(Number(gesture.dx) * 1.5 <= -swipeConst){
                    //if left nav is open, than close left nav
                    if(leftNavExpanded){
                        this.animateSidebar(0, 200, true);
                    //if left and right nav's are closed, than open right nav
                    }else if(!leftNavExpanded && !rightNavExpanded){
                        this.animateSidebar(-350, 200, false);
                    }


                //if the swipe's distance is negligable
                }else{
                    //if left nav was open, keep it open
                    if(leftNavExpanded){
                        this.animateSidebar(250, 200, true);
                    //if right nav was open, keep it open
                    }else if(rightNavExpanded){
                        this.animateSidebar(-350, 200, false);
                    }else{
                        this.animateSidebar(0, 200, true);
                    }
                }   
            }
        });

        this.state = {
            //bare component
            components: new BareComponents(),
            //animation state variables
            leftNavExpanded: false,
            rightNavExpanded: false,
            xReference: 0,
            animatedContent: new Animated.Value(0),
            leftContent: new Animated.Value(-250),
            rightContent: new Animated.Value(Dimensions.get("window").width),
            panResponder
        }
        //set safe area background
        this.props.dispatch({type:"SET_SAFE_AREA_BACKGROUND", payload:"#ffffff"});
        this.animateSidebar = this.animateSidebar.bind(this);
    }

    //Handles the animation for the sidebar aka leftNav (specific to the homescreen)
    animateSidebar(distance, speed, isLeftSidebar){
        const {leftNavExpanded, animatedContent, rightNavExpanded, leftContent, rightContent} = this.state;
        var toValue = 0;
        if(!isLeftSidebar){
            toValue = [rightNavExpanded ? 0 : distance][0];
            this.setState({rightNavExpanded: !rightNavExpanded, leftNavExpanded:false, xReference: toValue});
        }else{
            toValue = [leftNavExpanded ? 0 : distance][0];
            this.setState({leftNavExpanded: !leftNavExpanded, rightNavExpanded:false, xReference: toValue});   
        }
        Animated.timing(animatedContent,{toValue: toValue, duration: speed}).start();
        Animated.timing(leftContent,{toValue: -250 + toValue, duration: speed}).start();
        Animated.timing(rightContent,{toValue: Dimensions.get("window").width + toValue, duration: speed}).start();
    }

    /*********************************************************************
     * Animates in an instance. Used when the user is swiping left and 
     * right
     * 
     * The first conditional statement checks to see if the user scrolled 
     * past the allowed distance limit for the left and right sidebars.
     * In that case, it won't do anything.
     * 
     * swipeSpeed constant determines how fast the screen will move for each
     * unit of movement (pixels?) that you have it move
     * 
     * @param value the value that you want to animate the screen to
     **********************************************************************/
    moveSidebar(value){
        const {animatedContent, leftContent, rightContent} = this.state;
        if(value >= 250 || value <= -350) return;
        Animated.timing(animatedContent,{toValue: value, duration:0}).start();
        Animated.timing(leftContent,{toValue: -250 + value, duration: 0}).start();
        Animated.timing(rightContent,{toValue: Dimensions.get("window").width + value, duration: 0}).start();
    }


    render(){
    const {homeData, currentGroup}= this.props;
    const currentGroupContent = getHomeData(homeData, currentGroup);
    let handles = this.state.panResponder.panHandlers;
    var height = Dimensions.get("window").height - 60;  //60 is the height of the nav
    return(
    <View style={{flex:1,backgroundColor:"white", top:0, bottom:0}} {...handles}>

        <Animated.View style={{backgroundColor:"white", left:this.state.animatedContent, width:Dimensions.get("window").width, height: height}}>
            {/* The header with the (not yet functional) search and side menu feature */}
            <View style={[styles.home_header, {width: Dimensions.get("window").width}]}>
                <TouchableWithoutFeedback onPress={() => this.animateSidebar(250, 400, true)}>
                    <Ionicons name="ios-menu" style={[styles.home_headerIcon, {textAlign:"right", marginRight:8}]} color={"black"}/>
                </TouchableWithoutFeedback>
                <Text style={styles.home_headerText} numberOfLines={1}>{currentGroupContent["title"]}</Text>
                <TouchableWithoutFeedback onPress={() => this.animateSidebar(-350, 400, false)}>
                    <Ionicons name="ios-information-circle-outline" style={[styles.home_headerIcon, {textAlign:"left", marginLeft:8}]} color={"black"}/>
                </TouchableWithoutFeedback>
            </View>

            {/* The main view with all of the content */}
            <View style={[styles.home_mainView]} elevation={3}>
                <View style={{flex:1}}>
                <HomeComponent />
                </View>
            </View>
        </Animated.View>


        {/* LEFT SIDEBAR */}
        <Animated.View style={{width:250, left:this.state.leftContent, height:height, top:0, bottom:0, position:"absolute", backgroundColor:"#F8F8FA"}} elevation={0}>
        {/* This view shows general information about your account */}
        {getAccountDetails(this.props.dispatch, this.props.accountInfo, this.state.components)}
        

        {/* This is a list that shows all of your subscribed to channels */}
        <ScrollView style={{flex:1}}>
        {getButtonList(homeData["data"], currentGroup, this.props.dispatch)}
        </ScrollView>
        </Animated.View>
        
        {/* RIGHT SIDEBAR */}
        <Animated.View style={{left:this.state.rightContent, width:350, top:0, bottom:0, position:"absolute", backgroundColor:"black"}} elevation={0}>
            {getServerDetails(this.state.components)}
        </Animated.View>

    </View>
    );
    }
};

function getServerDetails(components){
    let data = {"alias":"jack", "icon":"https://www.bing.com/th?id=OIP.GRqL5ePJnJ8i-ohHBhQ5jQHaFH&pid=Api&rs=1&p=0", "uuid":"ass"};
    let dataFL = [
        {"alias":"jack", "icon":"https://www.bing.com/th?id=OIP.GRqL5ePJnJ8i-ohHBhQ5jQHaFH&pid=Api&rs=1&p=0", "uuid":"ass"},
        {"alias":"jack", "icon":"https://www.bing.com/th?id=OIP.GRqL5ePJnJ8i-ohHBhQ5jQHaFH&pid=Api&rs=1&p=0", "uuid":"ass"},
        {"alias":"jack", "icon":"https://www.bing.com/th?id=OIP.GRqL5ePJnJ8i-ohHBhQ5jQHaFH&pid=Api&rs=1&p=0", "uuid":"ass"},
        {"alias":"jack", "icon":"https://www.bing.com/th?id=OIP.GRqL5ePJnJ8i-ohHBhQ5jQHaFH&pid=Api&rs=1&p=0", "uuid":"ass"},
        {"alias":"jack", "icon":"https://www.bing.com/th?id=OIP.GRqL5ePJnJ8i-ohHBhQ5jQHaFH&pid=Api&rs=1&p=0", "uuid":"ass"},
        {"alias":"jack", "icon":"https://www.bing.com/th?id=OIP.GRqL5ePJnJ8i-ohHBhQ5jQHaFH&pid=Api&rs=1&p=0", "uuid":"ass"}];
    return(
    <ScrollView style={{marginTop:20, flexDirection:"column", flex:1, marginLeft:15}}>
        
        <View style={styles.home_rightHeader}>
            <Text style={styles.home_rightHeaderBold}>Sketch</Text>
            <Text style={styles.home_rightHeaderLight}> / Description</Text>
        </View>
        
        <Text style={styles.home_rightHeaderDescription}>Keep reaching for the heavens, and when you get there, be careful, as there is no oxygen in the heavens and the upper regions of the stratosphere and you will die, I promise you, you will die. Ommm. You cannot go to heaven as a human, you can only go to heaven as a damn angel! You hear me?</Text>
        
        <View style={styles.home_rightHeader}>
            <Text style={styles.home_rightHeaderBold}>Founder</Text>
            <Text style={styles.home_rightHeaderLight}> / Architect</Text>
        </View>
        {components.profileViewLight(data)}
        <View style={styles.home_rightHeader}>
            <Text style={styles.home_rightHeaderBold}>Arbiters</Text>
            <Text style={styles.home_rightHeaderLight}> / Moderators</Text>
        </View>

        {components.profileViewLight(data)}
        <View style={styles.home_rightHeader}>
            <Text style={styles.home_rightHeaderBold}>Members</Text>
            <Text style={styles.home_rightHeaderLight}> / Patrons</Text>
        </View>
        <FlatList
            data={dataFL}
            
            keyExtractor={(item, index) => index.toString()}

            renderItem={(item) => components.profileViewLight(item["item"])}/>
    </ScrollView>
    )
}

function getAccountDetails(dispatch, accountInfo, components){
    return(
        <TouchableWithoutFeedback onPress={() => {
            NavigationService.navigate("Profile");
            dispatch({type: "SET_PAGE", id:5});}}>
        <View style={{minHeight:180, borderBottomColor:"black"}}>
            {components.randomLanguage()}
            <Image source={{uri:accountInfo["image_uri"]}} style={styles.home_topViewImage}/>
            <Text style={styles.home_topViewName}>Hello,</Text>
            <Text numberOfLines={1} style={[styles.home_topViewName, {marginBottom:20}]}>{accountInfo["name"].split(" ")[0]}</Text>
        </View>
        </TouchableWithoutFeedback>
    );
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
        returnObj.push(<View key={"header" + i.toString()} style={[styles.home_sideHeaderView]}><Ionicons name="ios-globe" style={[styles.home_sideHeaderIcon, iconOpacity[0]]} color={"black"}/><Text style={[styles.home_sideHeaderText, iconOpacity[0]]}>{homeData[i]["name"]}</Text></View>);
        //Generates header contents (each server)
        for(var j in homeData[i]["servers"]){
            let group = homeData[i]["servers"][j]["name"];
            var elementStyle, viewStyle;
            [group == current_group_server && isInGroup ? elementStyle = styles.home_sideElementSelected : elementStyle = styles.home_sideElementView];
            [group == current_group_server && isInGroup ? viewStyle = styles.home_sideSelectedView : viewStyle = styles.home_sideNormalView];
            returnObj.push(<TouchableWithoutFeedback key={"item" + i.toString() + "element" + j} onPress={() => {dispatch({type:"SET_CURRENT_GROUP", payload: "" + view + group})}}><View style={viewStyle}><Text style={[styles.home_sideElementText, elementStyle]}>{homeData[i]["servers"][j]["name"]}</Text></View></TouchableWithoutFeedback>);
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



const mapStateToProps = (store) => ({
    homeData: store.Global.homeData,
    currentGroup: store.Global.currentGroup,
    groupLastUpdated: store.Global.groupLastUpdated,
    accountInfo: store.Global.accountInfo,
});

const homeScreen = connect(mapStateToProps)(Home);
export default homeScreen;