import React from 'react';
import {Text, View, ScrollView, Image, TextInput, TouchableWithoutFeedback, Animated, Keyboard, FlatList} from 'react-native';
import {Ionicons} from '@expo/vector-icons';
import BareComponents from "../../components/other/BareComponents";
import {styles} from "../../Styles";
import Store from "../../Store";
import {retrieveUsers, retrieveEvents, retrieveServers} from "../../Networking";

export default class Discover extends React.Component{
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

            //events page
            eventData:[],
            eventSearchData:[],

            //servers page
            serverData:[],
            serverSearchData:[],

            //profile page
            profileData:[],
            profileSearchData:[],

        }
        //set safe area background
        Store.dispatch({type:"SET_SAFE_AREA_BACKGROUND", payload:"#ffffff"});
    }



    /*************************************************************************
    * This performs operations essential for retrieving users, events, & server
    * data
    *************************************************************************/
   componentWillMount(){
        retrieveUsers().then(() =>{
            console.log("ret events in discover");
            return retrieveEvents();
        }).then(() =>{
            console.log("servers in discover");
            //FIXME edit this to support multiple servers
            return retrieveServers(Store.getState().Global.accountInfo["groups"][0]);
        }).then(() => {
            console.log("Done. Parsin");
            let profileData = JSON.parse(JSON.stringify(Store.getState().Global.usersData));
            let serverData = JSON.parse(JSON.stringify(Store.getState().Global.serverData));
            let eventData = JSON.parse(JSON.stringify(Store.getState().Global.calendarData))["events"];
            this.setState({ profileData:profileData, profileSearchData:profileData, 
                serverData: serverData, serverSearchData: serverData, 
                eventData: eventData, eventSearchData: eventData});
        }).catch((err) =>{
            console.log("got error ", err);
        })
        
    }

    /*************************************************************************
    * associates a key for every item in the flatlist. We use keyExtractor to 
    * preserve the naming of 'uuid' from the API
    *************************************************************************/
    _keyExtractor = (item, index) => item.unique_id;



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

        const textArray = ["Servers", "Events", "Profiles"];
        if(selectedButton){
            return(
            <View>
                <Text style={styles.discover_selectedButton}>{textArray[infList[index]]}</Text>
            </View>);
        }
        //for deselected buttons
        return(
            <TouchableWithoutFeedback
            onPress={() => this.setState({selectedListID: infList[index], text: "Search", groupSearchData: this.state.groupData, profileSearchData: this.state.profileData})}>
                <Text style={styles.discover_deselectedButton}>{textArray[infList[index]]}</Text>
            </TouchableWithoutFeedback>
        );
    }


    /*************************************************************************
     * This is run every time an item (events/profile/servers) on tripleList 
     * is selected
     *************************************************************************/
    itemSwitch(){
        switch(this.state.selectedListID){
            case 0:
                return(<Text>Servers page</Text>)
            case 1:
                
                console.log(this.state.eventSearchData);
                
                // return(<FlatList 
                //     horizontal={false}
                //     data={this.state.eventSearchData["events"]}
                //     keyExtractor={this._keyExtractor}
                //     showsHorizontalScrollIndicator={false}
                //     showsHorizontalScrollIndicator={false}
                //     style={{marginTop:40}}
                //     renderItem={(item) => 
                //         this.state.components.eventTile(item)}/>);
            
            case 2:
                return(<FlatList
                    horizontal={false}
                    data={this.state.profileSearchData}
                    keyExtractor={this._keyExtractor}
                    showsHorizontalScrollIndicator={false}
                    style={{marginTop:40}}
                    renderItem={({item})=>
                    this.state.components.profileView(item)}
                />);
        }
    }

    render(){
    return(
    <View style={{flex:1, flexDirection:"column", backgroundColor:"white"}}>
    <ScrollView style={{marginTop:50}}>

        {/* Header */}
        <View style={styles.discover_topContentView}>
            <Text style={styles.discover_headerText}>Discover</Text>
            
            {/* TripleList */}
            <View style={styles.discover_tripleList}>
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
                style={[styles.discover_textInput, {minWidth:300, maxWidth:300}]}
                onChangeText={(text) => this.setState({text})}
                value={this.state.text} 
                selectionColor={"black"}
                numberOfLines={1}
                onSubmitEditing={() => {
                    switch(this.state.selectedListID){
                        case 1:
                            let groupFiltered = this.state.components.searchFunction(this.state.groupData, this.state.text, ["name", "alias"]);
                            this.setState({groupSearchData: groupFiltered});
                            break;
                        case 2:
                            let profileFiltered = this.state.components.searchFunction(this.state.profileData, this.state.text, ["name"]);
                            this.setState({profileSearchData: profileFiltered});
                            break;
                    }
                }}
                onFocus={() =>{[this.state.text == "Search" ? this.setState({text:""}) :null]}}
                clearTextOnFocus={true}
                maxLength={125}/>
            <Ionicons name="ios-search" style={styles.discover_searchIcon}/>
        </View>

        {/* Content */}
        <View style={styles.discover_bottomContentView}>
            {this.itemSwitch()}
        </View>
    </ScrollView>
    </View>
    );
    }
};