import React from 'react';
import { View, KeyboardAvoidingView, Platform, Animated, Dimensions, StatusBar, Text, Easing} from "react-native";
import NavigationService from "./src/navigation/NavigationService";
import Store from "./src/Store";
import AppRoutes from "./src/navigation/AppRoutes";
import Nav from "./src/components/Nav";
import {connect} from 'react-redux';


class AppContent extends React.Component{
    constructor(props){
        super(props);
        this.state = {
            connectionView: new Animated.Value(-15),
            mainView: new Animated.Value(0)
        }
    }


    render(){
    const {connectionView, mainView} = this.state;
    var {isOpen} = this.props;
    var toValueSide = [isOpen ? -15 : 0];
    var toValueMain = [isOpen ? 0 : 15];
    Animated.timing(connectionView, {toValue: toValueSide,easing: Easing.back(),duration: 800}).start();
    Animated.timing(mainView, {toValue: toValueMain,easing: Easing.back(),duration: 800}).start();

    if(Platform.OS === 'ios'){
    return(
    <SafeAreaView style={{flex:1, backgroundColor:this.props.safeAreaBackground}}>
        {/*  */}
        <View style={{height:Dimensions.get("window").height, width:10, left: -10, backgroundColor:"blue"}}>
            <Text>Hi</Text>
        </View>
        <KeyboardAvoidingView style={{flex: 1}} behavior={"height"}>
            <AppRoutes
            ref={navigatorRef => {NavigationService.setTopLevelNavigator(navigatorRef);}}
            style={{flex: 1}}/>
            <Nav />
        </KeyboardAvoidingView>
    </SafeAreaView>);
    }else{
    return(

    <View style={{flex: 1, paddingTop:StatusBar.currentHeight, backgroundColor:this.props.safeAreaBackground}}>
        <KeyboardAvoidingView style={{flex: 1}} behavior={"height"}>
            <Animated.View style={{height:Dimensions.get("window").height, maxWidth:40, right:connectionView, backgroundColor:"blue", position:"absolute", flex:1, flexDirection:"column", justifyContent:"center", margin:0, padding:0}}>
                    <Text style={{transform:[{rotate:"90deg"}], fontSize:14, marginLeft:0, paddingLeft:0, left:0,minWidth:70,maxWidth:70,minHeight:20,maxHeight:20}}>Connected</Text>
            </Animated.View>
            <Animated.View style={{flex: 1, right:mainView}}>
                <AppRoutes ref={navigatorRef => {NavigationService.setTopLevelNavigator(navigatorRef);}}/>
                <Nav />
            </Animated.View>
        </KeyboardAvoidingView>
    </View>);}
    }
}

const mapStateToProps = (store) =>({
    safeAreaBackground: store.Global.safeAreaBackground,
    isOpen: store.Global.connectionView
});

const AppContentScreen = connect(mapStateToProps)(AppContent);
export default AppContentScreen;