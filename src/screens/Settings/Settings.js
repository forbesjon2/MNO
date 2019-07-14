import React from 'react';
import {Text, View, StyleSheet, ScrollView, TouchableWithoutFeedback} from 'react-native';
import NavigationService from "../../navigation/NavigationService";
import { connect } from "react-redux";

class Settings extends React.Component{
    static navigationOptions = ({navigation}) => ({
        title: "Settings",
        header: null,
    });
    constructor(props){
        super(props);
        //set safe area background
        this.props.dispatch({type:"SET_SAFE_AREA_BACKGROUND", payload:"#ffffff"});
    }
    
    render(){
        return(
            <View style={styles.main}>      
                <ScrollView
                style={styles.scroll}
                showsVerticalScrollIndicator={false}>

                    {/* Headers */}
                    <Text style={[{paddingTop: 10},styles.header]}>More</Text>
                    <Text style={styles.header}>Mehr</Text>
                    <Text style={styles.headerKorean}>더</Text>
                    <Text style={styles.headerChinese}>更</Text>


                    {/* Accounts header */}
                    <Text style={[{paddingTop: 20},styles.topicHeader]}>Account</Text>
                    
                    {/* Accounts buttons */}
                    {generateButton("Language", false, "Language")}
                    {generateButton("Blocked Accounts", false, "BlockedAccounts")}
                    {generateButton("Password", false, "Password")}
                    {generateButton("Payments", false, "Payments")}
                    {generateButton("Search History", false, "SearchHistory")}
                    {generateButton("Switch to Tutor Profile", false, "SwitchTutor")}
                    {generateButton("Verify Account", false, "Verify")}
                    {generateButton("Account Privacy", false, "AccountPrivacy")}



                    {/* Notifications header */}
                    <Text style={[{paddingTop: 20},styles.topicHeader]}>Notifications</Text>
                
                    {/* Notifications buttons */}
                    {generateButton("Push Notifications", false, "PushNotifications")}
                    {generateButton("Email Notifications", false, "EmailNotifications")}



                    {/* Support header */}
                    <Text style={[{paddingTop: 20},styles.topicHeader]}>Support</Text>
                    
                    {/* Support buttons */}
                    {generateButton("Report a Bug", false, "ReportBug")}
                    {generateButton("Resolve an Issue", false, "ResolveIssue")}



                    {/* Logins header */}
                    <Text style={[{paddingTop: 20},styles.topicHeader]}>Logins</Text>
                    
                    {/* Logins buttons */}
                    {generateButton("Log out of null", true, "Home")}
                    {/* {generateButton("Resolve an Issue", false, "ResolveIssue", this.props.navigation)} */}

                </ScrollView>
            </View>
            
        );
    }
};



function generateButton(text, isBlue, navigateTo){
    if(isBlue){
        return(
            <TouchableWithoutFeedback
            onPress={() => NavigationService.navigate(navigateTo)}>
                <Text style={[styles.buttonText, {color: "#00B5E0"}]}>{text}</Text>
            </TouchableWithoutFeedback>
        );
    }else{
        return(
            <TouchableWithoutFeedback
            onPress={() => NavigationService.navigate(navigateTo)}>
            <Text style={styles.buttonText}>{text}</Text>
        </TouchableWithoutFeedback>
        );
    }
}

const styles = StyleSheet.create({
    main:{
        flex: 1,
        flexDirection: "column",
    },
    buttonText:{
        fontSize: 21,
        fontFamily:"Roboto-Regular",
        color: "black", 
        lineHeight: 48,       
    },
    topicHeader:{
        fontSize: 52,
        fontFamily:"Roboto-Regular",
        color: "black",
    },
    header:{
        fontSize: 56,
        fontFamily:"DidactGothic-Regular",
        color: "black",
        lineHeight: 50,
    },
    headerKorean:{
        // fontFamily:"NM",
        fontSize: 54,
        color:"black",
        lineHeight: 65,
    },
    headerChinese:{
        // fontFamily:"NM",
        fontSize: 54,
        color:"black",
        lineHeight: 65,
    },
    scroll:{
        flex: 20,
        paddingLeft: 20,
        paddingRight: 20,
        flexDirection: "column",
    },
    nav:{
        height: 50,
    }
});


const mapStateToProps = (store) => ({
    
});

const settingsScreen = connect(mapStateToProps)(Settings);
export default settingsScreen;