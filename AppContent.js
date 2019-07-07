import React from 'react';
import { View, Platform, SafeAreaView, Text, KeyboardAvoidingView} from "react-native";
import AppRoutes from "./src/navigation/AppRoutes";
import { connect } from "react-redux";
import Nav from "./src/components/BottomNav/Nav";
import Loading from "./src/screens/init/Loading";
import NavigationService from "./src/navigation/NavigationService";
import * as Font from 'expo-font';
class AppContent extends React.Component{
    constructor(props){
        super(props);
        this.state={
            
        }
    }
    componentDidMount(){
        const {loading} = this.props;
        //this loads all of the font families to be used in the app
        Font.loadAsync({
            'DidactGothic-Regular': require('./assets/fonts/DidactGothic-Regular.ttf'),
            //khula style fonts
            'Khula-Bold': require('./assets/fonts/Khula-Bold.ttf'),
            'Khula-ExtraBold': require('./assets/fonts/Khula-ExtraBold.ttf'),
            'Khula-Light': require('./assets/fonts/Khula-Light.ttf'),
            'Khula-Regular': require('./assets/fonts/Khula-Regular.ttf'),
            'Khula-SemiBold': require('./assets/fonts/Khula-SemiBold.ttf'),
            //Roboto style fonts
            'Roboto-Black': require('./assets/fonts/Roboto-Black.ttf'),
            'Roboto-BlackItalic': require('./assets/fonts/Roboto-BlackItalic.ttf'),
            'Roboto-Bold': require('./assets/fonts/Roboto-Bold.ttf'),
            'Roboto-BoldItalic': require('./assets/fonts/Roboto-BoldItalic.ttf'),
            'Roboto-Italic': require('./assets/fonts/Roboto-Italic.ttf'),
            'Roboto-Light': require('./assets/fonts/Roboto-Light.ttf'),
            'Roboto-LightItalic': require('./assets/fonts/Roboto-LightItalic.ttf'),
            'Roboto-Medium': require('./assets/fonts/Roboto-Medium.ttf'),
            'Roboto-MediumItalic': require('./assets/fonts/Roboto-MediumItalic.ttf'),
            'Roboto-Regular': require('./assets/fonts/Roboto-Regular.ttf'),
            'Roboto-Thin': require('./assets/fonts/Roboto-Thin.ttf'),
            'Roboto-ThinItalic': require('./assets/fonts/Roboto-ThinItalic.ttf'),
          });
    }
    render(){
    const {navState} = this.state;
    const {loading} = this.props;
    // This is the view that holds all of the content (both the main screens + nav and the left menu)
    //FIXME I disabled loading
    if(loading){
        return(<Loading />);
    }else{
        if(Platform.OS === 'ios'){
            return(
                <SafeAreaView style={{flex:1}}>
            <KeyboardAvoidingView style={{flex: 1}} behavior={"height"}>
                {/* View that holds all of the main screens + nav */}
                <AppRoutes
                ref={navigatorRef => {NavigationService.setTopLevelNavigator(navigatorRef);}}
                style={{flex: 1}}/>
                <Nav navigationProp={navState}/>
            </KeyboardAvoidingView>
            </SafeAreaView>);
        }else{
        return(
            <View style={{flex: 1, paddingTop:30}}>
                {/* View that holds all of the main screens + nav */}
                <AppRoutes
                ref={navigatorRef => {NavigationService.setTopLevelNavigator(navigatorRef);}}
                style={{flex: 1}}/>
                <Nav navigationProp={navState}/>
            </View>
        );
        }
    }
    }
}


const mapStateToProps = (store) => ({
    loading: store.Global.loading,
});

const apcScreen = connect(mapStateToProps)(AppContent);
export default apcScreen;