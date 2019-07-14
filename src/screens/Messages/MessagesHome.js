import React from 'react';
import {Text, View, Button, StyleSheet, ScrollView, Image, TouchableWithoutFeedback} from 'react-native';
import { connect } from "react-redux";
import PropTypes from 'prop-types';
import NavigationService from "../../navigation/NavigationService";
var jsonData = require("../../../data/MessagesHome.json");

class MessagesHome extends React.Component{
    static navigationOptions = ({navigation}) => ({
        title: "Messages", 
        header:null
    });
    constructor(props){
        super(props);
        //set safe area background
        this.props.dispatch({type:"SET_SAFE_AREA_BACKGROUND", payload:"#ffffff"});
    }
    render(){
        var content = [];
        const navigation = this.props.navigation;
        jsonData.messagesHome.forEach(element => {
            content.push(<MessagesList profileImg={element.img} username={element.name} key={element.id} nav={navigation}/>);    
        });
        
        return(
            <View style={{flex: 1}}>
                <View style={styles.header}><Text style={styles.headerText}>Messages</Text></View>
                <View style={styles.footer}>
                    <ScrollView style={styles.scroll}>
                    {content}
                    </ScrollView>
                </View>
            </View>
        );
    }
};



const styles = StyleSheet.create({
    header:{
        height: 30, 
        flex: 1,
        borderBottomWidth: 1,
        borderColor:"#E6E6E6",
    },
    headerText:{
        fontSize: 35,
        marginLeft: 25,
        marginTop: 5,
        color:"black",
        fontFamily: "DidactGothic-Regular",
    },
    footer:{
        marginTop:5,
        flex: 12,
    },
    scroll:{
        flex: 1,
        marginLeft: 15,
        marginRight: 15,
    }

})

class MessagesList extends React.Component{
    constructor(props){
        super(props);
        this.state = {
            timeStamp: "3 days ago",
            message: "waiting for them atm",
            read:false,
        }
    }
    render(){
    const {profileImg, username} = this.props;
    const {timeStamp, message, read} = this.state;
    var opacity = 1;
    if(read) opacity = 0.5;

        return(
        <TouchableWithoutFeedback
        onPress={() => NavigationService.navigate("Chat", {"name":"jack"})}
        >
        <View style={scrollStyles.main}>
            <Image style={[{opacity: opacity},scrollStyles.image]} source={{uri:profileImg}}/>
            <View style={scrollStyles.content}>
                <Text style={[{opacity: opacity},scrollStyles.name]}>{username}</Text>
                <Text style={scrollStyles.message}>{message}</Text>
            </View>
            <Text style={scrollStyles.timeStamp}>{timeStamp}</Text>
        </View> 
        </TouchableWithoutFeedback>
        );
    }
}

MessagesList.propTypes = {
    profileImg: PropTypes.string.isRequired,
    username: PropTypes.string.isRequired,
    nav: PropTypes.object.isRequired,
}


const scrollStyles = StyleSheet.create({
    main:{
        flexDirection:"row",
        height: 70,
        marginTop:10,
    },
    image:{
        width: 50,
        height: 50,
        alignSelf:"center",
        justifyContent:"center",
        borderRadius:50,
        marginRight: 10,
    },
    name:{
        fontFamily:"Khula-SemiBold",
        color:"black",
        fontSize:23,
        flex:1,
    },
    message:{
        flex:1,
        fontFamily:"Khula-Light",
        color:"black",
        opacity:0.7,
        fontSize:15,
        marginBottom:0
    },
    timeStamp:{
        flex: 1,
        marginRight: 0
    },
    content:{
        flexDirection:"column",
        flex: 3
    }

})

const mapStateToProps = (store) => ({
    
});

const messagesHome = connect(mapStateToProps)(MessagesHome);
export default messagesHome;