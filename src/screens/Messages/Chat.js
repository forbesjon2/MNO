import React from 'react';
import {Text, View, TouchableWithoutFeedback, ScrollView, TextInput, TouchableOpacity} from 'react-native';
import {Ionicons} from '@expo/vector-icons';
import { connect } from "react-redux";
import {styles} from "../../Styles";

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
            <View style={styles.chat_header}>
                <TouchableWithoutFeedback onPress={() => this.props.navigation.goBack()}
                style={styles.chat_buttonTouchable}>
                    <Ionicons 
                    name="ios-arrow-back"
                    style={styles.chat_headerButton}
                    color={"black"}/>
                </TouchableWithoutFeedback>
                <Text style={styles.chat_headerText}>{name}</Text>
            </View>


            {/* This is the scrollview where all of the messages go */}
            <View style={styles.chat_content}>
            <ScrollView>
                {generateText("Lorem ipsum dolor sit amet, consectetuer adipiscing elit, sed diam nonummy nibh euismod tincidunt ut laoreet dolore magna aliquam erat volutpat. Ut wisi enmmodo consequat. Duis autem vel eum iriure dolor in hendrerit in vulputate velit esse molestie consequat, vel illum dolore eu feugiat nulla facilisis at vero eros et accumsan et iusto odio dignissim qui blandit praesent luptatum zzril delenit augue duis dolore te feugait nulla facilisi.", true)}
                {generateText("ol", false)}
            </ScrollView>
            </View>


            {/* This is where you type and send your message */}
            <View style={styles.chat_footer}>
                <TextInput></TextInput>
            </View>
        </View>
        );
    }
};



/**
 * leftView AND leftText: the content that you Recieved
 *      This has a blue background, appears on the left, and has white text
 * rightView AND rightText: the content that you sent
 *      This has a white background, appears on the right, and has black text
 */
function generateText(text, sender){
    var viewStyle, textStyle;
    {sender ? viewStyle = styles.chat_CSrightView : viewStyle = styles.chat_CSleftView}
    {sender ? textStyle = styles.chat_CSrightText : textStyle = styles.chat_CSleftText}
    return(
    <View style={styles.chat_CSmain}>
        <View style={viewStyle}><Text style={textStyle}>{text}</Text></View>
    </View>
    );
}


const mapStateToProps = (store) => ({
    
});

const chatScreen = connect(mapStateToProps)(Chat);
export default chatScreen;