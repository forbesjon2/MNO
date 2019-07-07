import React from 'react';
import {Text, View, StyleSheet, ScrollView, Image, TextInput, TouchableWithoutFeedback, Animated, FlatList} from 'react-native';
import { connect } from "react-redux";
import {Ionicons} from '@expo/vector-icons';
import TripleList from "../../components/other/TripleList";
import MiniCalendar from "../../components/other/MiniCalendar";

class Discover extends React.Component{
    constructor(props){
        super(props);
        this.viewabilityConfig={viewAreaCoveragePercentThreshold:50}
        this.state = {
            buttonSelected: 1,
            text: "Search",
            searchWidth: new Animated.Value(100),
            searchTriggered:false,
            calendarHeader: "H"
        }
    }

    render(){
        //added scrollview to make it not warp when the subnav is open. Do want to not have it
        //scroll with the content though
    return(
    <View style={{flex:1, flexDirection:"column", backgroundColor: "white"}}>
        <ScrollView style={{marginTop:50}}>
        <View style={styles.topContentView}>
            <Text style={styles.headerText}>Discover</Text>
            <View style={styles.tripleList}>
                <TripleList 
                selectedButtonSize={32}
                deselectedButtonSize={26}
                selectedButtonHeight={30}
                deselectedButtonHeight={30}
                selectedButtonLineHeight={44}
                textArray={["Tutors", "Groups", "Profiles"]}/>
            </View>

        </View>

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
            <View style={styles.bottomContentView}>
                {/* <MiniCalendar/> */}
            </View>
        </ScrollView>
    </View>
    );
    }
};





const styles = StyleSheet.create({
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
    scrollText:{
        color: "black",
        fontFamily:"Khula-Bold",
        fontSize: 20,
        marginHorizontal:25
    }
});


const mapStateToProps = (store) => ({
    
});

const discoverScreen  = connect(mapStateToProps)(Discover);
export default discoverScreen;