import React from 'react';
import {Text, View, StyleSheet, Image, ScrollView, TouchableWithoutFeedback, Platform} from 'react-native';
import {connect} from "react-redux";
import {Ionicons} from '@expo/vector-icons';

/*************************************************************************
 * This class is meant to be generic. It handles the profile view for two
 * different scenarios: when a user is looking at their own profile, or
 * when a user is looking at another user's profile.
 * 
 * The difference between the two is handled by whether or not the navBar
 * is showing. If you are looking at your own profile, the navBar will be
 * showing. If you're looking at another user's profile, than the navBar will
 * be hidden. Other attributes will appear but those are the general properties
 *************************************************************************/
class Profile extends React.Component{
    constructor(props){
        super(props);

        this.state = {
            //1 = groups, 2 = tags, 3 = friends
            selectedMenuIndex: 1
        }
        //set safe area background
        this.props.dispatch({type:"SET_SAFE_AREA_BACKGROUND", payload:"#ffffff"});
    }

    dotGen(index){
        if(this.state.selectedMenuIndex == index){
            return(<Text style={styles.menuButton}>.</Text>);
        }else{
            return(null);
        }
    }
    render(){
    const {accountInfo, showNav} = this.props;
    var shadowStyle = {shadowColor:'#000000',shadowOffset:{width:4, height:4},shadowRadius:10,shadowOpacity:0.8};
    if(Platform.OS == "android") shadowStyle = {elevation:5};
    return(
    <View style={{flex: 1, flexDirection: "column", backgroundColor:"white"}}>
        
        {/* Follow */}
        <TouchableWithoutFeedback>
            <View style={{flex:1, flexDirection:"row", backgroundColor:"blue", maxWidth:80, alignSelf:"flex-end"}}>
                <Ionicons name="ios-add-circle-outline" style={{fontSize:16}}/>
                <Text style={styles.friendButton}>follow</Text>
            </View>
        </TouchableWithoutFeedback>

        {/* Profile image */}
        <View style={{flex:2, flexDirection:"row", alignSelf:"center"}}>
            <Image source={{uri:accountInfo["imageURI"]}} style={styles.topViewImage}/>
        </View>

        {/* Name */}
        <View style={{flex:1, flexDirection:"row", alignSelf:"center", maxHeight:30, marginTop:20}}>
            <Text style={styles.name}>Kenneth Kaniff</Text>
        </View>

        {/* short description (subName)*/}
        <View style={{flex:1, flexDirection:"row", alignSelf:"center",  maxHeight:25, marginBottom:20}}>
            <Text style={styles.subName}>Biological Engineering</Text>
        </View>

        {/* groups/tags/friends tags */}
        <View style={{flex:2, flexDirection:"row", alignSelf:"center"}}>
            <TouchableWithoutFeedback onPress={() => this.setState({selectedMenuIndex:1})}>
                <View style={styles.menuView}>
                    <Text style={styles.menuNumber}>4</Text>
                    <Text style={styles.menuText}>groups</Text>
                    {this.dotGen(1)}
                </View>
            </TouchableWithoutFeedback>
            
            <TouchableWithoutFeedback onPress={() => this.setState({selectedMenuIndex:2})}>
                <View style={styles.menuView}>
                    <Text style={styles.menuNumber}>192</Text>
                    <Text style={styles.menuText}>tags</Text>
                    {this.dotGen(2)}
                </View>
            </TouchableWithoutFeedback>

            <TouchableWithoutFeedback onPress={() => this.setState({selectedMenuIndex:3})}>
                <View style={styles.menuView}>
                    <Text style={styles.menuNumber}>14</Text>
                    <Text style={styles.menuText}>friends</Text>
                    {this.dotGen(3)}
                </View>
            </TouchableWithoutFeedback>
        </View>

        {/* Content pane */}
        <View style={{flex:11, flexDirection:"row", backgroundColor:"#F8FAFB"}}>
            <View style={{flex:1, flexDirection:"column", alignContent:"space-between"}}>
                <View style={{flex:1, flexDirection:"row", maxHeight:100, paddingVertical:20, backgroundColor:"gray", }}>
                <View style={{flex:1, flexDirection:"column", backgroundColor:"blue", marginHorizontal:10, borderRadius:5, maxWidth:160, maxHeight:60, justifyContent:"center",}}>
                    <Text>UNL@home</Text>
                </View>
                <View style={{flex:1, flexDirection:"column", backgroundColor:"orange", borderRadius:5,  marginHorizontal:10, maxWidth:160, maxHeight:60, justifyContent:"center"}}>
                    <Text>UNL@home</Text>
                </View>
                </View>
            </View>
        </View>
    </View>
    );
    return(
    <View style={{flex: 1, flexDirection: "column", backgroundColor:"white"}}>
        {generateHeader(showNav)}
        <View style={{flex:2, flexDirection:"row"}}>
            <View style={{flex:3}}>
                <Image source={{uri:accountInfo["imageURI"]}} style={styles.topViewImage}/>
                </View>
            <View style={{flex:2}}>
                <Text style={styles.followerNumbers}>126</Text>
                <Text style={styles.followerText}>Followers</Text>
            </View>
            <View style={{flex:2}}>
                <Text style={styles.followerNumbers}>14</Text>
                <Text style={styles.followerText}>Following</Text>
            </View>
            <View style={{flex:2}}>
            <TouchableWithoutFeedback>
                {generateFollowerTile(false, false)}
            </TouchableWithoutFeedback>
            </View>
        </View>
        <View style={{flex:11, backgroundColor:"white"}}>
            <Text style={styles.userName}>Marshall Keagan</Text>
            <Text style={styles.userSubName}>Biological Systems Engineering</Text>
            <Text style={styles.itemHeading}>Description</Text>
            <Text style={styles.descriptionText}>{accountInfo["description"]}</Text>
            <Text style={styles.itemHeading}>Groups</Text>
            <View style={{height:110, marginTop:6}}>
            <ScrollView horizontal={true} showsHorizontalScrollIndicator={false}>
            {generateGroupTiles(accountInfo)}
            </ScrollView>
            </View>
            <Text style={styles.itemHeading}>Schedule</Text>
        </View>
    </View>
    );}
};





/*************************************************************************
 * This generates the header for the profile page. It appears on top of the 
 * 
 * @param {*} navExpanded If the profile is you (happens when the navBar 
 * is showing), than set the header to say profile instead
 *************************************************************************/
function generateHeader(showNav){ 
    if(!showNav) return(<View style={{flex:1}}><Text>Ken</Text></View>);
    return(<View style={{flex:1}}><Text>eos</Text></View>);
    
}

/*************************************************************************
 * This generates the follower tile for a given user. It takes two parameters
 * described below
 * 
 * @param {*} showNav if the nav is shown than you're on the profile page.
 * If the nav is hidden than the 
 * 
 * @param {*} following boolean representing whether or not you are following
 * that given user
 *************************************************************************/
function generateFollowerTile(showNav, following){
    if(showNav) return(<Ionicons name="ios-cog" style={{fontSize:32, opacity:0.7, textAlign:"center", alignSelf: "center", marginTop: 14}} color={"#00B4E0"}/>);
    if(following) return(<Text style={[styles.followUnfollowText, {color:"#EC187C"}]}>- unfollow</Text>);
    return(<Text style={[styles.followUnfollowText, {color:"#00B4E0"}]}>+ follow</Text>)
}

/*************************************************************************
 * This lists the blue-ish tiles that list what groups you are apart of
 * 
 * @param {*} groupsArray the list of groups taken from either the global 
 * variable "accountInfo" (if the user is yourself) or from the prop
 * that is passed in if the user is someone other than yourself
 *************************************************************************/
function generateGroupTiles(groupsArray){
    let returnObj = [];
    for(let i in groupsArray["groups"]){
        let viewName = groupsArray["groups"][i]["name"];
        for(let j in groupsArray["groups"][i]["rooms"]){
            let additionalStyles = {};
            let numGroups = -1 + groupsArray["groups"].length;
            let numRooms = -1 + groupsArray["groups"][numGroups]["rooms"].length;
            additionalStyles = [i == 0 & j == 0 ? {borderTopLeftRadius:6, borderBottomLeftRadius: 6, marginLeft:12} : [i == numGroups && j == numRooms ? {borderTopRightRadius:6, borderBottomRightRadius: 6, marginRight: 12} : {}]];
            let groupName = groupsArray["groups"][i]["rooms"][j]["name"];
            let followers = groupsArray["groups"][i]["rooms"][j]["followers"];
            returnObj.push(
            <View key={"group" + i + "room" + j} style={[styles.tileView, additionalStyles[0]]}>
                <Text style={[styles.groupName, {borderLeftWidth:3, borderLeftColor:"black"}]}>{viewName}{groupName}</Text>
                <Text style={styles.groupName}>{followers}</Text>
                <Text style={[styles.followerText, {marginLeft:13}]}>Followers</Text>
            </View>);
        }
    }
    return returnObj;
}

const styles = StyleSheet.create({
    name:{
        fontFamily:"Khula-SemiBold",
        fontSize:24,
        opacity:1,
        justifyContent:"flex-end"
    },
    subName:{
        alignSelf:"center", 
        fontFamily:"Roboto-Regular", 
        fontSize:14,
        opacity:0.6,
        
    },
    menuView:{
        flex:1, 
        flexDirection:"column", 
        alignSelf:"center"
    },
    menuButton:{
        alignSelf:"center", 
        fontFamily:"Roboto-Medium", 
        fontSize:36, 
        lineHeight:26, 
        color:"#5D75F7",
    },
    menuText:{
        alignSelf:"center", 
        fontFamily:"Roboto-Regular", 
        fontSize:14,
        opacity:0.6
    },
    menuNumber:{
        opacity:0.7,
        alignSelf:"center", 
        fontFamily:"Khula-Bold", 
        fontSize:24, 
        maxHeight:30
    },
    friendButton:{
        opacity:0.7,
        fontFamily:"Khula-Regular",
        color:"black",
        fontSize:16
    },
    topViewImage:{
        width: 80,
        height: 80,
        borderRadius: 65,
    },
})
const mapStateToProps = (store) => ({
    accountInfo: store.Global.accountInfo,
    showNav: store.Global.showNav,
});

const profileScreen  = connect(mapStateToProps)(Profile);
export default profileScreen;