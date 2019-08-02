import React from 'react';
import {ScrollView, View, Animated, PanResponder, Dimensions, Text, TouchableWithoutFeedback, Keyboard} from 'react-native';
import NavigationService from "../navigation/NavigationService";
import {styles} from "../Styles";
import NavContent from "./NavContent";
import Store from "../Store";


/*************************************************************************
 * Nav provides the highest level approach to the bottom navBar
 * 
 *************************************************************************/
export default class Nav extends React.Component{
    constructor(props){
        super(props);
        const minHeight = 60;
        const distPercent = 0;
        const height = Dimensions.get("window").height;
        const navHeight = [0, 250, 600, 500, 60, 400]; //not zero indexed, the leading zero is filler
        /*************************************************************************
         * panResponder handles
         * Some redux variables need the latest value. in which case it has to be
         * referenced at that instance
         *************************************************************************/
        const panResponder = PanResponder.create({
            onStartShouldSetPanResponder: (evt, gesture) => true,
            onMoveShouldSetPanResponder: (evt, gestureState) => true,
            onPanResponderMove: (evt, gesture) => {
                const {pageID} = Store.getState().Global;
                let currentHeight = height - gesture.moveY;
                if(navHeight[pageID] > currentHeight && currentHeight > minHeight){
                    let percent = (currentHeight - minHeight)/(navHeight[pageID]-minHeight);
                    this.setState({distPercent: percent});
                    this.colorCalculator(false, 0);
                    this.moveNav(currentHeight, false);
                }
            },
            onPanResponderRelease: (evt, gesture) => {
                const {pageID} = Store.getState().Global;
                let currentHeight = height - gesture.moveY;
                if(navHeight[pageID] > currentHeight && currentHeight > minHeight){
                    let percent = (currentHeight - minHeight)/(navHeight[pageID]-minHeight);
                    if(percent > 0.5){
                        this.setState({distPercent: 1});
                        this.moveNav(navHeight[pageID], true);
                    }else{
                        this.moveNav(minHeight, true);
                        this.setState({distPercent:0});
                    }
                }
            }
        });
        
        this.state = {
            colorInverse:"#FFFFFF",
            colorNormal: "#000000",
            navHeight: navHeight,
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
        var distPercent = [override ? toValue : this.state.distPercent];
        this.setState({
            colorNormal: colorArray[Math.round(distPercent * (colorArray.length - 1))],
            colorInverse: colorArrayInverse[Math.round(distPercent * (colorArrayInverse.length - 1))]
        });
    }

     /*************************************************************************
     * this handles the animation logic for the nav
     * 
     * value = how far you want to open the nav to
     *          60 = closed, anything over 60 is open to that degree
     *
     * duration = how long you want the transistion to last in ms
     *          this is usually at 500 for normal or 200 for fast
     **************************************************************************/
    moveNav(value, transition){
        const {dist, navHeight} = this.state;
        const {pageID} = Store.getState().Global;
        const minHeight = 60;
        if(transition){
            Animated.timing(
                dist,{
                toValue: value,
                duration: 200,}
            ).start();
        }else{
            Animated.timing(
                dist,{
                toValue: value,
                duration: 0,}
            ).start();
        }
        let percent = (value - minHeight)/(navHeight[pageID]-minHeight);
        this.colorCalculator(true, percent);
    }



     /*************************************************************************
     * Styles & creates the content for the horizontally aligned scroll buttons
     * 
     * 
     * @param buttonText    text that appears on that specific button
     * 
     * @param currentID      ID representing what page # to navigate to when the
     *                      button is pressed
     * 
     * @param expandable    Determines whether or not the particular nav
     *                      component is expandable & has a subnav to display
     * 
     * @param routeName     Name of the route to navigate to when this button
     *                      is pressed. This is similar, but not identical
     *                      to the buttonText. A list of routeNames can be found
     *                      in the properties listed in /src/Navigation/AppRoutes
     **************************************************************************/
    createNavScrollButtons(buttonText, currentID, expandable, routeName){
        const {pageID} = Store.getState().Global;
        var {colorInverse, colorNormal} = this.state;
        //checks if the button is selected
        var buttonSelected, textOpacity;
        {currentID == pageID ? buttonSelected = true : buttonSelected = false}
        {buttonSelected ? textOpacity = 1 : textOpacity = 0.4}
        return(
            <TouchableWithoutFeedback 
            onPress={() => this.navItemPresed(currentID, expandable, routeName)}>
                <View style={[styles.nav_viewModule, {backgroundColor: colorInverse}]}>
                    <Text style={[styles.nav_navButton, {opacity: textOpacity, backgroundColor: colorInverse, color: colorNormal}]}>{buttonText}</Text>
                </View>
            </TouchableWithoutFeedback>
        );
    }

     /*************************************************************************
     * Handles the navigation logic when the navButton is pressed.
     * 
     * 
     * @param currentID      ID representing what page # to navigate to when the
     *                      button is pressed
     * 
     * @param expandable    Determines whether or not the particular nav
     *                      component is expandable & has a subnav to display
     * 
     * @param routeName     Name of the route to navigate to when this button
     *                      is pressed. This is similar, but not identical
     *                      to the buttonText. A list of routeNames can be found
     *                      in the properties listed in /src/Navigation/AppRoutes
     **************************************************************************/
    navItemPresed(currentID, expandable, routeName){
        const {pageID} = Store.getState().Global;
        const {dist, navHeight} = this.state;
        //handle recurrent presses
        if(pageID == currentID && expandable == true) {
            if(dist._value == 60){
                this.moveNav(navHeight[pageID], true);
                this.colorCalculator(true, 1);
            }else{
                this.moveNav(60, true);
                this.colorCalculator(true, 0);
            }

        //close subnav, reset color, navigate to the route
        }else{
            this.moveNav(60, true);
            this.colorCalculator(true, 0);
            NavigationService.navigate(routeName);
            Store.dispatch({type: "SET_PAGE", id:currentID});
        }
    }


    render(){
        const {dist, colorNormal, colorInverse} = this.state;
        const {showNav} = Store.getState().Global;
        let handles = this.state.panResponder.panHandlers;
        if(showNav == true){
        return(
        <TouchableWithoutFeedback onPressOut={() => Keyboard.dismiss()}>
        <Animated.View style={[{height: dist}]}>
            {/* The view above doesnt respond to gestures but the content inside does */}
                <View style={[styles.nav_navBar, {backgroundColor: colorInverse}]}>
                    <View {...handles}>
                        <Text style={[styles.nav_dragLine,{color:colorNormal}]}>────────</Text>
                    </View>
                <ScrollView
                horizontal={true}
                showsHorizontalScrollIndicator={false}
                keyboardDismissMode={"on-drag"}
                style={[styles.nav_scrollView, {backgroundColor:colorInverse}]}>
                    {this.createNavScrollButtons("home", 1, true, "Home")}
                    {this.createNavScrollButtons("events", 2, true, "Events")}
                    {this.createNavScrollButtons("discover", 3, true, "Discover")}
                    {/* {this.createNavScrollButtons("messages", 4, true, "Messages")} */}
                    {this.createNavScrollButtons("profile", 4, true, "Profile")}
                    {this.createNavScrollButtons("Settings", 5, true, "Settings")}
                </ScrollView>
                </View>

                {/* This is the subNav, the content is generated inside NavContent */}
                <View style={{backgroundColor: "black", color: "white"}}>
                    <NavContent />
                </View>
            </Animated.View>
            </TouchableWithoutFeedback>);
        }else{
            return(<View></View>);
        }       
    }
}