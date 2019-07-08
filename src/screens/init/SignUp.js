import React from 'react';
import { View, TouchableWithoutFeedback, Text , TouchableOpacity, StyleSheet, TextInput} from "react-native";
import { connect } from "react-redux";
import {Ionicons} from '@expo/vector-icons';


/*************************************************************************
 * This is the sign up screen
 * 
 *************************************************************************/
class SignUp extends React.Component{
    constructor(props){
        super(props);
        this.state={
            email:"Email",
            username:"Username",
            password:"Password",
            confirmPassword:"Confirm Password",
        }
    }

    redirectSignUp(){
    }

    render(){
    
    return(
    <View style={styles.main}>

        {/* Header */}
        <Text style={styles.header}>Welcome back.</Text>
        <Text style={styles.subHeader}>Sign up to continue</Text>
        <Text style={[styles.subHeader, {marginBottom:30}]}>using our app</Text>


        {/* Text boxes */}
        <TextInput
            style={[styles.textInput]}
            onChangeText={(text) => this.setState({email: text})}
            value={this.state.email} 
            selectionColor={"black"}
            numberOfLines={1}
            onFocus={() =>{[this.state.email == "Email" ? this.setState({email:""}) :null]}}
            clearTextOnFocus={true}
            maxLength={80}/>

        <TextInput
            style={[styles.textInput]}
            onChangeText={(text) => this.setState({username: text})}
            value={this.state.username} 
            selectionColor={"black"}
            numberOfLines={1}
            onFocus={() =>{[this.state.username == "Username" ? this.setState({username:""}) :null]}}
            clearTextOnFocus={true}
            maxLength={80}/>

        <TextInput
            style={[styles.textInput]}
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
            style={[styles.textInput, {marginBottom:30, marginTop:20}]}
            onChangeText={(text) => this.setState({confirmPassword: text})}
            value={this.state.confirmPassword} 
            textContentType={"newPassword"}
            selectionColor={"black"}
            secureTextEntry={!(this.state.confirmPassword == "Confirm Password")}  
            numberOfLines={1}
            onFocus={() =>{[this.state.confirmPassword == "Confirm Password" ? this.setState({confirmPassword:""}) :null]}}
            clearTextOnFocus={true}
            maxLength={80}/>
        <TouchableOpacity style={styles.button}>
            <Text style={styles.buttonText}>Sign up</Text>
            <Ionicons name={"ios-arrow-round-forward"} style={styles.buttonIcon}/>    
        </TouchableOpacity>
        
        {/* Footer */}
        <Text style={[styles.footerText, {color:"black", opacity:0.7}]}>Already have an account?</Text>
        <TouchableWithoutFeedback onPress={() => this.redirectSignUp()}>
            <Text style={[styles.footerText, {color:"#CE2E7B"}]}>Sign in</Text>
        </TouchableWithoutFeedback>
    </View>
    );        
}}




const styles = StyleSheet.create({
    main:{
        flex:1,
        flexDirection:"column",
        backgroundColor:"white",
        margin:20
    },
    header:{
        fontFamily:"DidactGothic-Regular",
        fontSize:38,
        color:"black",
        marginTop:40,
        marginBottom:8
    },
    subHeader:{
        fontFamily:"DidactGothic-Regular",
        fontSize:18,
        color:"gray",
        lineHeight:19,
    },
    textInput:{
        marginTop:40,
        minWidth:270,
        maxWidth:270,
        color: "black",
        fontFamily:"Khula-Regular",
        fontSize: 20,
        margin:0,
        padding:0,
        textAlignVertical:"bottom",
        borderBottomWidth:1,
        borderBottomColor:"gray"
    },
    button:{
        height:48,
        width: 180,
        borderRadius: 10,
        flexDirection:"row",
        backgroundColor:"#CE2E7B",
        marginLeft:20,
        marginTop:20,
        marginBottom:70
    },
    buttonText:{
        flex:1,
        fontFamily:"DidactGothic-Regular",
        fontSize:18,
        flexDirection:"column",
        color:"white",
        alignSelf:"center",
        marginLeft:20
    },
    buttonIcon:{
        alignSelf:"center",
        color:"white",
        fontSize:40,
        marginRight:20,
    },
    footerText:{
        fontFamily:"DidactGothic-Regular",
        fontSize:18
    }
})


const mapStateToProps = (store) => ({
});

const signUpScreen = connect(mapStateToProps)(SignUp);
export default signUpScreen;