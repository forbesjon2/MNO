import React from 'react';
import {Text, View} from 'react-native';
import { connect } from "react-redux";


//_____________________________Account Settings___________________________
class Language extends React.Component{
    static navigationOptions = ({navigation}) => ({
        title: "Language"
    });
    constructor(props){
        super(props);
    }
    render(){
        return(
            <View style={{flex: 1}}>
            <Text style={{flex: 1}}>Language Screen</Text>
                

            </View>
        );
    }
}




class BlockedAccounts extends React.Component{
    constructor(props){
        super(props);
    }
    render(){
        return(
            <View style={{flex: 1}}>
                <Text style={{flex: 1}}>BlockedAccounts Screen</Text>


            </View>
        );
    }
}




class Password extends React.Component{
    constructor(props){
        super(props);
    }
    render(){
        return(
            <View style={{flex: 1}}>
                <Text style={{flex: 1}}>Password Screen</Text>


            </View>
        );
    }
}




class Payments extends React.Component{
    constructor(props){
        super(props);
    }
    render(){
        return(
            <View style={{flex: 1}}>
                <Text style={{flex: 1}}>Payments Screen</Text>


            </View>
        );
    }
}




class SearchHistory extends React.Component{
    constructor(props){
        super(props);
    }
    render(){
        return(
            <View style={{flex: 1}}>
                <Text>SearchHistory Screen</Text>


            </View>
        );
    }
}




class SwitchTutor extends React.Component{
    constructor(props){
        super(props);
    }
    render(){
        return(
            <View style={{flex: 1}}>
                <Text style={{flex: 1}}>SwitchTutor Screen</Text>


            </View>
        );
    }
}




class Verify extends React.Component{
    constructor(props){
        super(props);
    }
    render(){
        return(
            <View style={{flex: 1}}>
                <Text style={{flex: 1}}>Verify Screen</Text>


            </View>
        );
    }
}




class AccountPrivacy extends React.Component{
    constructor(props){
        super(props);
    }
    render(){
        return(
            <View style={{flex: 1}}>
                <Text style={{flex: 1}}>AccountPrivacy Screen</Text>


            </View>
        );
    }
}



//_____________________________Notifications Settings________________________
class PushNotifications extends React.Component{
    constructor(props){
        super(props);
    }
    render(){
        return(
            <View style={{flex: 1}}>
                <Text style={{flex: 1}}>Push notifications Screen</Text>


            </View>
        );
    }
}



class EmailNotifications extends React.Component{
    constructor(props){
        super(props);
    }
    render(){
        return(
            <View style={{flex: 1}}>
                <Text style={{flex: 1}}>email notifications Screen</Text>


            </View>
        );
    }
}


//_____________________________Support Settings________________________
class ReportBug extends React.Component{
    constructor(props){
        super(props);
    }
    render(){
        return(
            <View style={{flex: 1}}>
                <Text style={{flex: 1}}>Report Bug Screen</Text>


            </View>
        );
    }
}



class ResolveIssue extends React.Component{
    constructor(props){
        super(props);
    }
    render(){
        return(
            <View style={{flex: 1}}>
                <Text style={{flex: 1}}>Resolve Issue Screen</Text>


            </View>
        );
    }
}

export{
    Language,
    BlockedAccounts,
    Password,
    Payments,
    SearchHistory,
    SwitchTutor,
    Verify,
    AccountPrivacy,
    PushNotifications,
    EmailNotifications,
    ReportBug,
    ResolveIssue,
};