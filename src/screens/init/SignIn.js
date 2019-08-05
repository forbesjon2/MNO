import React from 'react';
import {View, TouchableWithoutFeedback, Text , TouchableOpacity, TextInput, Keyboard, Alert} from "react-native";
import Store from "../../Store";
import {Ionicons} from '@expo/vector-icons';
import {styles} from "../../Styles";
import NavigationService from "../../navigation/NavigationService";



/*************************************************************************
 * Sign in screen that appears first if you're not signed in.
 * 
 * if you don't have an account, it redirects you to the school search
 * page which then redirects you to the sign up page
 *************************************************************************/
export default class SignIn extends React.Component{
    constructor(props){
        super(props);
        this.state={
            email:"Email",
            password:"Password",
            passwordEdited:false,
            emailEdited: false
        }
        //set safe area background
        Store.dispatch({type:"SET_SAFE_AREA_BACKGROUND", payload:"#ffffff"});
    }

    redirectSignUp(){
        NavigationService.navigate("SchoolSearch");
        
    }

    login(){
        if(!this.state.passwordEdited || !this.state.emailEdited) Alert.alert("Validation error", "Not all fields are filled out", [{text:"Ok"}])
        else console.log("SLATT");
    }

    render(){
    return(
    <View style={styles.signin_main}>
    <TouchableWithoutFeedback  onPress={()=> Keyboard.dismiss()}>
        <View>
        {/* Header */}
        <Text style={styles.signin_header}>Welcome back.</Text>
        <Text style={styles.signin_subHeader}>Sign in to continue</Text>
        <Text style={[styles.signin_subHeader, {marginBottom:60}]}>using our app</Text>


        {/* Text boxes */}
        <TextInput
            style={[styles.signin_textInput]}
            onChangeText={(text) => this.setState({email: text, emailEdited:true})}
            value={this.state.email} 
            numberOfLines={1}
            onEndEditing={() => [this.state.emailEdited ? null : this.setState({email:"Email"})]}
            onFocus={() =>{[this.state.emailEdited ? null : this.setState({email:""})]}}
            clearTextOnFocus={true}
            maxLength={80}/>

        <TextInput
            style={[styles.signin_textInput, {marginBottom:30}]}
            onChangeText={(text) => this.setState({password: text, passwordEdited:true})}
            value={this.state.password} 
            textContentType={"password"}
            secureTextEntry={this.state.passwordEdited}
            numberOfLines={1}
            onEndEditing={() => [this.state.passwordEdited ? null : this.setState({password:"Password"})]}
            onFocus={() =>{[this.state.passwordEdited ? null : this.setState({password:""})]}}
            clearTextOnFocus={true}
            maxLength={80}/>
        <TouchableOpacity style={styles.signin_button} onPress={() => this.login()}>
            <Text style={styles.signin_buttonText}>Login</Text>
            <Ionicons name={"ios-arrow-round-forward"} style={styles.signin_buttonIcon}/>
        </TouchableOpacity>
        

        {/* Footer */}
        <Text style={[styles.signin_footerText, {color:"black", opacity:0.7}]}>Don't have an account?</Text>
        <TouchableWithoutFeedback onPress={() => this.redirectSignUp()}>
            <Text style={[styles.signin_footerText, {color:"#CE2E7B"}]}>Sign up</Text>
        </TouchableWithoutFeedback>
        </View>
        </TouchableWithoutFeedback>
    </View>
    );        
}}