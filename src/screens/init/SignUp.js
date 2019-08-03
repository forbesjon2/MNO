import React from 'react';
import { View, TouchableWithoutFeedback, Text , TouchableOpacity, TextInput} from "react-native";
import Store from "../../Store";
import {Ionicons} from '@expo/vector-icons';
import {styles} from "../../Styles";

/*************************************************************************
 * This is the sign up screen
 * 
 *************************************************************************/
export default class SignUp extends React.Component{
    constructor(props){
        super(props);
        this.state={
            email:"Email",
            username:"Username",
            password:"Password",
            confirmPassword:"Confirm Password",
        }
        //set safe area background
        Store.dispatch({type:"SET_SAFE_AREA_BACKGROUND", payload:"#ffffff"});
    }

    redirectSignUp(){
    }

    render(){
    
    return(
    <View style={styles.signup_main}>

        {/* Header */}
        <Text style={styles.signup_header}>Welcome back.</Text>
        <Text style={styles.signup_subHeader}>Sign up to continue</Text>
        <Text style={[styles.signup_subHeader, {marginBottom:30}]}>using our app</Text>


        {/* Text boxes */}
        <TextInput
            style={[styles.signup_textInput]}
            onChangeText={(text) => this.setState({email: text})}
            value={this.state.email} 
            selectionColor={"black"}
            numberOfLines={1}
            onFocus={() =>{[this.state.email == "Email" ? this.setState({email:""}) :null]}}
            clearTextOnFocus={true}
            maxLength={80}/>

        <TextInput
            style={[styles.signup_textInput]}
            onChangeText={(text) => this.setState({username: text})}
            value={this.state.username} 
            selectionColor={"black"}
            numberOfLines={1}
            onFocus={() =>{[this.state.username == "Username" ? this.setState({username:""}) :null]}}
            clearTextOnFocus={true}
            maxLength={80}/>

        <TextInput
            style={[styles.signup_textInput]}
            onChangeText={(text) => this.setState({password: text})}
            value={this.state.password} 
            textContentType={"newPassword"}
            selectionColor={"black"}
            secureTextEntry={!(this.state.password == "Password")}
            numberOfLines={1}
            onFocus={() =>{[this.state.password == "Password" ? this.setState({password:""}) :null]}}
            clearTextOnFocus={true}
            maxLength={80}/>

        <TextInput
            style={[styles.signup_textInput, {marginBottom:30, marginTop:20}]}
            onChangeText={(text) => this.setState({confirmPassword: text})}
            value={this.state.confirmPassword} 
            textContentType={"newPassword"}
            selectionColor={"black"}
            secureTextEntry={!(this.state.confirmPassword == "Confirm Password")}  
            numberOfLines={1}
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
    );        
}}