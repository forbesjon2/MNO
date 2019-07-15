import React from 'react';
import {Text, View, StyleSheet, ScrollView, Image, TextInput, TouchableWithoutFeedback, Animated, FlatList} from 'react-native';
import { connect } from "react-redux";
import {Ionicons} from '@expo/vector-icons';

class Discover extends React.Component{
    constructor(props){
        super(props);
        this.viewabilityConfig={viewAreaCoveragePercentThreshold:50}
        this.state = {
            selectedListID: 1,
            text: "Search",
        }
        //set safe area background
        this.props.dispatch({type:"SET_SAFE_AREA_BACKGROUND", payload:"#ffffff"});
    }

    listButtonGen(index, selectedButton){
        const infiniteList = [[0,1,2],[2,0,1],[1,2,0]];
        var infList;
        for(var i = 0; i < infiniteList.length; ++i){
            if(this.state.selectedListID == infiniteList[i][1]) infList = infiniteList[i];
        }

        const textArray = ["Servers", "Groups", "Profiles"];
        if(selectedButton){
            return(
            <TouchableWithoutFeedback
            onPress={() => this.setState({selectedListID: infList[index]})}>
            <Text style={styles.selectedButtonStyle}>{textArray[infList[index]]}</Text>
            </TouchableWithoutFeedback>);
        }
        //for deselected buttons
        return(
            <TouchableWithoutFeedback
            onPress={() => this.setState({selectedListID: infList[index]})}>
            <Text style={styles.deselectedButtonStyle}>{textArray[infList[index]]}</Text>
            </TouchableWithoutFeedback>
        );
    }

    // getList(selectedListID){
    //     const infiniteList = [[0,1,2],[2,0,1],[1,2,0]];
    //     for(var i = 0; i < infiniteList.length; ++i){
    //         if(selectedListID == infiniteList[i][1]) return infiniteList[i];
    //     }
    // }

    render(){
    return(
    <View style={{flex:1, flexDirection:"column", backgroundColor: "white"}}>
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
                    {/* {this.listButtonGen(selectedList[2], false)} */}
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
                onFocus={() =>{[this.state.text == "Search" ? this.setState({text:""}) :null]}}
                clearTextOnFocus={true}
                maxLength={125}/>
                <Ionicons name="ios-search" style={[{textAlign:"center", color:"black", textAlignVertical:"center", position:"absolute", marginLeft: 280, marginTop:4, fontSize:22}]}/>
        </View>

        {/* Content */}
        <View style={styles.bottomContentView}>
            {/* <MiniCalendar/> */}
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

});


const mapStateToProps = (store) => ({
    
});

const discoverScreen  = connect(mapStateToProps)(Discover);
export default discoverScreen;