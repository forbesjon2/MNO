import React from 'react';
import { View, TouchableWithoutFeedback, Text , TouchableOpacity, FlatList, Keyboard, TextInput, Image} from "react-native";
import { connect } from "react-redux";
import {Ionicons} from '@expo/vector-icons';
import {styles} from "../../Styles";


/*************************************************************************
 * This is the School Search screen, it appears after you enter your
 * login information
 * 
 * Notes:
 * the list is set up to be semi efficient using flatlist but it is a very 
 * simple implementation
 *************************************************************************/
class SchoolSearch extends React.Component{
    constructor(props){
        super(props);
        this.state={
            text:"",
            groupData:[],
            searchData:[]
        }
        //sets the safe area background for iOS
        this.props.dispatch({type:"SET_SAFE_AREA_BACKGROUND", payload:"#42368A"});
    }

    
    returnImg(width, height, url){
        if(width == 0 || height == 0){
            return(<Text>No image</Text>)
        }else{
            return(<Image source={{uri:url}} style={{ minWidth:width, minHeight:height, alignSelf:"center", marginTop:20}}/>);
        }
    }


    /*************************************************************************
    * This returns the JSX for each element (Group) in the flatlist.
    * 
    * It expects the following format (where uuid is used elsewhere)
    *   {"uuid":"<unique identifier>", "name":"<group name>", 
    *   "epithet":"<group epithet>", "members":<number of members>, 
    *   "servers":<number of servers>, "icon":"<icon url>"}
    *************************************************************************/
    groupView(item){
        item = JSON.parse(JSON.stringify(item));
        return(
            <View style={styles.schoolsearch_groupMain}>
        <View style={{flex:1, flexDirection:"column", margin:15}}>
            {/* Name */}
            <View style={{flex:1, maxHeight:50, minHeight:50, flexDirection:"row", borderBottomColor:"#D0D1D3", borderBottomWidth:2}}>
                <Text numberOfLines={1} style={[styles.schoolsearch_groupContentText]}>{item["name"]}</Text>
            </View>

            {/* Epithet & icon */}
            <View style={{flex:1, maxHeight:80, minHeight:80, flexDirection:"row",  borderBottomColor:"#D0D1D3", borderBottomWidth:2}}>
                <View style={{flex:1, flexDirection:"column"}}>
                    <Text numberOfLines={1} style={[styles.schoolsearch_groupHeaderText, {color:'rgba(66,54,138,1)'}]}>epithet</Text>
                    <Text numberOfLines={1} style={styles.schoolsearch_groupContentText}>{item["epithet"]}</Text>
                </View>
                <View style={{flex:1, flexDirection:"column"}}>
                    {this.returnImg(item["width"], item["height"], item["icon"])}
                </View>
            </View>

            {/* Members &  Groups*/}
            <View style={{flex:1, flexDirection:"row",  borderBottomColor:"#D0D1D3", borderBottomWidth:2, maxHeight:120, minHeight:120}}>
                <View style={{flex:1, flexDirection:"column", borderRightColor:"#D0D1D3", borderRightWidth:2}}>
                <Text numberOfLines={1} style={[styles.schoolsearch_groupHeaderText, {color:'rgba(66,54,138,1)'}]}>members</Text>
                    <Text numberOfLines={1} style={[styles.schoolsearch_groupContentText, {alignSelf:"center", fontSize:48}]}>{item["members"]}</Text>
                </View>
                <View style={{flex:1, flexDirection:"column"}}>
                <Text numberOfLines={1} style={[styles.schoolsearch_groupHeaderText, {color:'rgba(66,54,138,1)'}]}>servers</Text>
                    <Text numberOfLines={1} style={[styles.schoolsearch_groupContentText, {alignSelf:"center", fontSize:48}]}>{item["servers"]}</Text>
                </View>
            </View>
            
            {/* Nav Button */}
            <TouchableOpacity style={{borderRadius:12}}>
                <View style={{backgroundColor:'rgba(66,54,138,0.2)', width:220, borderRadius:8, alignSelf:"center", marginTop:12, minHeight:45, maxHeight:45, flex:1, flexDirection:"row"}}>
                    <Text style={{color:'rgba(66,54,138,1)', paddingTop:9, paddingLeft:12, fontSize:18, flex:4, flexDirection:"column"}}>Select school.</Text>
                    <Ionicons name={"ios-arrow-round-forward"} style={{color:'rgba(66,54,138,1)', fontSize:42, flex:1, flexDirection:"column", alignSelf:"center"}} />
                </View>
            </TouchableOpacity>
        </View>
    </View>);
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
                    name:data[item]["name"], uuid:data[itrrrrem]["uuid"], 
                    width:0, height:0};
                let tempArray = this.state.groupData;
                tempArray.push(obj);
                this.setState({groupData: tempArray});
            });
            this.setState({searchData:this.state.groupData})
        }
    }

    /*************************************************************************
    * associates a key for every item in the flatlist. We use keyExtractor to 
    * preserve the naming of 'uuid' from the API
    *************************************************************************/
    _keyExtractor = (item, index) => item.uuid;
    
    /*************************************************************************
     * This is a simple search implementation using javascript regex. 
     *
     * the state variable 'groupData' is the original list of groups that is
     * never changed (used as a reference)
     * 
     * 'searchData' is updated every time this is run
    *************************************************************************/
    search(){
        Keyboard.dismiss()
        let filteredArray = [];
        var regex = new RegExp(this.state.text.toLowerCase(), 'g');
        const {groupData} = this.state;
        for(let item in groupData){
            let nameMatch = groupData[item]["name"].toLowerCase().match(regex);
            let epithetMatch = groupData[item]["epithet"].toLowerCase().match(regex);
            if(nameMatch != null || epithetMatch != null){
                filteredArray.push(groupData[item]);
            }
        }
        this.setState({searchData: filteredArray});
    }

    render(){
    return(
    <View style={styles.schoolsearch_main}>

        {/* Header */}
        <Text style={styles.schoolsearch_header}>Search for your school.</Text>
        <Text style={[styles.schoolsearch_subHeader, {marginBottom:25}]}>{this.state.groupData.length} schools available</Text>
        <View style={styles.schoolsearch_textInputView}>
            <TextInput
            style={styles.schoolsearch_textInput}
            onChangeText={(text) => this.setState({text})}
            value={this.state.text} 
            selectionColor={"black"}
            autoCorrect={false}
            numberOfLines={1}
            onFocus={() =>{[this.state.text == "Search" ? this.setState({text:""}) :null]}}
            clearTextOnFocus={true}
            onSubmitEditing={() => this.search()}
            maxLength={125}/>
            <TouchableWithoutFeedback onPress={() => this.search()}> 
                <Ionicons name="ios-search" style={[{textAlign:"center", color:"white", textAlignVertical:"center", position:"absolute", marginLeft: 300, marginTop:4, fontSize:22}]}/>
            </TouchableWithoutFeedback>
        </View>
        <FlatList 
            horizontal={true}
            data={this.state.searchData}
            keyExtractor={this._keyExtractor}
            showsHorizontalScrollIndicator={false}
            renderItem={({item}) => 
            this.groupView(item, false)}
        />
        <View style={{flex:1, flexDirection:"row", maxHeight:20, marginHorizontal:10, marginBottom:5}}>
            <Text style={styles.schoolsearch_bottomPageTextEnglish}>miniowl, 2019</Text>
            {/* Find, Discover, Explore */}
            <Text style={styles.schoolsearch_bottomPageTextJapanese}>発見、発見、探検</Text>
        </View>
    </View>
    );
}}

const mapStateToProps = (store) => ({
    groupData: store.Global.groupData
});

const schoolSearchScreen = connect(mapStateToProps)(SchoolSearch);
export default schoolSearchScreen;