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
            email:"enter your email"
        }
    }

    render(){
    return(
    <View style={styles.main}>

        {/* Header */}
        <Text style={styles.header}>Enter your email to validate.</Text>
        <Text style={[styles.subHeader, {marginBottom:10}]}>Valid email subdomains for University of Nebraska Lincoln are</Text>
        <Text style={styles.subHeader}>@unl.edu</Text>
        <Text style={[styles.subHeader, {marginBottom:10}]}>@huskers.unl.edu</Text>
        <Text style={[styles.subHeader, {marginBottom:30}]}>You can validate later by visiting the validate email menu in the settings</Text>


        {/* Text boxes */}
        <TextInput
            style={[styles.textInput]}
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

        <TouchableOpacity style={styles.button} onPress={() => console.log("validate email")}>
            <Text style={styles.buttonText}>Validate</Text>
            <Ionicons name={"ios-arrow-round-forward"} style={styles.buttonIcon}/>
        </TouchableOpacity>
        

        {/* Footer */}
        <TouchableWithoutFeedback onPress={() => this.redirectSignUp()}>
            <Text style={[styles.footerText, {color:"#CE2E7B"}]}>Validate later</Text>
        </TouchableWithoutFeedback>
    </View>
    );        
}}




const styles = StyleSheet.create({
    main:{
        flex:1,
        flexDirection:"column",
        backgroundColor:"white",
        marginLeft:20,
        marginRight:20,
        marginBottom:20
    },
    header:{
        fontFamily:"DidactGothic-Regular",
        fontSize:38,
        color:"black",
        marginTop:40,
        marginBottom:12
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
        height:40,
        width: 150,
        borderRadius: 10,
        flexDirection:"row",
        backgroundColor:"#CE2E7B",
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