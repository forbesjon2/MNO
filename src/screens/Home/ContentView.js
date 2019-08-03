import React from 'react';
import {Image, View, Text, Dimensions, Linking, TouchableWithoutFeedback} from 'react-native';
import {styles} from "../../Styles";

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
    }

    openLink(link){
        Linking.canOpenURL(link).then((supported) => {
            if(supported){return Linking.openURL(link);}
        }).catch((err) => console.error('An error occurred', err));
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
    syntaxTree(content){
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
            if(currentPosition < matchPos){returnObj.push(<Text style={styles.contentview_text} key={currentPosition}>{content.slice(currentPosition, matchPos)}</Text>)}
            currentPosition = matchArray[matchTracker].split(",")[0];
            let matchText = matchArray[matchTracker].split(",")[1];
            //add the link
            returnObj.push(<TouchableWithoutFeedback key={currentPosition} onPress={() => {this.openLink(matchText);}}>
                    <Text style={[styles.contentview_text, {color:"blue", textDecorationLine:"underline"}]}>{matchText}</Text></TouchableWithoutFeedback>);
            currentPosition = Number(currentPosition) + Number(matchText.length);
            ++matchTracker;
            //check if theres text after the last link, if so add it
            if((matchTracker == matchArray.length) && (currentPosition + 1) < content.length){returnObj.push(<Text style={styles.contentview_text} key={currentPosition}>{content.slice(currentPosition, content.length)}</Text>)}
            }
        }else{
            returnObj.push(<Text key={0} style={styles.contentview_text}>{content}</Text>);
        }
        return returnObj;
    }



    //links use RN linking https://facebook.github.io/react-native/docs/linking.html
    generateContentView(content, type){
        var regex = new RegExp("\d+[x]\d+",'g');
        var width, height;
        if(type.toLowerCase().match(regex)){
            width = type.split("x")[0];
            height = type.split("x")[1];
            let dimensionWidth = Dimensions.get("window").width;
            var dimensionHeight = [width > dimensionWidth ? height * (dimensionWidth / width) : height * (width / dimensionWidth)];
            type = "image";
        }
        switch(type){
            case "image": return(<Image source={{uri:content}} style={[{width:dimensionWidth, height:dimensionHeight}]}/>);
            case "text": return(this.syntaxTree(content));
            default: return(<Text>Error</Text>);
        }
    }


    render(){
        const {content, type} = this.props;
    return(
        <View style={{flex:1}}>
            {this.generateContentView(content, type)}
        </View>
    );
}
}
