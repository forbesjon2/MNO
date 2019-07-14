import React from "react";
import {View, Text, StyleSheet, TextInput, TouchableWithoutFeedback, TouchableOpacity, Switch, Keyboard} from "react-native";
import {connect} from "react-redux";
import {Ionicons} from '@expo/vector-icons';
// import ImagePicker from 'react-native-image-picker';
import TimePicker from '../other/TimePicker';



/*************************************************************************
 * This contains all of the subNav screens. Its imported into Nav.js
 * as a component
 * 
 * The structure of this file is simple, theres a switch statement that
 * calls different functions depending on what the redux variable pageID
 * is set at.
 * 
 * pageID changes every time the app navigates to another page (not in here)
 * its purpose is to track what page the app is currently on
 * 
 * These functions correspond to each page's subNav
 * 
 * Note: switches and textinput's normally dont respond to flex layouts on
 * android
 * 
 * TODO implement imagePicker
 * add more number of lines & dynamically expand height
 * https://www.npmjs.com/package/react-native-image-picker 
 * 
 * perms
 * https://github.com/react-native-community/react-native-image-picker/blob/HEAD/docs/Install.md
 * also
 * https://facebook.github.io/react-native/docs/cameraroll#getphotos
 * 
 **************************************************************************/
class NavContent extends React.Component{
    constructor(props){
        super(props);
        this.state={

            //home state variables
            homeSubNavText:"What's on your mind?",
            
            //event state variables
            eventTitle: "",
            eventDescription: "",

            //discover state variables
            visibilitySwitch: false,
            accessibilitySwitch: false,
            
            //settings state variables
            feedback:"",
        }
    }


    /************************************************************************* 
     * selectImage
     * 
     * This is the logic for selecting an image on each platform
     *************************************************************************/
    selectImage(){
        const options = {
            title: 'Attach Photo',
            customButtons: [{ name: 'fb', title: 'Choose Photo from Facebook' }],
            storageOptions: {
              skipBackup: true,
              path: 'images',
            },
          };
        ImagePicker.showImagePicker(options, (response) => {
            console.log("Response ", response);
            if (response.didCancel) {
                console.log('User cancelled image picker');
              } else if (response.error) {
                console.log('ImagePicker Error: ', response.error);
              } else if (response.customButton) {
                console.log('User tapped custom button: ', response.customButton);
              } else {
                const source = { uri: response.uri };
              }
                // You can also display the image using data:
                // const source = { uri: 'data:image/jpeg;base64,' + response.data };
             
        })
    }




    /************************************************************************* 
     * homeSubNav
     * 
     * This is the content for the subnav on the home page
     *************************************************************************/
    homeSubNav(){
        return(
        <View style={{flexDirection: "row", height:100, marginRight:12}}>
            <TouchableWithoutFeedback>
                <Ionicons name="ios-attach" style={[styles.clipSendIcon, {marginBottom:30}]}/>
            </TouchableWithoutFeedback>
            
            {/* The textbox */}
            <View style={{alignItems:"stretch",}}>
                <TextInput blurOnSubmit={true} style={[styles.textInput]} onChangeText={(text) => this.setState({homeSubNavText:text})}
                onFocus={() =>{[this.state.homeSubNavText == "What's on your mind?" ? this.setState({homeSubNavText:""}) :null]}} maxLength={1000} multiline={true} numberOfLines={2}
                value={this.state.homeSubNavText} enablesReturnKeyAutomatically={true} scrollEnabled={true} keyboardAppearance="dark" selectionColor="gray"/>
            </View>
            
            <TouchableWithoutFeedback>
                <Ionicons name="ios-send" style={[styles.clipSendIcon, {marginBottom:30}]}/>
            </TouchableWithoutFeedback> 
        </View>);
    }



    /************************************************************************* 
     * EventSubNav
     * 
     * This is the content for the subnav on the events page
     *********************************************************:2, flexDirection:"row", ****************/
    eventSubNav(){
        return(        
        <View style={{flexDirection: "column", marginLeft:10, backgroundColor:"black", height:650}}>
            <Text style={[styles.headerTextDiscover, {flex:1, flexDirection:"row"}]}>Create an Event</Text>
            <View style={{flex:2, flexDirection:"row"}}>
                {/* TODO add datePicker */}
                <View style={{flex:1, flexDirection:"column"}}><Text style={[styles.eventItemText, {flexDirection:"row"}]}>Starting Date/Time</Text><TimePicker isStart={true}/></View>
                <View style={{flex:1, flexDirection:"column"}}><Text style={[styles.eventItemText, {flexDirection:"row"}]}>Ending Date/Time</Text><TimePicker isStart={false}/></View>
            </View>
            <View style={{flex:2, flexDirection:"row"}}>
                <View style={{flex:1, flexDirection:"column"}}><Text style={[styles.eventItemText, {flexDirection:"row"}]}>Event Title</Text><TextInput style={{color:"white", height: 35, width:155, borderColor: 'gray', borderWidth: 1, marginLeft:10, marginRight:30, borderRadius:5, textAlignVertical:"center"}} maxLength={75} onChangeText={(text) => {this.setState({eventTitle: text})} }/></View>
            </View>
            <View style={{flex:4, flexDirection:"row"}}>
                <View style={{flex:1, flexDirection:"column"}}><Text style={[styles.eventItemText, {flexDirection:"row"}]}>Event Description</Text><TextInput style={{color:"white", height: 120, borderColor: 'gray', borderWidth: 1, marginLeft:10, marginRight:30, borderRadius:5, textAlignVertical:"top", padding:5}} maxLength={2000} onChangeText={(text) => {this.setState({eventDescription:text})}}/></View>
            </View>
            <View style={{flex:4, flexDirection:"row"}}><Text style={[styles.eventItemText, {flex:1, marginRight:30, flexDirection:"row", textAlign:"right", fontSize:18}]}>Create</Text></View>
        </View>);
    }


    /************************************************************************* 
     * discoverSubNav
     * 
     * This is the content for the subnav on the discover page
     * 
     * TODO for some reason this wont work
     * (FIXME)
     *************************************************************************/
    discoverSubNav(){
        return(
        <View style={{minHeight: 500, backgroundColor:"black"}}>
            <Text style={[styles.headerTextDiscover, {paddingLeft:10, marginBottom:10, maxHeight:90}]}>Create a Group</Text>
            <Text style={{color:"white", textAlign:"center", fontFamily:"Khula-Regular", fontSize:16, maxHeight:20}}>Visibility</Text>
                <Switch style={{ alignSelf:"center", maxHeight:40}} disabled={false} onValueChange={(value) => this.setState({visibilitySwitch: value})} value={this.state.visibilitySwitch}/>
            <Text style={{ color:"white", textAlign:"center", fontFamily:"Khula-Light", fontSize:16, maxHeight:80}}>only students can view this group</Text>
            <Text style={{ color:"white", textAlign:"center", fontFamily:"Khula-Regular", fontSize:16, maxHeight:20}}>Accessibility</Text>
                <Switch style={{alignSelf:"center", maxHeight:40}} onValueChange={(value) => this.setState({accessibilitySwitch: value})} value={this.state.accessibilitySwitch} />
            <Text style={{color:"white", textAlign:"center", fontFamily:"Khula-Light", fontSize:16, maxHeight:150}}>anyone can join this group</Text>
            <TouchableWithoutFeedback  onPress={() => this.no}>
                <Text style={[styles.headerTextDiscover, {color:"white", textAlign:"right", textAlignVertical:"top",fontSize:16, marginRight:12, marginTop:0, marginBottom:10}]}>Continue</Text>
            </TouchableWithoutFeedback>
    
        </View>
        );
    }



    /************************************************************************* 
     * SettingsSubNav
     * 
     * This is the content for the subnav on the settings page
     *************************************************************************/
    settingsSubNav(){
        return(
            <TouchableWithoutFeedback onPressOut={() => Keyboard.dismiss()}>
            <View style={{minHeight: 350, backgroundColor:"black"}}>
                <Text style={[styles.headerTextDiscover, {paddingLeft:10, marginBottom:40, maxHeight:120}]}>Send Feedback</Text>
                {/* TODO finish */}
                <Text style={[styles.eventItemText, {fontSize: 20}]}>comments</Text>
                <View style={{justifyContent:"flex-start"}}>
                    <TextInput style={{color:"white", width: 380, height:100, borderColor: 'gray', borderWidth: 1, marginLeft:10, borderRadius:5}} numberOfLines={6} multiline={true} onChangeText={(text) => this.setState({feedback: text})} />
                </View>
                <View style={{flex:2, flexDirection:"row", }}>
                    <TouchableOpacity  style={{flex:1, flexDirection:"column", backgroundColor:"white", maxWidth:60}}>
                        <Ionicons name="ios-send" style={[styles.clipSendIcon, {lineHeight:55, marginRight:30}]}/>
                    </TouchableOpacity>
                </View>
            </View>
            </TouchableWithoutFeedback>
            );

    }


    //Note: this was wrapped in keyboardAvoidingView
    //home = 1, events = 2, discover = 3, messages = 4, profile = 5, settings = 6
    render(){
        switch(this.props.pageID){
            case 1:  //home
            return(this.homeSubNav());
            case 2:
            return(this.eventSubNav());
            case 3:  //discover
            return(this.discoverSubNav());
            case 6:
            return(this.settingsSubNav());
            default:
                return(
                    <View></View>
                );
        }
    }
}


const styles = StyleSheet.create({
    headerTextHome:{
        backgroundColor: "black",
        color: "white",
        fontFamily: "DidactGothic-Regular",
        fontSize: 50,
        opacity: 0.8,
        marginLeft: 10,
    },
    headerTextDiscover:{
        backgroundColor: "black",
        color: "white",
        fontFamily: "Khula-Light",
        fontSize: 45,
        marginLeft: 10,
        flex:1,
        flexDirection:"row",
        maxHeight:120
    },
    eventItemText:{
        color: "white",
        fontFamily: "Khula-Light",
        marginLeft: 10,
        marginTop: 25,
    },
    clearAllText:{
        fontFamily: "DidactGothic-Regular",
        backgroundColor: "black",
        color: "white",
        fontSize: 16,
        marginLeft: 20,
        marginBottom: 10,
    },
    textInput:{
        color:"white",
        flex:7,
        flexDirection:"column",
        fontFamily: "Khula-Light",
        fontSize:19,
        lineHeight:24,
        marginTop:6,
        padding:6,
        maxHeight: 75,
        minHeight: 75,
        textAlignVertical:"bottom",
        borderRadius:10,
    },
    clipSendIcon:{
        flex:1,
        flexDirection:"column",
        fontSize:26,
        alignSelf:"flex-end",
        textAlign:"center",
        opacity:0.7,
        color:"white",
        marginBottom:13
    }
});


const mapStateToProps = (store) => ({
    pageID: store.Global.pageID
});

const NavContentScreen = connect(mapStateToProps)(NavContent);
export default NavContentScreen;