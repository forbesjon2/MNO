import React from 'react';
import { View, TouchableWithoutFeedback, Text , TouchableOpacity, TextInput} from "react-native";
import Store from "../../Store";
import {Ionicons} from '@expo/vector-icons';
import {styles} from "../../Styles";

const {groupSub} = require("../../Networking");

/*************************************************************************
 * This is the sign in screen
 * 
 *************************************************************************/
export default class ValidateEmail extends React.Component{
    constructor(props){
        super(props);
        this.state={
            email:"enter your email",
            sendEmail: true,
            statusMessage:"null"
        }
    }

    resendEmail(){
        if(!this.state.sendEmail) return;
        else this.validate();
        this.setState({sendEmail:false});
        setTimeout(() => {this.setState({sendEmail: true})}, 10000);
    }

    /*************************************************************************
     * gets various user account details using async/await. These functions are 
     * used in the validate function and include the following...
     * - getEmail
     * - getGroupID
     * - getUserID
     *************************************************************************/
    async getEmail(){
        let email = await Store.getState().Global.accountInfo["email"].toString();
        console.log(email.length);
        if(email.length < 3) return "Error: empty email field";
        else return email;
    }
    async getGroupID(){
        let group_id = await this.props.navigation.getParam("group_id").toString();
        if(group_id.length < 3) return "Error: no group selected";
        else return group_id;
    }
    async getUserID(){
        let user_id = await Store.getState().Global.accountInfo["user_id"].toString();
        if(user_id.length < 3) return "Error: account creation failed";
        else return user_id;
    }

    /*************************************************************************
     * Runs when componentWillMount runs.. it sets the status message
     * to different values dependent on the 
     *************************************************************************/
    async validate(){
        let currentTime = new Date();
        let email = await this.getEmail();
        if(email.includes("Error")){
            this.setState({statusMessage:email}); 
            return;
        }
        let group_id = await this.getGroupID();
        if(group_id.includes("Error")){
            this.setState({statusMessage:group_id}); 
            return;
        }
        let user_id = await this.getUserID();
        if(user_id.includes("Error")){
            this.setState({statusMessage:user_id}); 
            return;
        }
        console.log("user id is ", user_id);
        let msg = await groupSub(email, group_id, user_id);
        console.log(msg);
        this.setState({statusMessage:"Sent at " + currentTime.toLocaleTimeString()})
    }

    /*************************************************************************
     * Runs when the screen is loaded. Theres a delay to account for the delay
     * in storing the user's email from the last screen
     *************************************************************************/
    // sleep(ms) {return new Promise(resolve => setTimeout(resolve, ms));}
    componentWillMount(){
        var validate = this.validate();
        setTimeout(function(){
            validate();
        }, 800);
    }
    

    render(){
        let sendEmailColor = [this.state.sendEmail ? "blue" : "gray"];
        let sendEmailLine = [this.state.sendEmail ? "underline" : "none"][0];
    return(
    <View style={styles.validateemail_main}>

        {/* Header */}
        <Text style={[styles.validateemail_header, {fontSize:32}]}>Email verification</Text>
        <Text style={[styles.validateemail_subHeader]}>Follow the link sent to your email to </Text>
        <Text style={[styles.validateemail_subHeader, {marginBottom:30}]}>verify your email </Text>
        <Text style={[styles.validateemail_subHeader]}>The email should appear in less than 2 minutes. If you haven't recieved it, check your spam or ...</Text>
        <TouchableWithoutFeedback onPress={()=>this.resendEmail()}><Text style={[styles.validateemail_subHeader, {color:sendEmailColor, textDecorationLine:sendEmailLine}]}>send email again.</Text></TouchableWithoutFeedback>

        <TouchableOpacity style={styles.validateemail_button} onPress={() => this.checkIfValid()}>
            <Text style={styles.validateemail_buttonText}>check if verified</Text>
            <Ionicons name={"ios-arrow-round-forward"} style={styles.validateemail_buttonIcon}/>
        </TouchableOpacity>
        <Text style={[styles.validateemail_subHeader, {marginTop:30}]}>Status: {this.state.statusMessage}</Text>
    </View>
    );        
}
}