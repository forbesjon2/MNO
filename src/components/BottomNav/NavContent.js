import React from "react";
import {View, Text, StyleSheet, TextInput, TouchableWithoutFeedback, TouchableOpacity, Switch, PermissionsAndroid, Button, KeyboardAvoidingView} from "react-native";
import {connect} from "react-redux";
import {Ionicons} from '@expo/vector-icons';
// import ImagePicker from 'react-native-image-picker';
import TimePicker from '../other/TimePicker';

/**
 * TODO implement imagePicker
 * add more number of lines & dynamically expand height
 * https://www.npmjs.com/package/react-native-image-picker 
 * 
 * perms
 * https://github.com/react-native-community/react-native-image-picker/blob/HEAD/docs/Install.md
 * also
 * https://facebook.github.io/react-native/docs/cameraroll#getphotos
 * 
 */

class NavContent extends React.Component{
    constructor(props){
        super(props);
        this.state={}
    }
    render(){
        const {pageID} = this.props;
        return (
            <KeyboardAvoidingView>
            {generateContent(pageID, this)}
            </KeyboardAvoidingView>);
    }
}



//home = 1, events = 2, discover = 3, messages = 4, profile = 5, settings = 6
function generateContent(pageID){
    switch(pageID){
        case 1:  //home
        return(<HomeNavContent />);
        case 2:
        return(<EventNavContent />);
        case 3:  //discover
        return(<DiscoverNavContent />);
        case 6:
        return(<SettingsNavContent />);
        default:
            return(
                <View></View>
            );
    }
    
}

/************************************************************************* 
 * HomeNavContent
 * 
 * This is the content for the subnav on the home page
 * 
 *************************************************************************/
class HomeNavContent extends React.Component{
    constructor(props){
        super(props);
        this.state = {
            text:"What's on your mind?",
        }
    }
    render(){
        return(
    <View style={{flexDirection: "row", height:100, marginRight:12}}>

        <TouchableWithoutFeedback>
            <Ionicons name="ios-attach" style={[styles.clipSendIcon, {marginBottom:30}]}/>
        </TouchableWithoutFeedback>
        
        {/* The textbox */}
        <View style={{alignItems:"stretch",}}>
        <TextInput blurOnSubmit={true} style={[styles.textInput]} onChangeText={(text) => this.setState({text:text})}
         onFocus={() =>{[this.state.text == "What's on your mind?" ? this.setState({text:""}) :null]}} maxLength={1000} multiline={true} numberOfLines={2}
         value={this.state.text} enablesReturnKeyAutomatically={true} scrollEnabled={true} keyboardAppearance="dark" selectionColor="gray"/>
</View>
        <TouchableWithoutFeedback>
            <Ionicons name="ios-send" style={[styles.clipSendIcon, {marginBottom:30}]}/>
        </TouchableWithoutFeedback> 
    </View>);
    }
}


/************************************************************************* 
 * EventNavContent
 * 
 * This is the content for the subnav on the events page
 * 
 *************************************************************************/
class EventNavContent extends React.Component{
    constructor(props){
        super(props);
        this.state = {
            eventTitle: "",
            eventDescription: ""
        }
    }
    render(){
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
}


/************************************************************************* 
 * DiscoverNavContent
 * 
 * This is the content for the subnav on the discover page
 * 
 * TODO for some reason this wont work
 * (FIXME)
 *************************************************************************/
class DiscoverNavContent extends React.Component{
    constructor(props){
        super(props);
        this.state = {
            visibilitySwitch: false,
            accessibilitySwitch: false,
        }
        this.no = this.no.bind(this);
    }
    no(){
        console.log("NOFENFONON");
    }
    render(){
    return(
    <View style={{flex:1, flexDirection:"column", minHeight: 500, backgroundColor:"black"}}>
        <Text style={[styles.headerTextDiscover, {paddingLeft:10, marginBottom:10, maxHeight:90}]}>Create a Group</Text>
        <Text style={{flex:1, flexDirection:"row", color:"white", textAlign:"center", fontFamily:"Khula-Regular", fontSize:16, maxHeight:20}}>Visibility</Text>
        <Switch style={{flex:1, flexDirection:"row", alignSelf:"center", maxHeight:40}} onValueChange={(value) => this.no()} value={this.state.visibilitySwitch}/>
        <Text style={{flex:1, flexDirection:"row", color:"white", textAlign:"center", fontFamily:"Khula-Light", fontSize:16, maxHeight:80}}>only students can view this group</Text>
        <Text style={{flex:1, flexDirection:"row", color:"white", textAlign:"center", fontFamily:"Khula-Regular", fontSize:16, maxHeight:20}}>Accessibility</Text>
        <Switch style={{flex:1, flexDirection:"row", alignSelf:"center", maxHeight:40}}  onValueChange={(value) => {console.log("YOYOYOY")}} value={this.state.accessibilitySwitch} />
        <Text style={{flex:1, flexDirection:"row", color:"white", textAlign:"center", fontFamily:"Khula-Light", fontSize:16, maxHeight:150}}>anyone can join this group</Text>
        <TouchableWithoutFeedback style={{flex:1, flexDirection:"row"}} onPress={() => this.no}>
            <Text style={[styles.headerTextDiscover, {color:"white", textAlign:"right", textAlignVertical:"top",fontSize:16, marginRight:12, marginTop:0, marginBottom:10}]}>Continue</Text>
        </TouchableWithoutFeedback>

    </View>
    );
    }
}

/************************************************************************* 
 * SettingsNavContent
 * 
 * This is the content for the subnav on the settings page
 * 
 * TODO for some reason this wont work
 * (FIXME)
 *************************************************************************/
class SettingsNavContent extends React.Component{
    constructor(props){
        super(props);
        this.state = {
            eventDescription:"",
            howToReproduceIssue:""
        }
    }
    render(){
    return(
    <View style={{flex:1, flexDirection:"column", minHeight: 350, backgroundColor:"black"}}>
        {/* TODO finish */}
        <Text style={[styles.eventItemText, {flex:1, flexDirection:"row", fontSize: 20, marginTop:0}]}>Describe What Happened</Text>
        <TextInput style={{flex:2, flexDirection:"row", color:"white", width: 380, borderColor: 'gray', borderWidth: 1, marginLeft:10, borderRadius:5}} onChangeText={(text2) => this.setState({eventDescription: text2})} />
        <Text style={[styles.eventItemText, {flex:1, flexDirection:"row", fontSize: 20}]}>Provide steps to reproduce the issue.</Text>
        <TextInput style={{flex:2, flexDirection:"row", color:"white", width:380, borderColor: 'gray', borderWidth: 1, marginLeft:10, borderRadius:5}} onChangeText={(text) => this.setState({howToReproduceIssue:text})} value={"maximum 1000 characters"}/>
        <View style={{flex:2, flexDirection:"row"}}>
            <TouchableOpacity  style={{flex:4, flexDirection:"column"}}>
                <View style={{flex:1, flexDirection:"row"}}>
                <Ionicons name="ios-attach" style={[styles.clipSendIcon, {flex: 1, flexDirection:"column", textAlign:"left", marginLeft:10, maxWidth:30}]}/>
                <Text style={[styles.eventItemText, {fontSize: 20, flex:3, flexDirection:"column", textAlign:"left", lineHeight:26, minHeight:50, minWidth:200}]}>Attach a Screenshot</Text>
                </View>
            </TouchableOpacity>
            <TouchableOpacity  style={{flex:1, flexDirection:"column"}}>
                <Ionicons name="ios-send" style={[styles.clipSendIcon, {lineHeight:55, marginRight:30}]}/>
            </TouchableOpacity>
        </View>
        
    </View>
    );
    }
}

function selectImage(){
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