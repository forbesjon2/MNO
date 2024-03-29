import React from 'react';
import { View, TouchableWithoutFeedback, Text , TouchableOpacity, TextInput, Keyboard, Alert} from "react-native";
import Store from "../../Store";
import {Ionicons} from '@expo/vector-icons';
import {styles} from "../../Styles";
import BareComponents from "../../components/other/BareComponents";
import {createAccount} from "../../Networking";

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
            components: new BareComponents(),
            email:"Email",
            username:"Username",
            password:"Password",
            confirmPassword:"Confirm Password",
            signUpButtonText: "Sign up",
            signUpButtonActive: true,

            //tracks whether or not the fields are edited (used for better UX principles)
            emailEdited: false,
            usernameEdited: false,
            passwordEdited: false,
            confirmPasswordEdited: false,

            //set the border color red if user input is invalid
            emailValid:true,
            usernameValid:true,
            passwordValid:true,
            confirmPasswordValid:true,
        }
        //set safe area background
        Store.dispatch({type:"SET_SAFE_AREA_BACKGROUND", payload:"#ffffff"});
    }

    /*************************************************************************
     * Run every time a character is typed into the 'Password' or 
     * 'ConfirmPassword' text input fields. 
     * 
     * What it does is provide a better user experience by notifing the user
     * (by means of a red border color) whether or not their passwords match
     * or fulfill the minimum requirements of 8 char's w/ one letter
     *************************************************************************/
    passwordLogic(text, isConfirmPassword){
        const {password, passwordEdited, components} = this.state;
        if(isConfirmPassword){
            this.setState({confirmPassword: text, confirmPasswordEdited:true});

            if(passwordEdited && text != password) this.setState({confirmPasswordValid:false});
            else if(passwordEdited && text == password && components.passwordMatchFunction(password)) {
                this.setState({confirmPasswordValid:true, passwordValid:true});
            }
        }else{
            this.setState({password: text, passwordEdited:true})    
            if(components.passwordMatchFunction(text)) this.setState({passwordValid: true});
            else this.setState({passwordValid:false});
        }
    }

    /*************************************************************************
     * This provides all of the necessary validations locally before sending 
     * a request to the server to perform account creation operations. 
     * 
     * Of course the server also performs most of these validations. It would 
     * be a very bad idea for it not to.
     * 
     * It begins by checking that all forms have been edited. Alerts if one isn't
     * 
     * Next it continues the validation process by checking that the email matches
     * any one of the list of valid mail domains
     * 
     * Then it checks that the password & confirmPassword matches.
     * 
     * Finally it checks that both the password & confirmPassword fields
     * have at least 8 characters and a number
     *************************************************************************/
    redirectSignUp(){
        const {email, username, password, confirmPassword, components, emailEdited, usernameEdited, passwordEdited, confirmPasswordEdited} = this.state;
        const {navigation} = this.props;
        this.setState({signUpButtonText: "Loading...", signUpButtonActive:false});

        if(!emailEdited || !usernameEdited || !passwordEdited || !confirmPassword) {
            Alert.alert("Validation error", "At least one field is not filled out",[{text:"ok"}]);
            this.setState({signUpButtonText: "Sign up", signUpButtonActive:true});
            return;
        }


        var emailArray = navigation.getParam("valid_mail_domains").toString().split(",");
        var emailMatches = false;
        for(let i in emailArray) if(components.simpleMatchFunction(emailArray[i], email)) emailMatches = true;
        if(!emailMatches){
            Alert.alert("Validation error", "Email does not match the list of valid mail domains for this group");
            this.setState({emailValid:false, signUpButtonText: "Sign up", signUpButtonActive:true});
            return;
        }

        
        
        //if the password & confirmPassword don't match
        if(password != confirmPassword){
            Alert.alert("Validation error", "Passwords don't match", [{text:"ok"}]);
            this.setState({passwordValid:false, confirmPasswordValid:false, signUpButtonText: "Sign up", signUpButtonActive:true});
            return;
        }else if(components.passwordMatchFunction(password) == false || components.passwordMatchFunction(password) == false){
            Alert.alert("Validation error", "Password doesn't meet the minimum requirements", [{text:"ok"}]);
            this.setState({signUpButtonText: "Sign up", signUpButtonActive:true});
            return;
        }
        var group_id = navigation.getParam("group_id").toString();
        if(navigation.getParam("group_id").toString().length < 3){
            Alert.alert("Validation error", "invalid group id", [{text:"ok"}]);
            this.setState({signUpButtonText: "Sign up", signUpButtonActive:true});
            return;
        }
        //will set redux session token and account info
        createAccount(email, username, group_id, password).then((message) => {
            this.props.navigation.navigate("ValidateEmail", {group_id:group_id});
        }).catch((err) => {
            Alert.alert("Create account error", err);
            this.setState({signUpButtonText: "Sign up", signUpButtonActive:true});
        });
    }

    render(){
    const {navigation} = this.props;
    const {emailValid, usernameValid, passwordValid, confirmPasswordValid, signUpButtonText, signUpButtonActive} = this.state;
    var emailBorder = [emailValid ? "black" : "red"];
    var usernameBorder = [usernameValid ? "black" : "red"];
    var passwordBorder = [passwordValid ? "black" : "red"];
    var confirmPasswordBorder = [confirmPasswordValid ? "black" : "red"];
    var signUpButtonOpacity = Number([signUpButtonActive ? 1.0 : 0.7]);
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
            style={[styles.signup_textInput, {borderBottomColor: emailBorder}]}
            onChangeText={(text) => this.setState({email: text, emailEdited:true})}
            value={this.state.email} 
            numberOfLines={1}
            textContentType={"emailAddress"}
            onEndEditing={()=>[this.state.emailEdited ? null : this.setState({email:"Email"})]}
            onFocus={() =>{[this.state.email == "Email" ? this.setState({email:""}) :null]}}
            clearTextOnFocus={true}
            maxLength={80}/>

        <TextInput
            style={[styles.signup_textInput, {borderBottomColor:usernameBorder}]}
            onChangeText={(text) => this.setState({username: text, usernameEdited:true})}
            value={this.state.username} 
            numberOfLines={1}
            onEndEditing={()=>[this.state.usernameEdited ? null : this.setState({username:"Username"})]}
            onFocus={() =>{[this.state.username == "Username" ? this.setState({username:""}) :null]}}
            clearTextOnFocus={true}
            maxLength={80}/>

        <TextInput
            style={[styles.signup_textInput, {borderBottomColor:passwordBorder}]}
            onChangeText={(text) => this.passwordLogic(text, false)}
            value={this.state.password} 
            textContentType={"newPassword"}
            secureTextEntry={this.state.passwordEdited}
            numberOfLines={1}
            onEndEditing={()=>[this.state.password ? null : this.setState({password:"Password"})]}
            onFocus={() =>{[this.state.password == "Password" ? this.setState({password:""}) :null]}}
            clearTextOnFocus={true}
            maxLength={80}/>
        <TextInput
            style={[styles.signup_textInput, {marginBottom:30, marginTop:20, borderBottomColor:confirmPasswordBorder}]}
            onChangeText={(text) => this.passwordLogic(text, true)}
            value={this.state.confirmPassword}
            textContentType={"newPassword"}
            secureTextEntry={this.state.confirmPasswordEdited}  
            numberOfLines={1}
            onEndEditing={()=>[this.state.confirmPasswordEdited ? null : this.setState({confirmPassword:"Confirm Password"})]}
            onFocus={() =>{[this.state.confirmPassword == "Confirm Password" ? this.setState({confirmPassword:""}) :null]}}
            clearTextOnFocus={true}
            maxLength={80}/>
            <Text style={[styles.signup_subHeader, {marginBottom:5}]}>Minimum length 8 characters, must include a number</Text>
        <TouchableOpacity style={styles.signup_button} onPress={() => this.redirectSignUp()}>
            <Text style={[styles.signup_buttonText, {opacity: signUpButtonOpacity}]}>{signUpButtonText}</Text>
            <Ionicons name={"ios-arrow-round-forward"} style={styles.signup_buttonIcon}/>    
        </TouchableOpacity>
        
        {/* Footer */}
        <Text style={[styles.signup_footerText, {color:"black", opacity:0.7}]}>Already have an account?</Text>
        <TouchableWithoutFeedback onPress={() => navigation.navigate("SignIn")}>
            <Text style={[styles.signup_footerText, {color:"#CE2E7B"}]}>Sign in</Text>
        </TouchableWithoutFeedback>
    </View>
    </TouchableWithoutFeedback>
    );        
}}