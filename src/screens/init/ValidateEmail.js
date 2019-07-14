import React from 'react';
import { View, TouchableWithoutFeedback, Text , TouchableOpacity, StyleSheet, TextInput} from "react-native";
import { connect } from "react-redux";
import {Ionicons} from '@expo/vector-icons';



/*************************************************************************
 * This is the sign in screen
 * 
 *************************************************************************/
class SignIn extends React.Component{
    constructor(props){
        super(props);
        this.state={
        }
    }

    redirectSignUp(){
    }

    render(){
    return(
    <View style={styles.main}>

        {/* Header */}
        <Text style={styles.header}>Enter your email to .</Text>
        <Text style={styles.subHeader}>Sign in to continue</Text>
        <Text style={[styles.subHeader, {marginBottom:60}]}>using our app</Text>


        {/* Text boxes */}
        <TextInput
            style={[styles.textInput]}
            onChangeText={(text) => this.setState({login: text})}
            value={this.state.login} 
            selectionColor={"black"}
            numberOfLines={1}
            onFocus={() =>{[this.state.login == "Login" ? this.setState({login:""}) :null]}}
            clearTextOnFocus={true}
            maxLength={80}/>

        <TextInput
            style={[styles.textInput, {marginBottom:30}]}
            onChangeText={(text) => this.setState({password: text})}
            value={this.state.password} 
            textContentType={"password"}
            selectionColor={"black"}
            secureTextEntry={true}
            numberOfLines={1}
            onFocus={() =>{[this.state.password == "Password" ? this.setState({password:""}) :null]}}
            clearTextOnFocus={true}
            maxLength={80}/>
        <TouchableOpacity style={styles.button}>
            <Text style={styles.buttonText}>Login</Text>
            <Ionicons name={"ios-arrow-round-forward"} style={styles.buttonIcon}/>
        </TouchableOpacity>
        

        {/* Footer */}
        <Text style={[styles.footerText, {color:"black", opacity:0.7}]}>Don't have an account?</Text>
        <TouchableWithoutFeedback onPress={() => this.redirectSignUp()}>
            <Text style={[styles.footerText, {color:"#CE2E7B"}]}>Sign up</Text>
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
        marginTop:50,
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

const signInScreen = connect(mapStateToProps)(SignIn);
export default signInScreen;