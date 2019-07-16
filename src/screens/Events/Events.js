import React from 'react';
import {Text, View, ScrollView, TouchableWithoutFeedback} from 'react-native';
import { connect } from "react-redux";
import {CalendarList} from "react-native-calendars";
import NavigationService from "../../navigation/NavigationService";
import {styles} from "../../Styles";

/**
 * REFERENCES
 * https://github.com/wix/react-native-calendars/blob/master/src/calendar/header/style.js#L4
 * https://github.com/wix/react-native-calendars#advanced-styling
 * 
 * snap calendar using react-native-snap-carousel
 */
class Events extends React.Component{
    static navigationOptions = ({navigation}) => ({
        title: "Events",
        header: null,
    });
    constructor(props){
        super(props);
        this.state = {
        }
        //set safe area background
        this.props.dispatch({type:"SET_SAFE_AREA_BACKGROUND", payload:"#ffffff"});
    }
    render(){
        const {currentDate, calendarData} = this.props;
        return(
            <ScrollView style={{flex:1}}>
                <CalendarList
                // the generic style for the calendar
                style={{flex:1, minHeight:360}}
                // max amount of months allowed to scroll in the past
                pastScrollRange={2}
                // max amount of months allowed to scroll in the future
                futureScrollRange={3}
                // use horizontal scrolling
                horizontal={true}
                // overriding default calendar styles
                theme={{
                    'stylesheet.calendar-list.main':{
                        // the placeholder appears when you scroll really fast
                        placeholderText:{
                            fontFamily: "DidactGothic-Regular",
                            color: "gray",
                            marginBottom: 30,
                            fontSize: 42,
                        },
                        // this is everything outside of the date numbers window
                        container:{
                        },
                        calendar:{
                        }
                    },
                    "stylesheet.calendar.header":{
                        header:{
                            alignItems:"flex-start",
                            marginLeft: 10,
                        },
                        monthText:{
                            fontFamily: "DidactGothic-Regular",
                            color: "black",
                            marginBottom: 30,
                            fontSize: 42,
                        }
                    }
                }}

                // the list of items that have to be displayed in agenda. If you want to render item as empty date

                // handle event when date is pressed
                onDayPress={(day) => this.props.dispatch({type: "DISPATCH_CURRENT_DATE", currentDate: day.dateString})}
                // this is the current day. Different from markedDates
                current={currentDate}
                // markedDates are important TODO add functionality for marked dates
                markingType={"custom"}
                markedDates={{
                [currentDate]: {customStyles:{text:{color: "white",},
                    container:{borderRadius: 0,elevation: 10,backgroundColor:"#0A60E2",shadowColor: "blue",shadowOffset:{width: 3, 
                        height: 3},shadowRadius: 2,}},selected: true,}}}/>

                {generateBasicEvents(calendarData, currentDate)}
            </ScrollView>
        );
    }
};


/*************************************************************************
 * This is used to show the list of events that are relevant to a certain
 * date in the events tab. Both are stored as variables in the redux store
 * 
 * @param {*} calendarData  the JSON array of calendar events. See 
 * CalendarData.json file or the readme in the data folder for format
 * information
 * 
 * @param {*} currentDate   the current date in YYYY-MM-DD format
 *************************************************************************/
function generateBasicEvents(calendarData, currentDate){
    let returnObj = [];
    let count = 0;
    for(let i in calendarData["dates"]){
        if(calendarData["dates"][i]["date"] == currentDate){
            for(let j in calendarData["dates"][i]["events"]){    
            returnObj.push(
            <TouchableWithoutFeedback key={count} onPress={() =>{
                NavigationService.navigate("SingleEventView", {
                    "heading":calendarData["dates"][i]["events"][j]["heading"],
                    "location":calendarData["dates"][i]["events"][j]["location"], 
                    "start_time":calendarData["dates"][i]["events"][j]["start_time"], 
                    "end_time":calendarData["dates"][i]["events"][j]["end_time"], 
                    "description": calendarData["dates"][i]["events"][j]["description"],
                    "attending": calendarData["dates"][i]["events"][j]["attending"],
                    "date": currentDate});
            }}>
                        <View style={[styles.events_eventView]}>
                <View style={styles.events_eventTimeView}>
                    <Text style={styles.events_eventTimeViewText}>{calendarData["dates"][i]["events"][j]["start_time"]}</Text>
                    <Text style={styles.events_eventTimeViewText}>{calendarData["dates"][i]["events"][j]["end_time"]}</Text>
                </View>
                <View style={styles.events_eventViewTwo}>
                    <Text style={styles.events_eventHeading} numberOfLines={1}>{calendarData["dates"][i]["events"][j]["heading"]}</Text>
                    <Text style={styles.events_eventDescription} numberOfLines={1}>{calendarData["dates"][i]["events"][j]["description"]}</Text>
                </View>
            </View>
            </TouchableWithoutFeedback>
            );
            ++count;
            }
            break;
        }
    }
    if(count > 0) return returnObj;
    
    //eventHeading, eventContent
    return(<Text style={[styles.events_eventHeading, {color:"black", marginLeft:12}]}>No events for today</Text>);
}

const mapStateToProps = (store) => ({
    currentDate: store.Global.currentDate,
    events: store.Global.events,
    calendarData: store.Global.calendarData
});

const eventsScreen = connect(mapStateToProps)(Events);
export default eventsScreen;