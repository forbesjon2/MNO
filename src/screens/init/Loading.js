import React from 'react';
import { View, Text , Button} from "react-native";
import Store from "../../Store";


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
        // srcStore.dispatch({type:"INIT"});
    }
    render(){
    
    return(
    <View style={{flex:1, backgroundColor:"black", marginTop:30}}>
        <Text>Loading screen</Text>
        <Button onPress={() => Store.dispatch({type:"SET_LOADED"})} title="set loaded"/>
        {/* <MiniCalendar /> */}
    </View>
    );        
}
}