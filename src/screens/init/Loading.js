import React from 'react';
import { View, InteractionManager, Text , Button} from "react-native";
import { connect } from "react-redux";
import MiniCalendar from "../../components/other/MiniCalendar";
import srcStore from "../../Store";


export default class Loading extends React.Component{
    constructor(props){
        super(props);
        this.state={
        }
    }
    testTestfucj(){
        console.log("hi state " + srcStore.getState().Global.butt);
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