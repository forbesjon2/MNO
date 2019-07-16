import React from 'react';
import {Text, View, Image, ScrollView, TouchableWithoutFeedback, TouchableOpacity} from 'react-native';
import {connect} from "react-redux";
import {Ionicons} from '@expo/vector-icons';
import {styles} from "../../Styles";

/*************************************************************************
 * This class is meant to be generic. It handles the profile view for two
 * different scenarios: when a user is looking at their own profile, or
 * when a user is looking at another user's profile.
 * 
 * The difference between the two is handled by whether or not the navBar
 * is showing. If you are looking at your own profile, the navBar will be
 * showing. If you're looking at another user's profile, than the navBar will
 * be hidden. Other attributes will appear but those are the general properties
 * 
 * Note: the shadow under the server list only works on iOS devices
 * 
 * TODO: implement this
 *************************************************************************/
class Profile extends React.Component{
    constructor(props){
        super(props);

        this.state = {
            //1 = servers, 2 = tags, 3 = friends
            selectedMenuIndex: 1
        }
        //set safe area background
        this.props.dispatch({type:"SET_SAFE_AREA_BACKGROUND", payload:"#ffffff"});
    }

    /*************************************************************************
     * The dot here appears under the currently selected menu
     *************************************************************************/
    dotGen(index){
        if(this.state.selectedMenuIndex == index) return(<Text style={styles.profile_menuButton}>.</Text>);
        return(null);
    }

   

    /*************************************************************************
     * This generates the list of servers that the user is a member of.
     * it appears under 'servers'. It requires an array of server names.
     * The color is one of 4 possibilities generated randomly
     * 
     * The shadow effect appears on iOS but not on android
     * 
     * TODO I will eventually link this to the server info screen
     *************************************************************************/
    serverTileGen(serverList){
        var tileList = [];
        if(serverList.length == 0) return(<Text style={[styles.profile_tagTileText, {marginTop:25}]}>This user is not apart of any servers</Text>)
        for(let i = 0; i < serverList.length; i += 2){
            let colorChoiceOne = ["#975EF7", "#5D75F7", "#67ACFA", "#D861E8"][Math.floor(Math.random() * 4)];
            if(serverList[i+1] != null){
                let colorChoiceTwo = ["#975EF7", "#5D75F7", "#67ACFA", "#D861E8"][Math.floor(Math.random() * 4)];
                tileList.push(
                <View style={styles.profile_serverRow}>
                    <View style={[styles.profile_serverTile, {backgroundColor:colorChoiceOne, shadowColor:colorChoiceOne}]}>
                        <Text style={styles.profile_serverTileText}>{serverList[i]}</Text>
                    </View>
                    <View style={[styles.profile_serverTile, {backgroundColor:colorChoiceTwo, shadowColor:colorChoiceTwo}]}>
                        <Text style={styles.profile_serverTileText}>{serverList[i+1]}</Text>
                    </View>
                </View>);
            }else{
                tileList.push(
                <View style={styles.profile_serverRow}>
                    <View style={[styles.profile_serverTile, {backgroundColor:colorChoiceOne, shadowColor:colorChoiceOne}]}>
                        <Text style={styles.profile_serverTileText}>{serverList[i]}</Text>
                    </View>
                </View>);
            }
        }
        return tileList;
    }

    /*************************************************************************
     * This generates the list of tags that the user assigns to themselves.
     * it appears under 'tags' and is a very simple list (2 columns wide)
     * of tags. This requires an array of tags
     * 
     * These tags can be added in the individual users settings
     * 
     * TODO I will eventually link this to the tag info screen
     *************************************************************************/
    tagTileGen(tagList){
        var tileList = [];
        if(tagList.length == 0) return(<Text style={[styles.profile_tagTileText, {marginTop:25}]}>This user has no tags</Text>)
        for(let i = 0; i < tagList.length; i += 2){
            if(tagList[i+1] != null){   
                tileList.push(
                <View style={styles.profile_tagRow}>
                    <View style={[styles.profile_tagTile]}>
                        <Text style={styles.profile_tagTileText}>{tagList[i]}</Text>
                    </View>
                    <View style={[styles.profile_tagTile]}>
                        <Text style={styles.profile_tagTileText}>{tagList[i+1]}</Text>
                    </View>
                </View>
                );                
            }else{
            tileList.push(
                <View style={styles.profile_tagRow}>
                    <View style={[styles.profile_tagTile]}>
                        <Text style={styles.profile_tagTileText}>{tagList[i]}</Text>
                    </View>
                    <View style={[styles.profile_tagTile]}></View>
                </View>
                );}
        }
        return tileList;
    }

    /*************************************************************************
     * This generates the list of users that the current user is friends with.
     * it appears under 'friends'. It requires an array of friends with the
     * following format
     * array -> {"name":"<some name>", "friends":<some number>, "icon":"<image url>"}
     * 
     * 
     * TODO I will eventually link this to the user profile screen
     *************************************************************************/
    friendTileGen(friendList){
        var tilelist = [];
        for(let i in friendList){
            tilelist.push(
            <View style={styles.profile_friendRow}>
                <View style={{flex:1, flexDirection:"column", justifyContent:"center"}}>
                <Image source={{uri:friendList[i]["icon"]}} style={styles.profile_friendImage}/>
                </View>
                <View style={{flex:3, flexDirection:"column"}}>
                    <View style={{flex:1, flexDirection:"row"}}>
                        <Text style={styles.profile_friendNameText}>{friendList[i]["name"]}</Text>
                    </View>
                    <View style={{flex:1, flexDirection:"row"}}>
                        <Text style={styles.profile_friendFollowersText}>{friendList[i]["friends"]} friends</Text>
                    </View>
                </View>
                <View style={{flex:1, flexDirection:"column"}}>
                    <View style={styles.profile_viewProfileBorder}>
                        <Text style={styles.profile_viewProfileText}>view</Text>
                    </View>
                </View>
            </View>
            );
        }
        return(tilelist);
    }



    contentSwitch(){
        switch(this.state.selectedMenuIndex){
            case 1:
            return(this.serverTileGen([
                "UNL@home", 
                "UNL@archery", 
                "UNL@home", 
                "UNL@archery", 
                "UNL@home", 
                "UNL@archery", 
                "UNL@home", 
                "UNL@archery", 
                "UNL@home", 
                "UNL@archery", 
                "UNL@home", 
                "UNL@archery", 
                "UNL@home", 
                "UNL@archery", 
                "UNL@os2g"]));
            case 2:
            return(this.tagTileGen(["#CSCE361", "#CS156", "#HR103"]));
            default:
            return(this.friendTileGen([
                {"name":"Henry Jackson", "friends":12, "icon":"https://www.bing.com/th?id=OIP.GRqL5ePJnJ8i-ohHBhQ5jQHaFH&pid=Api&rs=1&p=0"}, 
                {"name":"Henry Jackson", "friends":12, "icon":"https://www.bing.com/th?id=OIP.GRqL5ePJnJ8i-ohHBhQ5jQHaFH&pid=Api&rs=1&p=0"}, 
                {"name":"Henry Jackson", "friends":12, "icon":"https://www.bing.com/th?id=OIP.GRqL5ePJnJ8i-ohHBhQ5jQHaFH&pid=Api&rs=1&p=0"}, 
                {"name":"Tomo Suzuki", "friends":23, "icon":"https://www.bing.com/th?id=OIP.GRqL5ePJnJ8i-ohHBhQ5jQHaFH&pid=Api&rs=1&p=0"}]));   
        }
    }

    render(){
    const {accountInfo, showNav} = this.props;
    return(
    <View style={{flex: 1, flexDirection: "column", backgroundColor:"white"}}>
        
        {/* Follow */}
        <TouchableWithoutFeedback>
            <View style={{flex:1, flexDirection:"row", backgroundColor:"blue", maxWidth:80, alignSelf:"flex-end"}}>
                <Ionicons name="ios-add-circle-outline" style={{fontSize:16}}/>
                <Text style={styles.profile_friendButton}>follow</Text>
            </View>
        </TouchableWithoutFeedback>

        {/* Profile image */}
        <View style={{flex:2, flexDirection:"row", alignSelf:"center"}}>
            <Image source={{uri:accountInfo["imageURI"]}} style={styles.profile_topViewImage}/>
        </View>

        {/* Name */}
        <View style={{flex:1, flexDirection:"row", alignSelf:"center", maxHeight:30, marginTop:20}}>
            <Text style={styles.profile_name}>Kennith Kaniff</Text>
        </View>

        {/* short description (subName)*/}
        <View style={{flex:1, flexDirection:"row", alignSelf:"center",  maxHeight:25, marginBottom:20}}>
            <Text style={styles.profile_subName}>Biological Engineering</Text>
        </View>

        {/* servers/tags/friends tags */}
        <View style={{flex:2, flexDirection:"row", alignSelf:"center"}}>
            <TouchableWithoutFeedback onPress={() => this.setState({selectedMenuIndex:1})}>
                <View style={styles.profile_menuView}>
                    <Text style={styles.profile_menuNumber}>4</Text>
                    <Text style={styles.profile_menuText}>servers</Text>
                    {this.dotGen(1)}
                </View>
            </TouchableWithoutFeedback>
            
            <TouchableWithoutFeedback onPress={() => this.setState({selectedMenuIndex:2})}>
                <View style={styles.profile_menuView}>
                    <Text style={styles.profile_menuNumber}>192</Text>
                    <Text style={styles.profile_menuText}>tags</Text>
                    {this.dotGen(2)}
                </View>
            </TouchableWithoutFeedback>

            <TouchableWithoutFeedback onPress={() => this.setState({selectedMenuIndex:3})}>
                <View style={styles.profile_menuView}>
                    <Text style={styles.profile_menuNumber}>14</Text>
                    <Text style={styles.profile_menuText}>friends</Text>
                    {this.dotGen(3)}
                </View>
            </TouchableWithoutFeedback>
        </View>

        {/* Content pane */}
        <View style={{flex:11, flexDirection:"row", backgroundColor:"#F8FAFB"}}>
            <ScrollView style={{flex:1, flexDirection:"column"}}>
                {this.contentSwitch()}
            </ScrollView>
        </View>
    </View>
    );
}};

const mapStateToProps = (store) => ({
    accountInfo: store.Global.accountInfo,
    showNav: store.Global.showNav,
});

const profileScreen  = connect(mapStateToProps)(Profile);
export default profileScreen;