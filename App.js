import React from 'react';
import { View, Platform, SafeAreaView, Text, KeyboardAvoidingView} from "react-native";
import NavigationService from "./src/navigation/NavigationService";
import Store from "./src/Store";
import AppRoutes from "./src/navigation/AppRoutes";
import Nav from "./src/components/Nav";


export default function App() {
  if(Platform.OS === 'ios'){
    return(
    <SafeAreaView style={{flex:1, backgroundColor:Store.getState().Global.safeAreaBackground}}>
        <KeyboardAvoidingView style={{flex: 1}} behavior={"height"}>
            <AppRoutes
            ref={navigatorRef => {NavigationService.setTopLevelNavigator(navigatorRef);}}
            style={{flex: 1}}/>
            <Nav />
    </KeyboardAvoidingView>
    </SafeAreaView>);
}else{
    return(
    <View style={{flex: 1, paddingTop:30, backgroundColor:Store.getState().Global.safeAreaBackground}}>
        <KeyboardAvoidingView style={{flex: 1}} behavior={"height"}>
            <AppRoutes
            ref={navigatorRef => {NavigationService.setTopLevelNavigator(navigatorRef);}}
            style={{flex: 1}}/>
            <Nav />
        </KeyboardAvoidingView>
    </View>       
    );
    }
}