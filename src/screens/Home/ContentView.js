import React from 'react';
import {Image, View, StyleSheet, Text, Dimensions, Linking, Button, TouchableWithoutFeedback} from 'react-native';

/*************************************************************************
 * each post someone makes is loaded from the DB & rendered here to be 
 * displayed on the main page (being Home.js). 
 * 
 * This is a separate component because it can get complicated fast.
 * The post that's stored in the database can qualify as the following types
 * - image
 * - text
 * 
 * Text is filtered to find different textual types.. such as
 * - links (https...)
 * - user mentions (@someUser) not implemented
 * - youtube video links not implemented
 * 
 * https://blog.discordapp.com/how-discord-renders-rich-messages-on-the-android-app-67b0e5d56fbe
 **************************************************************************/
export default class ContentView extends React.Component{
    constructor(props){
        super(props);
        this.state = {
            imgHeight: 0
        }

    }

    componentDidMount(){
        if(this.props.type == "image"){
            Image.getSize(this.props.content, (width, height) =>{
                var dimensionWidth = Dimensions.get("window").width
                var tempHeight = [width > dimensionWidth ? height * (dimensionWidth / width) : height * (width / dimensionWidth)];
                this.setState({imgHeight: tempHeight[0]});
            }, (error) =>{
                console.log("ERROR IN CONTENTVIEW", error);
            });
        }
    }

    openLink(link){
        Linking.canOpenURL(link).then((supported) => {
            if(supported){return Linking.openURL(link);}
        }).catch((err) => console.error('An error occurred', err));
    }

    render(){
        const {content, type} = this.props;
        const {imgHeight} = this.state;
    return(
        <View style={{flex:1}}>
            {generateContentView(content, type, imgHeight, this)}
        </View>
    );
}
}

//links use RN linking https://facebook.github.io/react-native/docs/linking.html
function generateContentView(content, type, imgHeight, classInstance){
    switch(type){
        case "image":
        return(<Image source={{uri:content}} style={[{width:Dimensions.get("window").width, height:imgHeight}]}/>);
        case "text":
        return(syntaxTree(content, classInstance));
    }
}
/*************************************************************************
 * This scans the text and returns the respective content. it does so by
 * first separating each 
 * 
 *      Links:
 * scans the string for leading https://
 * 
 *      Plaintext:
 * if none of the above qualify, plaintext is returned
 * 
 *      Further reading:
 * https://blog.discordapp.com/how-discord-renders-rich-messages-on-the-android-app-67b0e5d56fbe
 *************************************************************************/
function syntaxTree(content, classInstance){
    let linkRegex = /(((https)+:\/\/)?(([a-z0-9\-]+\.)+([a-z]{2}|aero|arpa|biz|com|coop|edu|gov|info|int|jobs|mil|museum|name|nato|net|org|pro|travel|local|internal))(:[0-9]{1,5})?(\/[a-z0-9_\-\.~]+)*(\/([a-z0-9_\-\.]*)(\?[a-z0-9+_\-\.%=&amp;]*)?)?(#[a-zA-Z0-9!$&'()*+.=-_~:@/?]*)?)(\s+|$)/gi;
    let matchArray = [];
    content.replace(linkRegex, function replaceWithLinkText(match, p1, p2, p3, p4, p5, p6, p7, p8, p9, p10, p11, p12, p13, position){
        matchArray.push(position + "," + match);
    });
    var returnObj = [];
    var currentPosition = 0;
    var matchTracker = 0;
    if(matchArray.length > 0 ){
        while(matchArray[matchTracker] != null){
          let matchPos = matchArray[matchTracker].split(",")[0];

          //if theres text before the next link, add it
          if(currentPosition < matchPos){returnObj.push(<Text style={contentStyles.text} key={currentPosition}>{content.slice(currentPosition, matchPos)}</Text>)}
          currentPosition = matchArray[matchTracker].split(",")[0];
          let matchText = matchArray[matchTracker].split(",")[1];
          //add the link
          returnObj.push(<TouchableWithoutFeedback key={currentPosition} onPress={() => {classInstance.openLink(matchText);}}>
                  <Text style={[contentStyles.text, {color:"blue", textDecorationLine:"underline"}]}>{matchText}</Text></TouchableWithoutFeedback>);
          currentPosition = Number(currentPosition) + Number(matchText.length);
          ++matchTracker;
          //check if theres text after the last link, if so add it
          if((matchTracker == matchArray.length) && (currentPosition + 1) < content.length){returnObj.push(<Text style={contentStyles.text} key={currentPosition}>{content.slice(currentPosition, content.length)}</Text>)}
        }
      }else{
        returnObj.push(<Text key={0} style={contentStyles.text}>{content}</Text>);
      }
      return returnObj;
}
const contentStyles = StyleSheet.create({
    text:{
        fontFamily:"DidactGothic-Regular",
        fontSize:16,
        paddingLeft:10,
        paddingRight:10,
    },
    image:{
        width:10,
        height:10
    }
})