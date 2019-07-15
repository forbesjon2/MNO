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
 * 
 * It also uses react-native-shadow to 
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

    groupTileGen(groupList){
        let tileList = [];
        if(groupList.length == 0) return(<Text>No group</Text>)
        for(let i = 0; i < groupList.length; ++i){
            if(i%2 == 0){

            }
        }
        switch(Math.floor(Math.random() * 3) + 1){  
            case 1:
                // 5D75F7
                break;
            case 2:
                // 67ACFA
                break;
            case 3:
                // 975EF7
                break;
            default:
                // D861E8
                
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
            <View style={{flex:1, flexDirection:"column"}}>
                <View style={{flex:1, flexDirection:"row", maxHeight:76, paddingVertical:8}}>
                    <View style={[styles.groupTile, {backgroundColor:"#5D75F7", shadowColor:"#5D75F7"}]}>
                        <Text style={styles.groupTileText}>UNL@home</Text>
                    </View>
                    <View style={[styles.groupTile, {backgroundColor:"#67ACFA", shadowColor:"#67ACFA"}]}>
                        <Text style={styles.groupTileText}>UNL@home</Text>
                    </View>
                </View>
                <View style={{flex:1, flexDirection:"row", maxHeight:76, paddingVertical:8}}>
                    <View style={[styles.groupTile, {backgroundColor:"#975EF7", shadowColor:"#975EF7"}]}>
                        <Text style={styles.groupTileText}>UNL@home</Text>
                    </View>
                    <View style={[styles.groupTile, {backgroundColor:"#D861E8", shadowColor:"#D861E8"}]}>
                        <Text style={styles.groupTileText}>UNL@home</Text>
                    </View>
                </View>
            </View>
        </View>
    </View>
    );
}};


const styles = StyleSheet.create({
    groupTileText:{
        fontFamily:"Roboto-Medium", 
        fontSize:19,
        alignSelf:"center", 
        color:"white", elevation:4
    },
    groupTile:{
        flex:1, 
        flexDirection:"column", 
        marginHorizontal:18, 
        borderRadius:5,
        minWidth:170, 
        maxWidth:170, 
        maxHeight:60, 
        justifyContent:"center",
        shadowOffset:{width:0, height:10},
        shadowRadius:5,
        shadowOpacity:0.25
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