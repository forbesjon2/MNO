import React from 'react';
import { View, TouchableWithoutFeedback, Text , TouchableOpacity, FlatList, Keyboard, StyleSheet, TextInput, Image} from "react-native";
import { connect } from "react-redux";
import {Ionicons} from '@expo/vector-icons';
import GroupView from "../../components/other/GroupView";

/*************************************************************************
 * This is the School Search screen, it appears after you enter your
 * login information
 * 
 * Notes:
 * the list is set up to be semi efficient using flatlist but it is a very 
 * simple implementa
 * 
 * 
 *************************************************************************/
class SchoolSearch extends React.Component{
    constructor(props){
        super(props);
        this.state={
            text:"",
            groupData:[],
            searchData:[]
        }
    }

    returnImg(width, height, url){
        if(width == 0 || height == 0){
            return(<Text>No image</Text>)
        }else{
            return(<Image source={{uri:url}} style={{ minWidth:width, minHeight:height, alignSelf:"center", marginTop:20}}/>);
        }
    }

    groupView(item){
        item = JSON.parse(JSON.stringify(item));
        return(
            <View style={groupStyles.main}>
        <View style={{flex:1, flexDirection:"column", margin:15}}>
            {/* Name */}
            <View style={{flex:1, maxHeight:50, minHeight:50, flexDirection:"row", borderBottomColor:"#D0D1D3", borderBottomWidth:2}}>
                <Text numberOfLines={1} style={[groupStyles.contentText]}>{item["name"]}</Text>
            </View>

            {/* Epithet & icon */}
            <View style={{flex:1, maxHeight:80, minHeight:80, flexDirection:"row",  borderBottomColor:"#D0D1D3", borderBottomWidth:2}}>
                <View style={{flex:1, flexDirection:"column"}}>
                    <Text numberOfLines={1} style={[groupStyles.headerText, {color:'rgba(66,54,138,1)'}]}>epithet</Text>
                    <Text numberOfLines={1} style={groupStyles.contentText}>{item["epithet"]}</Text>
                </View>
                <View style={{flex:1, flexDirection:"column"}}>
                    {this.returnImg(item["width"], item["height"], item["icon"])}
                </View>
            </View>

            {/* Members &  Groups*/}
            <View style={{flex:1, flexDirection:"row",  borderBottomColor:"#D0D1D3", borderBottomWidth:2, maxHeight:120, minHeight:120}}>
                <View style={{flex:1, flexDirection:"column", borderRightColor:"#D0D1D3", borderRightWidth:2}}>
                <Text numberOfLines={1} style={[groupStyles.headerText, {color:'rgba(66,54,138,1)'}]}>members</Text>
                    <Text numberOfLines={1} style={[groupStyles.contentText, {alignSelf:"center", fontSize:48}]}>{item["members"]}</Text>
                </View>
                <View style={{flex:1, flexDirection:"column"}}>
                <Text numberOfLines={1} style={[groupStyles.headerText, {color:'rgba(66,54,138,1)'}]}>rooms</Text>
                    <Text numberOfLines={1} style={[groupStyles.contentText, {alignSelf:"center", fontSize:48}]}>{item["rooms"]}</Text>
                </View>
            </View>
            
            {/* Nav Button */}
            <TouchableWithoutFeedback style={{borderRadius:12}}>
                <View style={{backgroundColor:'rgba(66,54,138,0.2)', width:220, borderRadius:8, alignSelf:"center", marginTop:12, minHeight:45, maxHeight:45, flex:1, flexDirection:"row"}}>
                    <Text style={{color:'rgba(66,54,138,1)', paddingTop:9, paddingLeft:12, fontSize:18, flex:4, flexDirection:"column"}}>Select school.</Text>
                    <Ionicons name={"ios-arrow-round-forward"} style={{color:'rgba(66,54,138,1)', fontSize:42, flex:1, flexDirection:"column", alignSelf:"center"}} />
                </View>
            </TouchableWithoutFeedback>
        </View>
    </View>
        );
    }

    
    componentWillMount(){
        let data = JSON.parse(JSON.stringify(this.props.groupData["groups"]));
        for(let item in data){
            Image.getSize(data[item]["icon"], (w, h) => {
                var dimensionWidth = 50;
                var obj = {icon: data[item]["icon"], rooms:data[item]["rooms"], 
                    members:data[item]["members"], epithet:data[item]["epithet"],
                    name:data[item]["name"], uuid:data[item]["uuid"], 
                    width:dimensionWidth, height:[w > dimensionWidth ? h * (dimensionWidth / w) : h * (w / dimensionWidth)][0]};
                let tempArray = this.state.groupData;
                tempArray.push(obj);
                this.setState({groupData: tempArray});
            }, (error) => {
                var obj = {icon: data[item]["icon"], rooms:data[item]["rooms"], 
                    members:data[item]["members"], epithet:data[item]["epithet"],
                    name:data[item]["name"], uuid:data[item]["uuid"], 
                    width:0, height:0};
                let tempArray = this.state.groupData;
                tempArray.push(obj);
                this.setState({groupData: tempArray});
            });
            this.setState({searchData:this.state.groupData})
        }
    }

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
        var regex = new RegExp(this.state.text, 'g');
        const {groupData} = this.state;
        for(let item in groupData){
            let nameMatch = (groupData[item]["name"]).toLowerCase().match(regex);
            let epithetMatch = groupData[item]["epithet"].toLowerCase().match(regex);
            if(nameMatch != null || epithetMatch != null){
                filteredArray.push(groupData[item]);
            }
        }
        this.setState({searchData: filteredArray});
    }

    render(){
    return(
    <View style={styles.main}>

        {/* Header */}
        <Text style={styles.header}>Search for your school.</Text>
        <Text style={[styles.subHeader, {marginBottom:25}]}>{this.state.groupData.length} schools available</Text>
        <View style={styles.textInputView}>
            <TextInput
            style={[styles.textInput, {minWidth:300, maxWidth:300}]}
            onChangeText={(text) => this.setState({text})}
            value={this.state.text} 
            selectionColor={"black"}
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
            this.groupView(item)}
        />
    </View>
    );
}}


const styles = StyleSheet.create({
    main:{
        flex:1,
        flexDirection:"column",
        backgroundColor:"#42368A",
    },
    header:{
        fontFamily:"DidactGothic-Regular",
        fontSize:38,
        color:"white",
        marginTop:40,
        marginBottom:8,
        paddingLeft:20,
        paddingTop:20
    },
    subHeader:{
        fontFamily:"Roboto-Light",
        fontSize:18,
        color:"white",
        opacity:0.7,
        lineHeight:19,
        paddingLeft:20,
        paddingRight:20
    },
    textInput:{
        flex:1,
        color: "white",
        fontFamily:"Khula-Light",
        fontSize: 20,
        margin:0,
        padding:0,
        textAlignVertical:"bottom",
        borderBottomWidth:1,
        borderBottomColor:"white"
    },
    textInputView:{
        maxHeight:35,
        minHeight:35,
        marginBottom:50,
        paddingLeft:20,
        paddingRight:20
    }
});

const groupStyles = StyleSheet.create({
    main:{
        maxHeight:350,
        minHeight:350,
        minWidth: 290,
        maxWidth: 290,
        marginHorizontal:20,
        backgroundColor:"white",
        marginTop:10,
        borderRadius:12
    },
    content:{
        margin:15,

    },
    contentText:{
        fontFamily: "Khula-Regular",
        fontSize:21,
        paddingLeft:3,
        color:"black",
        paddingTop:12
    },
    headerText:{
        fontFamily: "DidactGothic-Regular",
        fontSize:18,
        paddingLeft:3,
        paddingTop:1,
        paddingBottom:4,
    },
    buttonIcon:{
        alignSelf:"center",
        color:"white",
        fontSize:40,
        marginRight:20,
    },
})


const mapStateToProps = (store) => ({
    groupData: store.Global.groupData
});

const schoolSearchScreen = connect(mapStateToProps)(SchoolSearch);
export default schoolSearchScreen;