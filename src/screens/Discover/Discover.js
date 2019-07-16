import React from 'react';
import {Text, View, StyleSheet, ScrollView, Image, TextInput, TouchableWithoutFeedback, Animated, Keyboard, FlatList} from 'react-native';
import { connect } from "react-redux";
import {Ionicons} from '@expo/vector-icons';
import BareComponents from "../../components/other/BareComponents";

class Discover extends React.Component{
    constructor(props){
        super(props);
        this.viewabilityConfig={viewAreaCoveragePercentThreshold:50}
        this.state = {
            selectedListID: 1,
            text: "Search",

            //general page integration
            components: new BareComponents(),

            //group page
            groupData:[],
            groupSearchData:[],

            //profile page
            profileData:"",
            profileSearchData:[],

        }
        //set safe area background
        this.props.dispatch({type:"SET_SAFE_AREA_BACKGROUND", payload:"#ffffff"});
    }



    /*************************************************************************
    * This performs operations essential for icon sizing. 
    * 
    * For every Group (or school) it recieves from the API, it gets & calculates 
    * the correct dimensions for the icon.
    * 
    * It then appends that to the state
    *************************************************************************/
   componentWillMount(){
        let userData = JSON.stringify(require("../../../data/UsersData.json"));
        let data = JSON.parse(JSON.stringify(this.props.groupData["groups"]));
        for(let item in data){
            Image.getSize(data[item]["icon"], (w, h) => {
                var dimensionWidth = 50;
                var obj = {icon: data[item]["icon"], servers:data[item]["servers"], 
                    members:data[item]["members"], epithet:data[item]["epithet"],
                    name:data[item]["name"], uuid:data[item]["uuid"], 
                    width:dimensionWidth, height:[w > dimensionWidth ? h * (dimensionWidth / w) : h * (w / dimensionWidth)][0]};
                let tempArray = this.state.groupData;
                tempArray.push(obj);
                this.setState({groupData: tempArray});
            }, (error) => {
                var obj = {icon: data[item]["icon"], servers:data[item]["servers"], 
                    members:data[item]["members"], epithet:data[item]["epithet"],
                    name:data[item]["name"], uuid:data[item]["uuid"], 
                    width:0, height:0};
                let tempArray = this.state.groupData;
                tempArray.push(obj);
                this.setState({groupData: tempArray});
            });
        }
        this.setState({groupSearchData:this.state.groupData, profileData:userData, profileSearchData:userData});
    }

    /*************************************************************************
    * associates a key for every item in the flatlist. We use keyExtractor to 
    * preserve the naming of 'uuid' from the API
    *************************************************************************/
    _keyExtractor = (item, index) => item.uuid;


    /*************************************************************************
     * This is a search implementation using javascript regex. 
     *
     * the argument originalData is the original list of groups that is
     * never changed (used as a reference)
     * 
     * XX is updated every time this is run
    *************************************************************************/
    groupSearch(){
        Keyboard.dismiss()
        let filteredArray = [];
        var regex = new RegExp(this.state.text.toLowerCase(), 'g');
        const {groupData} = this.state;
        for(let i in groupData){
            if(groupData[i]["name"].toLowerCase().match(regex) != null ||
                groupData[i]["epithet"].toLowerCase().match(regex) != null){
                    filteredArray.push(groupData[i]);
            }
        }
        this.setState({groupSearchData: filteredArray});
    }

    profileSearch(){
        Keyboard.dismiss();
        let filteredArray = [];
        var regex = new RegExp(this.state.text.toLowerCase(), 'g');
        const {profileData} = this.state;
        for(let i in profileData){
            if(profileData[i].toLowerCase().match(regex) != null){
                filteredArray.push(profileData[i]);
            }
        }
        this.setState({profileSearchData:filteredArray});
    }

    /*************************************************************************
     * This creates each component for the Servers/groups/profiles list
     * (formerly named triplelist)
     * 
     * There are two smaller size elements and one larger, center element. All
     * three are buttons. When one is pressed the textbox is reset
     *************************************************************************/
    listButtonGen(index, selectedButton){
        const infiniteList = [[0,1,2],[2,0,1],[1,2,0]];
        var infList;
        for(var i = 0; i < infiniteList.length; ++i){
            if(this.state.selectedListID == infiniteList[i][1]) infList = infiniteList[i];
        }

        const textArray = ["Servers", "Groups", "Profiles"];
        if(selectedButton){
            return(
            <View>
                <Text style={styles.selectedButtonStyle}>{textArray[infList[index]]}</Text>
            </View>);
        }
        //for deselected buttons
        return(
            <TouchableWithoutFeedback
            onPress={() => this.setState({selectedListID: infList[index], text: "Search"})}>
                <Text style={styles.deselectedButtonStyle}>{textArray[infList[index]]}</Text>
            </TouchableWithoutFeedback>
        );
    }


    /*************************************************************************
     * This generates the list of users that is being searched
     * array -> {"name":"<some name>", "friends":<some number>, "icon":"<image url>"}
     * 
     * 
     * TODO I will eventually link this to the user profile screen
     * 
     * hey wb!
     * not sure wtf is happening here
     *************************************************************************/
    profileTileGen(){
        var tilelist = [];
        var profileData = JSON.parse(JSON.stringify(this.state.profileData));
        const {profileSearchData} = this.state;
        for(let i in profileData){
            tilelist.push(
            <View style={styles.friendRow}>
                <View style={{flex:1, flexDirection:"column", justifyContent:"center"}}>
                <Image source={{uri:profileSearchData[i]["icon"]}} style={styles.friendImage}/>
                </View>
                <View style={{flex:3, flexDirection:"column"}}>
                    <View style={{flex:1, flexDirection:"row"}}>
                        <Text style={styles.friendNameText}>{profileSearchData[i]["name"]}</Text>
                    </View>
                    <View style={{flex:1, flexDirection:"row"}}>
                        <Text style={styles.friendFollowersText}>{profileSearchData[i]["friends"]} friends</Text>
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


    itemSwitch(){
        switch(this.state.selectedListID){
            case 1:
                return(<FlatList 
                    horizontal={true}
                    data={this.state.groupSearchData}
                    keyExtractor={this._keyExtractor}
                    showsHorizontalScrollIndicator={false}
                    style={{marginTop:40}}
                    renderItem={({item}) => 
                this.state.components.groupView(item)}/>);
            case 2:
                return(this.profileTileGen());
        }
    }

    render(){
    return(
    <View style={{flex:1, flexDirection:"column"}}>
    <ScrollView style={{marginTop:50}}>

        {/* Header */}
        <View style={styles.topContentView}>
            <Text style={styles.headerText}>Discover</Text>
            
            {/* TripleList */}
            <View style={styles.tripleList}>
                <View style={{alignContent:"center"}}>
                    {this.listButtonGen(0, false)}
                    {this.listButtonGen(1, true)}
                    {this.listButtonGen(2, false)}
                </View>
            </View>
        </View>

        {/* Input */}
        <View style={{flex:1, flexDirection:"row", maxHeight:30, marginLeft:50, marginTop:30}}>
            <TextInput
                style={[styles.textInput, {minWidth:300, maxWidth:300}]}
                onChangeText={(text) => this.setState({text})}
                value={this.state.text} 
                selectionColor={"black"}
                numberOfLines={1}
                onSubmitEditing={() => {
                    switch(this.state.selectedListID){
                        case 1:
                            this.groupSearch();
                            break;
                        case 2:
                            this.profileSearch();
                            break;
                    }
                }}
                onFocus={() =>{[this.state.text == "Search" ? this.setState({text:""}) :null]}}
                clearTextOnFocus={true}
                maxLength={125}/>
            <Ionicons name="ios-search" style={[{textAlign:"center", color:"black", textAlignVertical:"center", position:"absolute", marginLeft: 280, marginTop:4, fontSize:22}]}/>
        </View>

        {/* Content */}
        <View style={styles.bottomContentView}>
            {this.itemSwitch()}
        </View>
    </ScrollView>
    </View>
    );
    }
};


const styles = StyleSheet.create({
    deselectedButtonStyle:{
        fontSize:26, 
        height: 30, 
        maxWidth: 90, 
        fontFamily: "Khula-Light", 
        color: "black"
    },
    selectedButtonStyle:{
        fontSize:32, 
        height: 30,
        fontFamily: "Khula-ExtraBold", 
        color: "black", 
        lineHeight: 44, 
        maxWidth: 120
    },
    headerText:{
        fontFamily:"Khula-Light",
        fontSize: 38,
        flex: 1, 
        marginLeft: 55,
        maxWidth:150,
        alignSelf: "center",
        color: "black",
    },
    textInput:{
        flex:1,
        color: "black",
        fontFamily:"Khula-Light",
        fontSize: 20,
        margin:0,
        padding:0,
        textAlignVertical:"bottom",
        borderBottomWidth:1,
        borderBottomColor:"gray"
    },
    topContentView:{
        flex: 3,
        flexDirection:"row",
    },
    bottomContentView:{
        flex: 8,
    },
    tripleList:{
        flex:1,
        alignSelf:"center",
    },
    friendRow:{
        flex:1, 
        flexDirection:"row",
        maxHeight:50,
        marginTop:20
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
    friendNameText:{
        fontFamily:"Roboto-Medium", 
        fontSize: 19,
        color:"black",
        minHeight:26,
        maxHeight:26,
    },
    friendFollowersText:{
        fontFamily:"Roboto-Regular", 
        fontSize: 13,
        paddingTop:5,
        color:"black",
    },
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
});


const mapStateToProps = (store) => ({
    groupData: store.Global.groupData
});

const discoverScreen  = connect(mapStateToProps)(Discover);
export default discoverScreen;