import PropTypes from 'prop-types';
import React from 'react';
import { StyleSheet, Text, TouchableWithoutFeedback, View } from 'react-native';
import { connect } from 'react-redux';
import NavigationService from "../../navigation/NavigationService";

//________________________________Button Generators___________________________
//logic for each of the navBar buttons used in the scrollView


class NavScrollButtons extends React.Component{
    constructor(props){
        super(props);
    }

    render(){
        //include props and state
        const {pageID, buttonText, classInstance, buttonID, colorNormal, colorInverse} = this.props;
        //checks if the button is selected
        var buttonSelected, textOpacity;
        {buttonID == pageID ? buttonSelected = true : buttonSelected = false}
        {buttonSelected ? textOpacity = 1 : textOpacity = 0.4}
        return(
            <TouchableWithoutFeedback 
            onPress={() => navItemPresed(buttonID, this, classInstance)}>
                <View style={[buttonStyles.viewModule, {backgroundColor: colorInverse}]}>
                    <Text style={[{fontFamily: "DidactGothic-Regular", paddingTop: 2, opacity: textOpacity, fontSize:24, 
                    backgroundColor: colorInverse, color: colorNormal}]}>{buttonText}</Text>
                </View>
            </TouchableWithoutFeedback>
        );
    }
}

NavScrollButtons.propTypes = {
    buttonID: PropTypes.number.isRequired,
    buttonText: PropTypes.string.isRequired,
    classInstance: PropTypes.object.isRequired,
    expandable: PropTypes.bool.isRequired
}

const buttonStyles = StyleSheet.create({
    viewModule:{
        minHeight: 35,
        maxHeight: 35,
        borderBottomLeftRadius: 40,
        borderBottomRightRadius: 40,
        marginHorizontal: 9,
    }
});




function navItemPresed(currentID, thisInstance, classInstance){
    const {pageID, expandable, navHeight} = thisInstance.props;
    const {dispatch} = classInstance.props;
    const {dist} = classInstance.state;
    //handle recurrent presses
    if(pageID == currentID && expandable == true) {
        if(dist._value == 60){
            classInstance.moveNav(navHeight[pageID], true);
            classInstance.colorCalculator(true, 1);
        }else{
            classInstance.moveNav(60, true);
            classInstance.colorCalculator(true, 0);
        }
        //index of -1 if DNE
    }else{
        classInstance.moveNav(60, true);
        classInstance.colorCalculator(true, 0);
        /**
         * PAGE INDEX SUMMARY
         * id's
         *  1 = home
         *  2 = events
         *  3 = discover
         *  4 = messages
         *  5 = profile
         *  6 = settings
         */
        switch(currentID){
            
            case 1:  //home
                NavigationService.navigate("Home");
                dispatch({type: "SET_PAGE", id:currentID});    
                break;
            case 2: //events
                NavigationService.navigate("Events");
                dispatch({type: "SET_PAGE", id:currentID});
                break;
            case 3:  //discover
                NavigationService.navigate("Discover");
                dispatch({type: "SET_PAGE", id:currentID});
                break;
            // case 4:  //messages
            //     NavigationService.navigate("Messages");
            //     dispatch({type: "SET_PAGE", id:4});
            //     break;
            case 4: //profile
                NavigationService.navigate("Profile");
                dispatch({type: "SET_PAGE", id:currentID});
                break;
            case 5: //settings
                NavigationService.navigate("Settings");
                dispatch({type: "SET_PAGE", id:currentID});
                break;
            default:
                NavigationService.navigate("Home");
                dispatch({type: "SET_PAGE", id:1});
                break;
        }
    }
}

const mapStateToProps = (store) => ({
    pageID: store.Global.pageID,
    navHeight: store.Global.navHeight,
    colorNormal: store.Global.colorNormal,
    colorInverse: store.Global.colorInverse
});

const NavScrollButtonsScreen = connect(mapStateToProps)(NavScrollButtons);
export default NavScrollButtonsScreen;