import React from 'react';
import { View, TouchableWithoutFeedback, Text , TouchableOpacity, StyleSheet, TextInput} from "react-native";
import { connect } from "react-redux";
import {Ionicons} from '@expo/vector-icons';
import GroupView from "../../components/other/GroupView";

/*************************************************************************
 * This is the sign in screen
 * 
 *************************************************************************/
class SchoolSearch extends React.Component{
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
        <Text style={styles.header}>Search for your school.</Text>
        <Text style={[styles.subHeader, {marginBottom:60}]}>6 schools available</Text>
        <GroupView color={"66.54.138"} />

    </View>
    );        
}}




const styles = StyleSheet.create({
    main:{
        flex:1,
        flexDirection:"column",
        backgroundColor:"#42368A",
        padding:20
    },
    header:{
        fontFamily:"DidactGothic-Regular",
        fontSize:38,
        color:"white",
        marginTop:40,
        marginBottom:8
    },
    subHeader:{
        fontFamily:"Roboto-Light",
        fontSize:18,
        color:"white",
        opacity:0.7,
        lineHeight:19,
    }
})


const mapStateToProps = (store) => ({
});

const schoolSearchScreen = connect(mapStateToProps)(SchoolSearch);
export default schoolSearchScreen;