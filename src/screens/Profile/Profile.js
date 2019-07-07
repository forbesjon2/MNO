import React from 'react';
import {Text, View, StyleSheet, Image, ScrollView, TouchableWithoutFeedback} from 'react-native';
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
    render(){
    const {accountInfo, showNav} = this.props;
    return(
    <View style={{flex: 1, flexDirection: "column"}}>
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
    return(<View style={{flex:1}}></View>);
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
    topViewImage:{
        width: 90,
        height: 90,
        borderRadius: 65,
        marginLeft: 15,
    },
    followerNumbers:{
        fontFamily: "Roboto-Bold",
        fontSize: 22,
        color: "black",
    },
    followerText:{
        fontFamily: "DidactGothic-Regular",
        color: "gray",
        fontSize: 18,
    },
    userName:{
        fontFamily: "Roboto-Medium",
        fontSize: 30,
        color: "black",
        marginLeft: 13,
        marginRight: 13,
    },
    userSubName:{
        fontFamily: "DidactGothic-Regular",
        color: "gray",
        fontSize: 14,
        marginLeft: 13,
        marginRight: 13,
    },
    itemHeading:{
        fontFamily: "Roboto-Medium",
        fontSize: 18,
        color: "black",
        marginLeft: 13,
        marginRight: 13,
        marginTop: 26,
    },
    descriptionText:{
        fontFamily: "DidactGothic-Regular",
        color: "gray",
        fontSize: 16,
        marginLeft:13,
        marginRight:13
    },
    followUnfollowText:{
        fontFamily: "Roboto-Medium",
        fontSize: 17,
        marginTop: 16,
        textAlign:"center"
    },
    groupName:{
        fontFamily: "Roboto-Bold",
        fontSize: 21,
        color: "black",
        paddingLeft: 13,
        marginRight: 13,
        marginTop: 6
    },
    tileView:{
        backgroundColor:"#CCF0F9", 
        marginHorizontal:3, 
        height:100, 
        width: 175,
    }
})
const mapStateToProps = (store) => ({
    accountInfo: store.Global.accountInfo,
    showNav: store.Global.showNav,
});

const profileScreen  = connect(mapStateToProps)(Profile);
export default profileScreen;