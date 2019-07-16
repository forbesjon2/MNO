import React from 'react';
import { View, TouchableWithoutFeedback, Text , TouchableOpacity, TextInput} from "react-native";
import { connect } from "react-redux";
import {Ionicons} from '@expo/vector-icons';
import {styles} from "../../Styles";


/*************************************************************************
 * This is the sign in screen
 * 
 *************************************************************************/
class SignIn extends React.Component{
    constructor(props){
        super(props);
        this.state={
            login:"Login",
            password:"Password"
        }
        
        //set safe area background
        this.props.dispatch({type:"SET_SAFE_AREA_BACKGROUND", payload:"#ffffff"});
    }

    redirectSignUp(){
    }

    render(){
    return(
    <View style={styles.signin_main}>

        {/* Header */}
        <Text style={styles.signin_header}>Welcome back.</Text>
        <Text style={styles.signin_subHeader}>Sign in to continue</Text>
        <Text style={[styles.signin_subHeader, {marginBottom:60}]}>using our app</Text>


        {/* Text boxes */}
        <TextInput
            style={[styles.signin_textInput]}
            onChangeText={(text) => this.setState({login: text})}
            value={this.state.login} 
            selectionColor={"black"}
            numberOfLines={1}
            onFocus={() =>{[this.state.login == "Login" ? this.setState({login:""}) :null]}}
            clearTextOnFocus={true}
            maxLength={80}/>

        <TextInput
            style={[styles.signin_textInput, {marginBottom:30}]}
            onChangeText={(text) => this.setState({password: text})}
            value={this.state.password} 
            textContentType={"password"}
            selectionColor={"black"}
            secureTextEntry={true}
            numberOfLines={1}
            onFocus={() =>{[this.state.password == "Password" ? this.setState({password:""}) :null]}}
            clearTextOnFocus={true}
            maxLength={80}/>
        <TouchableOpacity style={styles.signin_button}>
            <Text style={styles.signin_buttonText}>Login</Text>
            <Ionicons name={"ios-arrow-round-forward"} style={styles.signin_buttonIcon}/>
        </TouchableOpacity>
        

        {/* Footer */}
        <Text style={[styles.signin_footerText, {color:"black", opacity:0.7}]}>Don't have an account?</Text>
        <TouchableWithoutFeedback onPress={() => this.redirectSignUp()}>
            <Text style={[styles.signin_footerText, {color:"#CE2E7B"}]}>Sign up</Text>
        </TouchableWithoutFeedback>
    </View>
    );        
}}



const mapStateToProps = (store) => ({
});

const signInScreen = connect(mapStateToProps)(SignIn);
export default signInScreen;