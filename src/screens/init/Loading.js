import React from 'react';
import {View, Text, Button} from "react-native";
import Store from "../../Store";
import * as Font from 'expo-font';
const {loadFromStore, ping, readAndPrint, nukeStore} = require("../../Networking");
import NavigationService from "../../navigation/NavigationService";





export default class Loading extends React.Component{
    constructor(props){
        super(props);
        this.state={
            text:"Loading"
        }
    }
    
    async loadFontAsync (){
        return Promise.all([
            Font.loadAsync({
                'DidactGothic-Regular': require('../../../assets/fonts/DidactGothic-Regular.ttf'),
                //khula style fonts
                'Khula-Bold': require('../../../assets/fonts/Khula-Bold.ttf'),
                'Khula-ExtraBold': require('../../../assets/fonts/Khula-ExtraBold.ttf'),
                'Khula-Light': require('../../../assets/fonts/Khula-Light.ttf'),
                'Khula-Regular': require('../../../assets/fonts/Khula-Regular.ttf'),
                'Khula-SemiBold': require('../../../assets/fonts/Khula-SemiBold.ttf'),
                //Roboto style fonts
                'Roboto-Black': require('../../../assets/fonts/Roboto-Black.ttf'),
                'Roboto-BlackItalic': require('../../../assets/fonts/Roboto-BlackItalic.ttf'),
                'Roboto-Bold': require('../../../assets/fonts/Roboto-Bold.ttf'),
                'Roboto-BoldItalic': require('../../../assets/fonts/Roboto-BoldItalic.ttf'),
                'Roboto-Italic': require('../../../assets/fonts/Roboto-Italic.ttf'),
                'Roboto-Light': require('../../../assets/fonts/Roboto-Light.ttf'),
                'Roboto-LightItalic': require('../../../assets/fonts/Roboto-LightItalic.ttf'),
                'Roboto-Medium': require('../../../assets/fonts/Roboto-Medium.ttf'),
                'Roboto-MediumItalic': require('../../../assets/fonts/Roboto-MediumItalic.ttf'),
                'Roboto-Regular': require('../../../assets/fonts/Roboto-Regular.ttf'),
                'Roboto-Thin': require('../../../assets/fonts/Roboto-Thin.ttf'),
                'Roboto-ThinItalic': require('../../../assets/fonts/Roboto-ThinItalic.ttf'),
              })
        ]);
    }

    componentDidMount(){
        this.loadFontAsync().then(()=>{
            this.setState({text:"Loading fonts..."});
            return loadFromStore();
        }).then(() =>{
            this.setState({text:"Loading store..."});
            //if theres no token, navigate to the signIn page.
            if(Store.getState().Global.sessionToken == null){
                nukeStore();
                NavigationService.navigate("SignIn");
            }else{
                console.log("Actualtoken");
            }
            
        });
    }

    


    async af(){
        await loadFromStore();
        await ping();
        await readAndPrint();
    }

    render(){
    return(
    <View style={{flex:1, backgroundColor:"black", marginTop:30}}>
        <Text style={{fontSize:24, color:"white"}}>{this.state.text}</Text>
        <Button onPress={() => this.af()} title="set loaded"/>
        {/* <MiniCalendar /> */}
    </View>
    );
}
}