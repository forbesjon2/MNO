import {View, Text, TouchableWithoutFeedback, StyleSheet, Image} from "react-native";
import PropTypes from 'prop-types';
import React from "react";
import {Ionicons} from '@expo/vector-icons';

/**
main text (black font) didact gothic regular
pink font roboto light #CE2E7B
10 pt edges
"Groups" Khula bold, "Following" khula regular

 */
export default class GroupView extends React.Component{
    constructor(props){
        super(props);
        this.state = {
            width: 50,
            height: 50
        }
    }
    calculateImage(url){
        Image.getSize(url, (w, h) =>{
            var dimensionWidth = 50;
            this.setState({height: [w > dimensionWidth ? h * (dimensionWidth / w) : h * (w / dimensionWidth)], width: dimensionWidth});
        }, (error) =>{
            this.setState({height:-1, width:-1})
        });
        if(this.state.width == -1 || this.state.height == -1) return(<Text>No image</Text>)
        return (<Image source={{uri:url}} style={{ minWidth:this.state.width, minHeight:this.state.height[0], alignSelf:"center", marginTop:20}}/>)
    }
    
    render(){
        const {name, epithet, icon, members, rooms} = this.props;   
    return(
    <View style={styles.main}>
        <View style={{flex:1, flexDirection:"column", margin:15}}>
            {/* Name */}
            <View style={{flex:1, maxHeight:50, minHeight:50, flexDirection:"row", borderBottomColor:"#D0D1D3", borderBottomWidth:2}}>
                <Text numberOfLines={1} style={[styles.contentText]}>{name}</Text>
            </View>

            {/* Epithet & icon */}
            <View style={{flex:1, maxHeight:80, minHeight:80, flexDirection:"row",  borderBottomColor:"#D0D1D3", borderBottomWidth:2}}>
                <View style={{flex:1, flexDirection:"column"}}>
                    <Text numberOfLines={1} style={[styles.headerText, {color:'rgba(66,54,138,1)'}]}>epithet</Text>
                    <Text numberOfLines={1} style={styles.contentText}>{epithet}</Text>
                </View>
                <View style={{flex:1, flexDirection:"column"}}>
                    {this.calculateImage(icon)}
                </View>
            </View>

            {/* Members &  Groups*/}
            <View style={{flex:1, flexDirection:"row",  borderBottomColor:"#D0D1D3", borderBottomWidth:2, maxHeight:120, minHeight:120}}>
                <View style={{flex:1, flexDirection:"column", borderRightColor:"#D0D1D3", borderRightWidth:2}}>
                <Text numberOfLines={1} style={[styles.headerText, {color:'rgba(66,54,138,1)'}]}>members</Text>
                    <Text numberOfLines={1} style={[styles.contentText, {alignSelf:"center", fontSize:48}]}>{members}</Text>
                </View>
                <View style={{flex:1, flexDirection:"column"}}>
                <Text numberOfLines={1} style={[styles.headerText, {color:'rgba(66,54,138,1)'}]}>rooms</Text>
                    <Text numberOfLines={1} style={[styles.contentText, {alignSelf:"center", fontSize:48}]}>{rooms}</Text>
                </View>
            </View>
            
            {/* Nav Button */}
            <TouchableWithoutFeedback style={{borderRadius:12}}>
                <View style={{backgroundColor:'rgba(66,54,138,0.2)', width:220, borderRadius:8, alignSelf:"center", marginTop:12, minHeight:45, maxHeight:45, flex:1, flexDirection:"row"}}>
                    <Text style={{color:'rgba(66,54,138,1)', paddingTop:9, paddingLeft:12, fontSize:18, flex:4, flexDirection:"column"}}>Select school.</Text>
                    <Ionicons name={"ios-arrow-round-forward"} style={{color:'rgba(66,54,138,1)', fontSize:42, flex:1, flexDirection:"column", alignSelf:"center"}} />
                </View>
            </TouchableWithoutFeedback>
        </View>
    </View>
        );
    }
}


GroupView.propTypes = {
    isGroup: PropTypes.bool.isRequired,
    name: PropTypes.string.isRequired,
    epithet: PropTypes.string.isRequired,
    icon: PropTypes.string,
    members: PropTypes.number.isRequired,
    rooms: PropTypes.number
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

