import React from 'react';
import { View, InteractionManager, Text , Button} from "react-native";
import { connect } from "react-redux";
import MiniCalendar from "../../components/other/MiniCalendar";
class Loading extends React.Component{
    constructor(props){
        super(props);
        this.state={
        }
    }
    componentDidMount(){
        this.props.dispatch({type:"INIT"});
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

const mapStateToProps = (store) => ({
    showNav: store.Global.loading,
});

const loadingScreen = connect(mapStateToProps)(Loading);
export default loadingScreen;