import {FlatList, View, Text, TouchableWithoutFeedback, StyleSheet, Image} from "react-native";
import React from "react";

/**
main text (black font) didact gothic regular
pink font roboto light #CE2E7B
10 pt edges
"Groups" Khula bold, "Following" khula regular

 */
export default class GroupView extends React.Component{
    render(){
    return(
    <View style={styles.main}>
        <View style={{flex:1, flexDirection:"column", margin:15}}>
            
            {/* Name */}
            <View style={{flex:1, flexDirection:"row", borderBottomColor:"#D0D1D3", borderBottomWidth:3}}>
                <Text numberOfLines={1} style={[styles.contentText]}>University of Michigan</Text>
            </View>

            {/* Epithet & icon */}
            <View style={{flex:1, flexDirection:"row",  borderBottomColor:"#D0D1D3", borderBottomWidth:3}}>
                <View style={{flex:1, flexDirection:"column"}}>
                    <Text numberOfLines={1} style={styles.headerText}>epithet</Text>
                    <Text numberOfLines={1} style={styles.contentText}>UofM</Text>
                </View>
                <View style={{flex:1, flexDirection:"column"}}>
                    <Image source={{uri:"https://upload.wikimedia.org/wikipedia/commons/thumb/3/3b/Michigan_Wolverines_Logo.svg/1280px-Michigan_Wolverines_Logo.svg.png"}}
                        style={{ width:70, height:40, alignSelf:"center", marginTop:20}}/>
                </View>
            </View>

            {/* Members &  Groups*/}
            <View style={{flex:1, flexDirection:"row",  borderBottomColor:"#D0D1D3", borderBottomWidth:3}}>
                <View style={{flex:1, flexDirection:"column", borderRightColor:"#D0D1D3", borderRightWidth:3}}>
                <Text numberOfLines={1} style={styles.headerText}>members</Text>
                    <Text numberOfLines={1} style={styles.contentText}>253</Text>
                </View>
                <View style={{flex:1, flexDirection:"column"}}>
                <Text numberOfLines={1} style={styles.headerText}>groups</Text>
                    <Text numberOfLines={1} style={styles.contentText}>16</Text>
                </View>
            </View>

            {/* Nav Button */}
            <TouchableWithoutFeedback  style={{borderRadius:12}}>
                <View style={{backgroundColor:"#F2D3E2", width:220, height:40, borderRadius:20, alignSelf:"center", marginTop:12}}>
                    <Text style={{color:"#CE2E7B", opacity:1, paddingTop:9, paddingLeft:12, fontSize:16}}>Select school.</Text>
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
        paddingBottom:4,
    },
    headerText:{
        fontFamily: "DidactGothic-Regular",
        fontSize:18,
        paddingLeft:3,
        paddingTop:1,
        color:"#CE2E7B",
        paddingBottom:4,
        
    },



});

