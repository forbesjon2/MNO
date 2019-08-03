import React from 'react';
import { View, InteractionManager, Text , Button} from "react-native";
import { connect } from "react-redux";
import MiniCalendar from "../../components/other/MiniCalendar";
import srcStore from "../../Store";
const {test} = require("../../Networking");
import AsyncStorage from '@react-native-community/async-storage';

export default class Loading extends React.Component{
    constructor(props){
        super(props);
        this.state={
        }
    }
    testTestfucj(){
        test("AB");
    }
    componentDidMount(){
        srcStore.dispatch({type:"INIT"});
    }
    render(){
    
    return(
    <View style={{flex:1, backgroundColor:"black", marginTop:30}}>
        <Text>Loading screen</Text>
        <Button onPress={() => this.props.dispatch({type:"SET_LOADED"})} title="set loaded"/>
        {/* <MiniCalendar /> */}
    </View>
    );        
}
}