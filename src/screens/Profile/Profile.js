import React from 'react';
import {Text, View, StyleSheet, Image, ScrollView, TouchableWithoutFeedback, TouchableOpacity} from 'react-native';
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
 * 
 * Note: the shadow under the server list only works on iOS devices
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

    dotGen(index){
        if(this.state.selectedMenuIndex == index){
            return(<Text style={styles.menuButton}>.</Text>);
        }else{
            return(null);
        }
    }

   

    /*************************************************************************
     * This generates the serverList
     *************************************************************************/
    serverTileGen(serverList){
        var tileList = [];
        if(serverList.length == 0) return(<Text style={[styles.tagTileText, {marginTop:25}]}>This user is not apart of any servers</Text>)
        for(let i = 0; i < serverList.length; i += 2){
            let colorChoiceOne = ["#975EF7", "#5D75F7", "#67ACFA", "#D861E8"][Math.floor(Math.random() * 4)];
            if(serverList[i+1] != null){
                let colorChoiceTwo = ["#975EF7", "#5D75F7", "#67ACFA", "#D861E8"][Math.floor(Math.random() * 4)];
                tileList.push(
                <View style={styles.serverRow}>
                    <View style={[styles.serverTile, {backgroundColor:colorChoiceOne, shadowColor:colorChoiceOne}]}>
                        <Text style={styles.serverTileText}>{serverList[i]}</Text>
                    </View>
                    <View style={[styles.serverTile, {backgroundColor:colorChoiceTwo, shadowColor:colorChoiceTwo}]}>
                        <Text style={styles.serverTileText}>{serverList[i+1]}</Text>
                    </View>
                </View>);
            }else{
                tileList.push(
                <View style={styles.serverRow}>
                    <View style={[styles.serverTile, {backgroundColor:colorChoiceOne, shadowColor:colorChoiceOne}]}>
                        <Text style={styles.serverTileText}>{serverList[i]}</Text>
                    </View>
                </View>);
            }
        }
        return tileList;
    }


    tagTileGen(tagList){
        var tileList = [];
        if(tagList.length == 0) return(<Text style={[styles.tagTileText, {marginTop:25}]}>This user has no tags</Text>)
        for(let i = 0; i < tagList.length; i += 2){
            if(tagList[i+1] != null){   
                tileList.push(
                <View style={styles.tagRow}>
                    <View style={[styles.tagTile]}>
                        <Text style={styles.tagTileText}>{tagList[i]}</Text>
                    </View>
                    <View style={[styles.tagTile]}>
                        <Text style={styles.tagTileText}>{tagList[i+1]}</Text>
                    </View>
                </View>
                );                
            }else{
            tileList.push(
                <View style={styles.tagRow}>
                    <View style={[styles.tagTile]}>
                        <Text style={styles.tagTileText}>{tagList[i]}</Text>
                    </View>
                    <View style={[styles.tagTile]}></View>
                </View>
                );}
        }
        return tileList;
    }


    friendTileGen(friendList){
        var tilelist = [];
        for(let i in friendList){
            tilelist.push(
            <View style={styles.friendRow}>
                <View style={{flex:1, flexDirection:"column", justifyContent:"center"}}>
                <Image source={{uri:friendList[i]["icon"]}} style={styles.friendImage}/>
                </View>
                <View style={{flex:3, flexDirection:"column"}}>
                    <View style={{flex:1, flexDirection:"row"}}>
                        <Text style={styles.friendNameText}>{friendList[i]["name"]}</Text>
                    </View>
                    <View style={{flex:1, flexDirection:"row"}}>
                        <Text style={styles.friendFollowersText}>{friendList[i]["friends"]} friends</Text>
                    </View>
                </View>
                <View style={{flex:1, flexDirection:"column"}}>
                    <View style={styles.viewProfileBorder}>
                        <Text style={styles.viewProfileText}>view</Text>
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
                <Text style={styles.friendButton}>follow</Text>
            </View>
        </TouchableWithoutFeedback>

        {/* Profile image */}
        <View style={{flex:2, flexDirection:"row", alignSelf:"center"}}>
            <Image source={{uri:accountInfo["imageURI"]}} style={styles.topViewImage}/>
        </View>

        {/* Name */}
        <View style={{flex:1, flexDirection:"row", alignSelf:"center", maxHeight:30, marginTop:20}}>
            <Text style={styles.name}>Kennith Kaniff</Text>
        </View>

        {/* short description (subName)*/}
        <View style={{flex:1, flexDirection:"row", alignSelf:"center",  maxHeight:25, marginBottom:20}}>
            <Text style={styles.subName}>Biological Engineering</Text>
        </View>

        {/* servers/tags/friends tags */}
        <View style={{flex:2, flexDirection:"row", alignSelf:"center"}}>
            <TouchableWithoutFeedback onPress={() => this.setState({selectedMenuIndex:1})}>
                <View style={styles.menuView}>
                    <Text style={styles.menuNumber}>4</Text>
                    <Text style={styles.menuText}>servers</Text>
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
            <ScrollView style={{flex:1, flexDirection:"column"}}>
                {this.contentSwitch()}
            </ScrollView>
        </View>
    </View>
    );
}};


const styles = StyleSheet.create({
    viewProfileBorder:{
        borderColor:"#975EF7",
        borderRadius: 5,
        backgroundColor:"#F8FAFB",
        maxHeight:25,
        minHeight:25,
        minWidth:60,
        maxWidth:60,
        borderWidth:1,
        alignItems:"center",
    },
    viewProfileText:{
        color:"#975EF7",
        opacity:0.6,
        fontFamily:"Roboto-Regular", 
        fontSize: 14,
        justifyContent:"center"
    },
    friendNameText:{
        fontFamily:"Roboto-Medium", 
        fontSize: 19,
        color:"black",
        maxHeight:24,
    },
    friendFollowersText:{
        fontFamily:"Roboto-Regular", 
        fontSize: 13,
        paddingTop:3,
        color:"black",
    },
    serverRow:{
        flex:1, 
        flexDirection:"row", 
        maxHeight:76, 
        paddingVertical:8
    },
    tagRow:{
        flex:1, 
        flexDirection:"row",
        maxHeight:20,
        marginTop:30
    },
    friendRow:{
        flex:1, 
        flexDirection:"row",
        maxHeight:50,
        marginTop:20
    },
    serverTileText:{
        fontFamily:"Roboto-Medium", 
        fontSize:19,
        alignSelf:"center", 
        color:"white",
    },
    friendImage:{
        width: 40,
        height: 40,
        borderRadius: 20,
        alignSelf:"center",
        shadowOffset:{width:0, height:10},
        shadowRadius:20,
        shadowOpacity:0.8,
        shadowColor:"#000"
    },
    tagTileText:{
        fontFamily:"Khula-SemiBold", 
        fontSize: 19,
        alignSelf:"center", 
        color:"black",
        opacity:0.7, 
    },
    serverTile:{
        flex:1, 
        flexDirection:"column", 
        marginHorizontal:18, 
        borderRadius:5,
        minWidth:170, 
        maxWidth:170, 
        maxHeight:60, 
        minHeight:60,
        justifyContent:"center",
        shadowOffset:{width:0, height:10},
        shadowRadius:5,
        shadowOpacity:0.25
    }, 
    tagTile:{
        flex:1, 
        flexDirection:"column", 
        justifyContent:"center"
    }, 
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
        borderRadius: 40,
        shadowOffset:{width:0, height:10},
        shadowRadius:20,
        shadowOpacity:0.8,
        shadowColor:"#000"
    },
})
const mapStateToProps = (store) => ({
    accountInfo: store.Global.accountInfo,
    showNav: store.Global.showNav,
});

const profileScreen  = connect(mapStateToProps)(Profile);
export default profileScreen;