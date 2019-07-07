import {FlatList, View, Text, TouchableWithoutFeedback, StyleSheet} from "react-native";
import React from "react";


/************************************************************************* 
 * Methodology:
 * we are using FlatList, a more perfromant interface for rendering
 * lists than scrollview
 * 
 * Design notes
 * date is khula bold, rest is didact gothic regular
 * 
 * Future implementation notes
 *      you dont have a designed schedule list yet... thats what we need
 * to add to this next. store dateFormatter data in the state. 
 * 
 * example from https://facebook.github.io/react-native/docs/flatlist#docsNav
 *************************************************************************/
class DateElement extends React.PureComponent{
    _onPress = () =>{
        this.props.buttonRegister(this.props.id);
    }
    render(){
        let isSelected = (this.props.selected == this.props.id);
    return(
    <TouchableWithoutFeedback onPress={this._onPress}>
        <View style={[{backgroundColor:[isSelected ? "white" :"#242323"]}, styles.dateElementView]}>
            <View style={styles.dayOfWeekView}><Text style={[{color:[isSelected ? "black" : "white"]}, styles.dayOfWeekText]}>{this.props.dayOfWeek}</Text></View>
        <View style={styles.dayOfMonthView}><Text style={[{color:[isSelected ? "black" : "white"]},styles.dayOfMonthText]}>{this.props.dayOfMonth}</Text></View></View>
    </TouchableWithoutFeedback>);
    }
}

export default class MiniCalendar extends React.PureComponent{
    state = {calendarHeader:"Loading...", selectedID:0}

    _keyExtractor = (item) => item["id"].toString();

    _onViewableItemsChanged = ({viewableItems, changed}) => {
        this.setState({calendarHeader: viewableItems[0]["item"]["month"].toString()});
    }

    _renderItem = ({item, index, separators}) => (
        <DateElement
        id={item["id"].toString()}
        buttonRegister={(id) =>{this.setState({selectedID:id});}}
        selected={this.state.selectedID}
        dayOfWeek={item["dayOfWeek"]}
        dayOfMonth={item["dayOfMonth"]}
        />
    );

    render(){
        return(
    <View style={{height:150, backgroundColor:"black", flexDirection:"column", marginTop:10}}>
        <View style={{flexDirection:"row"}}><Text style={styles.calendarHeader}>{this.state.calendarHeader}</Text></View>
        <FlatList style={{flexDirection:"row"}} horizontal={true}
            data={dateFormatter(1)}
            viewabilityConfig={this.viewabilityConfig}
            onViewableItemsChanged={this._onViewableItemsChanged}
            keyExtractor={this._keyExtractor}
            windowSize={2}
            disableVirtualization={true}
            renderItem={this._renderItem}/>
    </View>
        );
    }
}

const styles = StyleSheet.create({
    dateElementView:{
        height:74,
        marginHorizontal:10,
        width:56,
        borderRadius:10,
        flexDirection:"column",
        flex:1,
    },
    dayOfWeekView:{
        flexDirection:"row",
        flex:3,
        alignSelf:"center",
        padding:3,
    },
    dayOfWeekText:{
        textAlign:"center",
        fontFamily: "DidactGothic-Regular",
        fontSize:20,
    },
    dayOfMonthText:{
        textAlign:"center",
        fontFamily: "DidactGothic-Regular",
        fontSize:30,
    },
    dayOfMonthView:{
        flexDirection:"row",
        flex:5,
        alignSelf:"center",
        padding:3,
    },
    calendarHeader:{
        color:"white",
        marginLeft:10,
        marginBottom:10,
        fontFamily:"Khula-Bold",
        fontSize:26,
        padding:4
    }
});


/*********************************************************************
 * This takes an integer representing how many months in the future
 * this will calculate the days. The default is 1 which counts the
 * current month (month 0) and the next month.
 * 
 * It will return a JSON object with the following
 * [{"dayOfMonth":"<dayOfMonthInt>", "dayOfWeek":"<dayOfWeek>", "month":<Month, Year>}]
 * 
 * Note: dayOfMonth is an integer representing the day of month. Ex 21
 *       Day of week is straight from dayOfWeekArray
  *********************************************************************/
 function dateFormatter(monthsFromNow){
    const monthArray = ["Janurary", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
    const dayOfWeekArray = ["SUN", "MON", "TUE", "WED", "THR", "FRI", "SAT"];
    let date = new Date();
    let day = date.getDate();
    let currentMonth = 0;
    let dayOfWeek = Number(date.getDay());
    let daysInMonth = new Date(date.getFullYear(), date.getMonth(), 0).getDate();
    let dayArray =[];
    let id = 0;
    while(currentMonth <= monthsFromNow){
      if(currentMonth > 0) day = 1;   //set the day to the first day of the month if its not the current month
      while(day <= daysInMonth){
        dayArray.push({"id":id, "dayOfMonth":day,"dayOfWeek":dayOfWeekArray[dayOfWeek], "month": monthArray[date.getMonth()] + " " +  date.getFullYear()});
        ++dayOfWeek;
        if(dayOfWeek == 7) dayOfWeek = 0;   //reset day of week to 0 if the day of week is 7 ("SUN")
        ++day;
        ++id;
      }
      date = new Date(date.getFullYear(), date.getMonth()+1, 1);
      ++currentMonth;
      }
     return dayArray;
  }