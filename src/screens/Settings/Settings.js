import React from 'react';
import {Text, View, ScrollView, TouchableWithoutFeedback} from 'react-native';
import NavigationService from "../../navigation/NavigationService";
import { connect } from "react-redux";
import {styles} from "../../Styles";

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
            <View style={styles.settings_main}>      
                <ScrollView
                style={styles.settings_scroll}
                showsVerticalScrollIndicator={false}>

                    {/* Headers */}
                    <Text style={[{paddingTop: 10}, styles.settings_header]}>More</Text>
                    <Text style={styles.settings_header}>Mehr</Text>
                    <Text style={styles.settings_headerForeign}>더</Text>
                    <Text style={styles.settings_headerForeign}>更</Text>


                    {/* Accounts header */}
                    <Text style={[{paddingTop: 20},styles.settings_topicHeader]}>Account</Text>
                    
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
                    <Text style={[{paddingTop: 20},styles.settings_topicHeader]}>Notifications</Text>
                
                    {/* Notifications buttons */}
                    {generateButton("Push Notifications", false, "PushNotifications")}
                    {generateButton("Email Notifications", false, "EmailNotifications")}



                    {/* Support header */}
                    <Text style={[{paddingTop: 20},styles.settings_topicHeader]}>Support</Text>
                    
                    {/* Support buttons */}
                    {generateButton("Report a Bug", false, "ReportBug")}
                    {generateButton("Resolve an Issue", false, "ResolveIssue")}



                    {/* Logins header */}
                    <Text style={[{paddingTop: 20},styles.settings_topicHeader]}>Logins</Text>
                    
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
                <Text style={[styles.settings_buttonText, {color: "#00B5E0"}]}>{text}</Text>
            </TouchableWithoutFeedback>
        );
    }else{
        return(
            <TouchableWithoutFeedback
            onPress={() => NavigationService.navigate(navigateTo)}>
            <Text style={styles.settings_buttonText}>{text}</Text>
        </TouchableWithoutFeedback>
        );
    }
}


const mapStateToProps = (store) => ({
    
});

const settingsScreen = connect(mapStateToProps)(Settings);
export default settingsScreen;