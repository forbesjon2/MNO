import React from "react";
import {Text, View, StyleSheet, TouchableWithoutFeedback} from "react-native";
import { connect } from "react-redux";
import PropTypes from "prop-types";


class TripleList extends React.Component{
    constructor(props){
        super(props);
        this.state = {
            selectedID: 1,
        }
    }

    buttonGen(count, selectedButton){
        const {textArray,selectedButtonSize, deselectedButtonSize, selectedButtonHeight, deselectedButtonHeight, selectedButtonLineHeight} = this.props;
        if(selectedButton){
            return(
            <TouchableWithoutFeedback
            onPress={() => this.setState({selectedID: count})}>
            <Text style={[{fontSize:selectedButtonSize, height: selectedButtonHeight,
                fontFamily: "Khula-ExtraBold", color: "black", lineHeight: selectedButtonLineHeight, maxWidth: 120}]}>{textArray[count]}</Text>
            </TouchableWithoutFeedback>);
        }
        return(
            <TouchableWithoutFeedback
            onPress={() => this.setState({selectedID: count})}>
            <Text style={[{fontSize:deselectedButtonSize, height: deselectedButtonHeight, maxWidth: 90, fontFamily: "Khula-Light", color: "black"}]}>{textArray[count]}</Text>
            </TouchableWithoutFeedback>
        );
    }
    getList(selectedID){
        const infiniteList = [[0,1,2],[2,0,1],[1,2,0]];
        for(var i = 0; i < infiniteList.length; ++i){
            if(selectedID == infiniteList[i][1]) return infiniteList[i];
        }
    }
    render(){
        const {selectedID} = this.state;
        const selectedList = this.getList(selectedID);
        return(
            <View style={styles.listView}>
                {this.buttonGen(selectedList[0], false)}
                {this.buttonGen(selectedList[1], true)}
                {this.buttonGen(selectedList[2], false)}
            </View>
        );
    }
}


const styles = StyleSheet.create({
    listView:{
        alignContent: "center",
    }

});

TripleList.propTypes = {
    textArray: PropTypes.array.isRequired,
    selectedButtonSize: PropTypes.number.isRequired,
    deselectedButtonSize: PropTypes.number.isRequired,
    selectedButtonHeight: PropTypes.number.isRequired,
    deselectedButtonHeight: PropTypes.number.isRequired,
    selectedButtonLineHeight: PropTypes.number.isRequired,
}


const mapStateToProps = (store) => ({
    
});

const tripleListScreen = connect(mapStateToProps)(TripleList);
export default tripleListScreen;