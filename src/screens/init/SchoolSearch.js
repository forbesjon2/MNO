import React from 'react';
import { View, TouchableWithoutFeedback, Text , TouchableOpacity, FlatList, Keyboard, StyleSheet, TextInput} from "react-native";
import { connect } from "react-redux";
import {Ionicons} from '@expo/vector-icons';
import GroupView from "../../components/other/GroupView";

/*************************************************************************
 * This is the School Search screen
 * 
 * 
 *************************************************************************/
class SchoolSearch extends React.Component{
    constructor(props){
        super(props);
        this.state={
            text:"",
            groupData:{}
        }
    }
    
    componentWillMount(){
        this.setState({groupData: JSON.parse(JSON.stringify(this.props.groupData["groups"]))});
    }

    _keyExtractor = (item, index) => item.uuid;

    search(){
        Keyboard.dismiss()
        this.setState({})
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
        maxLength={125}/>
        <TouchableWithoutFeedback onPress={() => this.search()}>
            <Ionicons name="ios-search" style={[{textAlign:"center", color:"white", textAlignVertical:"center", position:"absolute", marginLeft: 280, marginTop:4, fontSize:22}]}/>
        </TouchableWithoutFeedback>
        </View>
        <FlatList 
            horizontal={true}
            data={this.state.groupData}
            keyExtractor={this._keyExtractor}
            showsHorizontalScrollIndicator={false}
            renderItem={({item}) => 
            <GroupView 
                isGroup={true}
                name={item["name"]}
                epithet={item["epithet"]}
                icon={item["icon"]}
                members={item["members"]}
                rooms={item["rooms"]}
                />}
            />
    </View>
    );
}}





const styles = StyleSheet.create({
    main:{
        flex:1,
        flexDirection:"column",
        backgroundColor:"#42368A",
        padding:20
    },
    header:{
        fontFamily:"DidactGothic-Regular",
        fontSize:38,
        color:"white",
        marginTop:40,
        marginBottom:8
    },
    subHeader:{
        fontFamily:"Roboto-Light",
        fontSize:18,
        color:"white",
        opacity:0.7,
        lineHeight:19,
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
        marginBottom:50
    }
})


const mapStateToProps = (store) => ({
    groupData: store.Global.groupData
});

const schoolSearchScreen = connect(mapStateToProps)(SchoolSearch);
export default schoolSearchScreen;