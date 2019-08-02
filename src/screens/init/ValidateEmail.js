import React from 'react';
import { View, TouchableWithoutFeedback, AsyncStorage, Text , TouchableOpacity, TextInput} from "react-native";
import { connect } from "react-redux";
import {Ionicons} from '@expo/vector-icons';
import {styles} from "../../Styles";
const {test} = require("../../Networking");

/*************************************************************************
 * This is the sign in screen
 * 
 *************************************************************************/
class SignIn extends React.Component{
    constructor(props){
        super(props);
        this.state={
            email:"enter your email"
        }
    }

    storeData = async () =>{
        try{
            await AsyncStorage.setItem("test", "testVal2ue");
        }catch(e){
            console.log(e);
        }
    }

    ttest(){
        test();
    }


    getData = async() =>{
        try{
            const value = await AsyncStorage.getItem("test");
            if(value != null){
                console.log(value);
            }
        }catch(e){
            console.log(e);
        }
    }


    render(){
    return(
    <View style={styles.validateemail_main}>

        {/* Header */}
        <Text style={styles.validateemail_header}>Enter your email to validate.</Text>
        <Text style={[styles.validateemail_subHeader, {marginBottom:10}]}>Valid email subdomains for University of Nebraska Lincoln are</Text>
        <Text style={styles.validateemail_subHeader}>@unl.edu</Text>
        <Text style={[styles.validateemail_subHeader, {marginBottom:10}]}>@huskers.unl.edu</Text>
        <Text style={[styles.validateemail_subHeader, {marginBottom:30}]}>You can validate later by visiting the validate email menu in the settings</Text>


        {/* Text boxes */}
        <TextInput
            style={[styles.validateemail_textInput]}
            onChangeText={(text) => this.setState({email: text})}
            value={this.state.email} 
            autoCapitalize={"none"}
            onSubmitEditing={() => console.log("hit enter")}
            autoCorrect={false}
            textContentType={"emailAddress"}
            selectionColor={"black"}
            numberOfLines={1}
            onFocus={() =>{[this.state.email == "enter your email" ? this.setState({email:""}) :null]}}
            clearTextOnFocus={true}
            maxLength={80}/>

        <TouchableOpacity style={styles.validateemail_button} onPress={() => this.ttest()}>
            <Text style={styles.validateemail_buttonText}>Validate</Text>
            <Ionicons name={"ios-arrow-round-forward"} style={styles.validateemail_buttonIcon}/>
        </TouchableOpacity>
        

        {/* Footer */}
        <TouchableWithoutFeedback onPress={() => this.storeData()}>
            <Text style={[styles.validateemail_footerText, {color:"#CE2E7B"}]}>Validate later</Text>
        </TouchableWithoutFeedback>
    </View>
    );        
}}


const mapStateToProps = (store) => ({
});

const signInScreen = connect(mapStateToProps)(SignIn);
export default signInScreen;