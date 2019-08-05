import React from 'react';
import { View, TouchableWithoutFeedback, Text , TouchableOpacity, TextInput, Keyboard} from "react-native";
import Store from "../../Store";
import {Ionicons} from '@expo/vector-icons';
import {styles} from "../../Styles";

/*************************************************************************
 * This is the sign up screen
 * 
 *************************************************************************/
export default class SignUp extends React.Component{
    static navigationOptions = ({navigation}) => ({
        header: null 
    });
    constructor(props){
        super(props);
        this.state={
            email:"Email",
            username:"Username",
            password:"Password",
            confirmPassword:"Confirm Password",
            emailEdited: false,
            usernameEdited: false,
            passwordEdited: false,
            confirmPasswordEdited: false
        }
        //set safe area background
        Store.dispatch({type:"SET_SAFE_AREA_BACKGROUND", payload:"#ffffff"});
    }

    redirectSignUp(){

    }

    render(){
    const {navigation} = this.props;
    var vmd = navigation.getParam("valid_mail_domains").toString().replace("@", "  @");
    return(
    <TouchableWithoutFeedback onPress={()=>Keyboard.dismiss()}>
    <View style={styles.signup_main} behavior="padding">
        
        {/* Header */}
        <Text style={styles.signup_header}>Welcome!</Text>
        <Text style={[styles.signup_subHeader, {marginBottom:10}]}>Sign up with a valid mail domain to continue</Text>
        <Text style={[styles.signup_subHeader, {marginBottom:30}]}>Valid domains include: {vmd}</Text>


        {/* Text boxes */}
        <TextInput
            style={[styles.signup_textInput]}
            onChangeText={(text) => this.setState({email: text, emailEdited:true})}
            value={this.state.email} 
            numberOfLines={1}
            textContentType={"emailAddress"}
            onEndEditing={()=>[this.state.emailEdited ? null : this.setState({email:"Email"})]}
            onFocus={() =>{[this.state.email == "Email" ? this.setState({email:""}) :null]}}
            clearTextOnFocus={true}
            maxLength={80}/>

        <TextInput
            style={[styles.signup_textInput]}
            onChangeText={(text) => this.setState({username: text, usernameEdited:true})}
            value={this.state.username} 
            numberOfLines={1}
            onEndEditing={()=>[this.state.usernameEdited ? null : this.setState({username:"Username"})]}
            onFocus={() =>{[this.state.username == "Username" ? this.setState({username:""}) :null]}}
            clearTextOnFocus={true}
            maxLength={80}/>

        <TextInput
            style={[styles.signup_textInput]}
            onChangeText={(text) => this.setState({password: text, passwordEdited: true})}
            value={this.state.password} 
            textContentType={"newPassword"}
            secureTextEntry={this.state.passwordEdited}
            numberOfLines={1}
            onEndEditing={()=>[this.state.password ? null : this.setState({password:"Password"})]}
            onFocus={() =>{[this.state.password == "Password" ? this.setState({password:""}) :null]}}
            clearTextOnFocus={true}
            maxLength={80}/>

        <TextInput
            style={[styles.signup_textInput, {marginBottom:30, marginTop:20}]}
            onChangeText={(text) => this.setState({confirmPassword: text, confirmPasswordEdited:true})}
            value={this.state.confirmPassword}
            textContentType={"newPassword"}
            secureTextEntry={this.state.confirmPasswordEdited}  
            numberOfLines={1}
            onEndEditing={()=>[this.state.confirmPasswordEdited ? null : this.setState({confirmPassword:"Confirm Password"})]}
            onFocus={() =>{[this.state.confirmPassword == "Confirm Password" ? this.setState({confirmPassword:""}) :null]}}
            clearTextOnFocus={true}
            maxLength={80}/>
        <TouchableOpacity style={styles.signup_button}>
            <Text style={styles.signup_buttonText}>Sign up</Text>
            <Ionicons name={"ios-arrow-round-forward"} style={styles.signup_buttonIcon}/>    
        </TouchableOpacity>
        
        {/* Footer */}
        <Text style={[styles.signup_footerText, {color:"black", opacity:0.7}]}>Already have an account?</Text>
        <TouchableWithoutFeedback onPress={() => this.redirectSignUp()}>
            <Text style={[styles.signup_footerText, {color:"#CE2E7B"}]}>Sign in</Text>
        </TouchableWithoutFeedback>
    </View>
    </TouchableWithoutFeedback>
    );        
}}