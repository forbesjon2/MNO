import {FlatList, View, Text, TouchableWithoutFeedback, StyleSheet, Image} from "react-native";
import React from "react";
import {Ionicons} from '@expo/vector-icons';

/**
main text (black font) didact gothic regular
pink font roboto light #CE2E7B
10 pt edges
"Groups" Khula bold, "Following" khula regular

 */
export default class GroupView extends React.Component{

    colorToRGBA(opacity){
        const {color} = this.props
        return "rgba(" + color.split(".")[0] + ", " 
            + color.split(".")[1] + ", " 
            + color.split(".")[2] + ", " + opacity + ")";
    }

    render(){
        var regularColor = this.colorToRGBA(1);
        var lightColor = this.colorToRGBA(0.2);
    return(
    <View style={styles.main}>
        <View style={{flex:1, flexDirection:"column", margin:15}}>

            {/* Name */}
            <View style={{flex:1, maxHeight:50, minHeight:50, flexDirection:"row", borderBottomColor:"#D0D1D3", borderBottomWidth:2}}>
                <Text numberOfLines={1} style={[styles.contentText]}>University of Michigan</Text>
            </View>

            {/* Epithet & icon */}
            <View style={{flex:1, maxHeight:80, minHeight:80, flexDirection:"row",  borderBottomColor:"#D0D1D3", borderBottomWidth:2}}>
                <View style={{flex:1, flexDirection:"column"}}>
                    <Text numberOfLines={1} style={[styles.headerText, {color:regularColor}]}>epithet</Text>
                    <Text numberOfLines={1} style={styles.contentText}>UofM</Text>
                </View>
                <View style={{flex:1, flexDirection:"column"}}>
                    <Image source={{uri:"https://upload.wikimedia.org/wikipedia/commons/thumb/3/3b/Michigan_Wolverines_Logo.svg/1280px-Michigan_Wolverines_Logo.svg.png"}}
                        style={{ width:70, height:40, alignSelf:"center", marginTop:20}}/>
                </View>
            </View>

            {/* Members &  Groups*/}
            <View style={{flex:1, flexDirection:"row",  borderBottomColor:"#D0D1D3", borderBottomWidth:2, maxHeight:120, minHeight:120}}>
                <View style={{flex:1, flexDirection:"column", borderRightColor:"#D0D1D3", borderRightWidth:2}}>
                <Text numberOfLines={1} style={[styles.headerText, {color:regularColor}]}>members</Text>
                    <Text numberOfLines={1} style={[styles.contentText, {alignSelf:"center", fontSize:48}]}>253</Text>
                </View>
                <View style={{flex:1, flexDirection:"column"}}>
                <Text numberOfLines={1} style={[styles.headerText, {color:regularColor}]}>groups</Text>
                    <Text numberOfLines={1} style={[styles.contentText, {alignSelf:"center", fontSize:48}]}>16</Text>
                </View>
            </View>

            {/* Nav Button */}
            <TouchableWithoutFeedback style={{borderRadius:12}}>
                <View style={{backgroundColor:lightColor, width:220, borderRadius:8, alignSelf:"center", marginTop:12, minHeight:45, maxHeight:45, flex:1, flexDirection:"row"}}>
                    <Text style={{color:regularColor, paddingTop:9, paddingLeft:12, fontSize:18, flex:4, flexDirection:"column"}}>Select school.</Text>
                    <Ionicons name={"ios-arrow-round-forward"} style={{color:regularColor, fontSize:42, flex:1, flexDirection:"column", alignSelf:"center"}} />
                </View>
            </TouchableWithoutFeedback>
        </View>
    </View>
        );
    }
}

const styles = StyleSheet.create({
    main:{
        maxHeight:350,
        minHeight:350,
        minWidth: 290,
        maxWidth: 290,
        marginHorizontal:20,
        backgroundColor:"white",
        marginTop:10,
        borderRadius:12
    },
    content:{
        margin:15,

    },
    contentText:{
        fontFamily: "Khula-Regular",
        fontSize:21,
        paddingLeft:3,
        color:"black",
        paddingTop:12
    },
    headerText:{
        fontFamily: "DidactGothic-Regular",
        fontSize:18,
        paddingLeft:3,
        paddingTop:1,
        paddingBottom:4,
    },
    buttonIcon:{
        alignSelf:"center",
        color:"white",
        fontSize:40,
        marginRight:20,
    },
});

