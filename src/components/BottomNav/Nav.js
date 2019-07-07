import React from 'react';
import {ScrollView, View, Animated, StyleSheet, PanResponder, Dimensions, Text, SafeAreaView} from 'react-native';
import { connect } from "react-redux";
import NavScrollButtons from "./NavScrollButtons";
import NavContent from "./NavContent";

/*************************************************************************
 * Nav provides the highest level approach to the bottom navBar
 * 
 *************************************************************************/
class Nav extends React.Component{
    constructor(props){
        super(props);
        const {showNav, navHeight} = this.props;
        const minHeight = 60;
        const distPercent = 0;
        const height = Dimensions.get("window").height;
        /*************************************************************************
         * panResponder handles
         * Some redux variables need the latest value. in which case it has to be
         * referenced at that instance
         *************************************************************************/
        const panResponder = PanResponder.create({
            onStartShouldSetPanResponder: (evt, gesture) => true,
            onMoveShouldSetPanResponder: (evt, gestureState) => true,
            onPanResponderMove: (evt, gesture) => {
                let currentHeight = height - gesture.moveY;
                if(navHeight[this.props.pageID] > currentHeight && currentHeight > minHeight){
                    let percent = (currentHeight - minHeight)/(navHeight[this.props.pageID]-minHeight);
                    this.setState({distPercent: percent});
                    this.colorCalculator(false, 0);
                    this.fastTransition(currentHeight);
                }
            },
            onPanResponderRelease: (evt, gesture) => {
                let currentHeight = height - gesture.moveY;
                if(navHeight[this.props.pageID] > currentHeight && currentHeight > minHeight){
                    let percent = (currentHeight - minHeight)/(navHeight[this.props.pageID]-minHeight);
                    if(percent > 0.5){
                        this.setState({distPercent: 1});
                        this.fastTransition(navHeight[this.props.pageID]);
                    }else{
                        this.fastTransition(minHeight);
                        this.setState({distPercent:0});
                    }
                }
            }
        });
        
        this.state = {
            navExpanded: false, 
            panResponder,
            dist: new Animated.Value(60),
            distPercent
        }
    }


    /*************************************************************************
     * This is called inside the panResponder after certain gestures. There
     * are 16 shades total & it dynamically sets the color of different elements
     * 
     * override
     * a boolean value representing whether this function is being overridden
     * or not. When it is overridden than the value is not taken from distpercent
     * (held in the state). Usually happens when the navbar is moving or if there
     * this will be ran before some nav move event finishes
     * 
     * toValue
     * set to a number only if this is being overridden. Decimal between 0 and 1
     * 
     * Note: I know theres a less redundant way to do this (no 2 color arrays)
     * but this is pretty simple
     *************************************************************************/
    colorCalculator(override, toValue){
        //array of 16 colors ranging from lightest to darkest
        const colorArray = ["#000000", "#111111", "#222222", "#333333", "#444444", "#555555", "#666666", "#777777",
                            "#888888", "#999999", "#AAAAAA", "#BBBBBB", "#CCCCCC", "#DDDDDD", "#EEEEEE", "#FFFFFF"];
        //array of 16 colors ranging from darkest to lightest
        const colorArrayInverse = ["#FFFFFF", "#EEEEEE", "#DDDDDD", "#CCCCCC", "#BBBBBB", "#AAAAAA", "#999999", "#888888",
                                   "#777777", "#666666", "#555555", "#444444", "#333333", "#222222", "#111111", "#000000"];
        var distPercent;
        if(override){distPercent = toValue; 
        }else{distPercent = this.state.distPercent;}
        this.props.dispatch({type:"SET_COLOR_NORMAL", payload: colorArray[Math.round(distPercent * (colorArray.length - 1))]});
        this.props.dispatch({type:"SET_COLOR_INVERSE", payload: colorArrayInverse[Math.round(distPercent * (colorArrayInverse.length - 1))]});
    }

     /**
     * this handles the animation logic for the nav
     * 
     * value = how far you want to open the nav to
     *          50 = closed, anything over 50 is open to that degree
     *
     * duration = how long you want the transistion to last in ms
     *          this is usually at 500 for normal or 200 for fast
     */
    fastTransition(value){
        const {dist} = this.state;
        const {navHeight} = this.props;
        const minHeight = 60;
        Animated.timing(
            dist,{
            toValue: value,
            duration: 200,}
        ).start();
        let percent = (value - minHeight)/(navHeight[this.props.pageID]-minHeight);
        this.colorCalculator(true, percent);
    }

    render(){
        const {dist} = this.state;
        const {showNav, colorInverse, colorNormal} = this.props;
        let handles = this.state.panResponder.panHandlers;
        if(showNav == true){
        return(
        <Animated.View style={[{height: dist}]}>
            {/* The view above doesnt respond to gestures but the content inside does */}
                <View style={[styles.navBar, {backgroundColor: colorInverse}]}>
                    <View {...handles}>
                        <Text style={{textAlign:"center", fontSize:34, minHeight: 20, maxHeight:20, lineHeight:32, color:colorNormal}}>────────</Text>
                    </View>
                <ScrollView
                horizontal={true}
                showsHorizontalScrollIndicator={false}
                keyboardDismissMode={"on-drag"}
                style={[styles.ScrollView, {backgroundColor:colorInverse}]}>
                    <NavScrollButtons
                    buttonID={1}
                    buttonText={"home"}
                    expandable={true}   //notifications subnav
                    classInstance={this}/>

                    <NavScrollButtons
                    buttonID={2}
                    buttonText={"events"}
                    expandable={true}  //create event subnav?
                    classInstance={this}/>

                    <NavScrollButtons
                    buttonID={3}
                    buttonText={"discover"}
                    expandable={true}
                    classInstance={this}/>

                    <NavScrollButtons
                    buttonID={4}
                    buttonText={"messages"}
                    expandable={true}
                    classInstance={this}/>

                    <NavScrollButtons
                    buttonID={5}
                    buttonText={"profile"}
                    expandable={true}
                    classInstance={this}/>

                    <NavScrollButtons
                    buttonID={6}
                    buttonText={"settings"}
                    expandable={true}
                    classInstance={this}/>
                </ScrollView>
                </View>

                {/* This is the subNav, the content is generated inside NavContent */}
                <View style={{backgroundColor: "black", color: "white"}}>
                <NavContent
                classInstance={this}/>
                </View>
            </Animated.View>);
        }else{
            return(<View></View>);
        }
    
        
    }
}

const styles = StyleSheet.create({
    navBar:{
        flexDirection: "column",
        maxHeight: 90,
        minHeight: 90,
    },
    ScrollView:{
        flexDirection:"row",
        flex: 1,
        maxHeight: 40,
        minHeight: 40,
    },
    topNavBuffer:{
        minHeight: 30,
    }

});

const mapStateToProps = (store) => ({
    pageID: store.Global.pageID,
    showNav: store.Global.showNav,
    navHeight: store.Global.navHeight,
    colorNormal: store.Global.colorNormal,
    colorInverse: store.Global.colorInverse
});

const NavScreen = connect(mapStateToProps)(Nav);
export default NavScreen;