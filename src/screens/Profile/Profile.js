import React from 'react';
import {Text, View, Image, TouchableWithoutFeedback, FlatList} from 'react-native';
import {connect} from "react-redux";
import {Ionicons} from '@expo/vector-icons';
import {styles} from "../../Styles";
import BareComponents from '../../components/other/BareComponents';

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
            selectedMenuIndex: 1,
            components: new BareComponents(),
            friendData:[],
            tagData:[],
            serverList:[],
            //if you are the profile owner
            isSelf: true,
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
    * associates a key for every item in the flatlist. We use keyExtractor to 
    * preserve the naming of 'uuid' from the API
    *************************************************************************/
   _keyExtractor = (item, index) => index.toString();


    /*************************************************************************
    * This returns the basic server tile. It is it's own function because 
    * of the color variable
    *************************************************************************/
    serverTile(text){
        let color = ["#975EF7", "#5D75F7", "#67ACFA", "#D861E8"][Math.floor(Math.random() * 4)];
        return(
        <View style={[styles.profile_serverTile, {backgroundColor:color, shadowColor:color}]}>
            <Text style={styles.profile_serverTileText}>{text}</Text>
        </View>);
    }

    /*************************************************************************
    * associates a key for every item in the flatlist. We use keyExtractor to 
    * preserve the naming of 'uuid' from the API
    *************************************************************************/
    componentWillMount(){
        if(this.state.isSelf){
            var serverList = [];
            this.props.accountInfo["groups"].map((item) => item.servers.map(
                (item2) => serverList.push(item["name"] + item2["name"])));
            this.setState({friendData: this.props.accountInfo["friends"], 
                        tagData: this.props.accountInfo["tags"], serverList: serverList});
        }
    }


    /*************************************************************************
    * associates a key for every item in the flatlist. We use keyExtractor to 
    * preserve the naming of 'uuid' from the API
    *************************************************************************/
    contentSwitch(){
        switch(this.state.selectedMenuIndex){
            case 1:
            return(
                <FlatList
                horizontal={false}
                key={1}
                data={this.state.serverList}
                keyExtractor={this._keyExtractor}
                style={{flex:1, flexDirection:"column"}}
                numColumns={2}
                renderItem={({item})=> this.serverTile(item)}/>);
            case 2:
            return(
            <FlatList
                horizontal={false}
                key={1}
                data={this.state.tagData}
                keyExtractor={this._keyExtractor}
                style={{flex:1, flexDirection:"column"}}
                numColumns={2}
                renderItem={({item})=>
                <View style={styles.profile_tagTile}>
                    <Text style={styles.profile_tagTileText}>{item}</Text>
                </View> }/>
            );
            default:
            return(<FlatList
                horizontal={false}
                key={2}
                data={this.state.friendData}
                style={{flex:1, flexDirection:"column"}}
                keyExtractor={this._keyExtractor}
                renderItem={({item})=> this.state.components.profileView(item)}
                />);
        }
    }

    render(){
    const {accountInfo} = this.props;
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
            <Image source={{uri:accountInfo["image_uri"]}} style={styles.profile_topViewImage}/>
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
            {this.contentSwitch()}
        </View>
    </View>
    );
}};

const mapStateToProps = (store) => ({
    accountInfo: store.Global.accountInfo,
});

const profileScreen  = connect(mapStateToProps)(Profile);
export default profileScreen;