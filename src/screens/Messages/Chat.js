import React from 'react';
import {Text, View, StyleSheet, TouchableWithoutFeedback, ScrollView, TextInput, TouchableOpacity} from 'react-native';
import {Ionicons} from '@expo/vector-icons';
import { connect } from "react-redux";


class Chat extends React.Component{
    static navigationOptions = ({navigation}) => ({
        header: null
        
    });
    render(){
        const {navigation} = this.props;
        const name = navigation.getParam("name");
        //const content = navigation.getparam("content");
        return(
        <View style={{flex: 1}}>
            {/* Header where you can click the back button and view the persons name */}
            <View style={styles.header}>
                <TouchableWithoutFeedback onPress={() => this.props.navigation.goBack()}
                style={styles.buttonTouchable}>
                    <Ionicons 
                    name="ios-arrow-back"
                    style={styles.headerButton}
                    color={"black"}/>
                </TouchableWithoutFeedback>
                <Text style={styles.headerText}>{name}</Text>
            </View>


            {/* This is the scrollview where all of the messages go */}
            <View style={styles.content}>
            <ScrollView>
                {generateText("Lorem ipsum dolor sit amet, consectetuer adipiscing elit, sed diam nonummy nibh euismod tincidunt ut laoreet dolore magna aliquam erat volutpat. Ut wisi enmmodo consequat. Duis autem vel eum iriure dolor in hendrerit in vulputate velit esse molestie consequat, vel illum dolore eu feugiat nulla facilisis at vero eros et accumsan et iusto odio dignissim qui blandit praesent luptatum zzril delenit augue duis dolore te feugait nulla facilisi.", true)}
                {generateText("ol", false)}
            </ScrollView>
            </View>


            {/* This is where you type and send your message */}
            <View style={styles.footer}>
                <TextInput></TextInput>
            </View>
        </View>
        );
    }
};
const styles = StyleSheet.create({
    header:{
        flex: 1,
        flexDirection:"row",
        justifyContent:"space-evenly",
    },
    headerButton:{
        fontSize:30,
        marginLeft: 14,
        marginTop:10,
        height: 30,
    },
    buttonTouchable:{
        flex:1,
        marginTop:20,
        alignSelf:"center"
    },
    headerText:{
        flex:14,
        alignSelf: "center",
        marginLeft: 155,
        marginTop:5,
        fontFamily:"Khula-SemiBold",
        color: "black",
        fontSize: 20,
        lineHeight:40,
    },
    content: {
        flex:14,
        backgroundColor: "white"
    },
    footer:{
        borderTopWidth: 1,
        borderColor:"#E6E6E6",
        height:60,
        flexDirection:"row",
        justifyContent: "space-evenly"
    }
});


/**
 * leftView AND leftText: the content that you Recieved
 *      This has a blue background, appears on the left, and has white text
 * rightView AND rightText: the content that you sent
 *      This has a white background, appears on the right, and has black text
 */
function generateText(text, sender){
    var viewStyle, textStyle;
    {sender ? viewStyle = chatStyles.rightView : viewStyle = chatStyles.leftView}
    {sender ? textStyle = chatStyles.rightText : textStyle = chatStyles.leftText}
    return(
    <View style={chatStyles.main}>
        <View style={viewStyle}><Text style={textStyle}>{text}</Text></View>
    </View>
    );
}

const chatStyles = StyleSheet.create({
    //blue #476BF2
    //white shadow color #808080
    //shadow at 25% opacity 8px blur no x or y
    main:{
        marginVertical:13,
    },
    leftView:{
        backgroundColor:"white",
        shadowColor: "#B3B3B3",
        shadowOffset:{width: 8, height: 8},
        shadowRadius: 8,
        borderRadius: 25,
        marginLeft: 18,
    },
    leftText:{
        fontFamily:"Khula-SemiBold",
        fontSize:16,
        color: "black",
        margin:13,
    },
    rightText:{
        fontFamily:"Khula-SemiBold",
        fontSize:14,
        color: "white",
        margin:18,
    },
    rightView:{
        backgroundColor:"#476BF2",
        //shadowColor: "#B3B3B3",
        shadowColor:"black",
        shadowOffset:{width: 8, height: 8},
        shadowRadius: 8,
        borderRadius: 25,
        marginRight: 18,
    }
})


const mapStateToProps = (store) => ({
    
});

const chatScreen = connect(mapStateToProps)(Chat);
export default chatScreen;