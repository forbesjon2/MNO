import React from 'react';
import {Text, View, ScrollView, TouchableWithoutFeedback} from 'react-native';
import {CalendarList} from "react-native-calendars";
import NavigationService from "../../navigation/NavigationService";
import {styles} from "../../Styles";
import Store from "../../Store";
import {connect} from 'react-redux';
import {retrieveEvents} from "../../Networking";


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
            currentDate:new Date()
        }
        //set safe area background
        Store.dispatch({type:"SET_SAFE_AREA_BACKGROUND", payload:"#ffffff"});
    }

    componentWillMount(){
        if(Store.getState().Global.calendarData == null) retrieveEvents();
    }

    /*************************************************************************
     * This is used to show the list of events that are relevant to a certain
     * date in the events tab. Both are stored as variables in the redux store
     * 
     * calendarData: the JSON array of calendar events. See CalendarData.json
     *               file or the readme in the data folder for format info.
     * 
     * currentDate: the current date in YYYY-MM-DD format
     *************************************************************************/
    generateBasicEvents(){
        const {calendarData} = Store.getState().Global;
        const {currentDate} = this.state;
        let returnObj = [];
        let count = 0;
        for(let i in calendarData["events"]){
            let tempDate = new Date(calendarData["events"][i]["start_time"]);
            if(this.state.currentDate.toLocaleDateString() == tempDate.toLocaleDateString()){
                let startTime = tempDate.toLocaleTimeString()
                let endTime = (new Date(calendarData["events"][i]["end_time"])).toLocaleTimeString();
                returnObj.push(
                <TouchableWithoutFeedback key={count} onPress={() =>{
                    NavigationService.navigate("SingleEventView", {
                        "heading":calendarData["events"][i]["heading"],
                        "location":calendarData["events"][i]["location"], 
                        "start_time":calendarData["events"][i]["start_time"], 
                        "end_time":calendarData["events"][i]["end_time"], 
                        "description": calendarData["events"][i]["description"],
                        "attending": calendarData["events"][i]["attending"]});
                }}>
                            <View style={[styles.events_eventView]}>
                    <View style={styles.events_eventTimeView}>
                        <Text style={styles.events_eventTimeViewText}>{startTime}</Text>
                        <Text style={styles.events_eventTimeViewText}>{endTime}</Text>
                    </View>
                    <View style={styles.events_eventViewTwo}>
                        <Text style={styles.events_eventHeading} numberOfLines={1}>{calendarData["events"][i]["heading"]}</Text>
                        <Text style={styles.events_eventDescription} numberOfLines={1}>{calendarData["events"][i]["description"]}</Text>
                    </View>
                </View>
                </TouchableWithoutFeedback>
                );
                ++count;
                break;
            }
        }
        if(count > 0) return returnObj;
        
        //eventHeading, eventContent
        return(<Text style={[styles.events_eventHeading, {color:"black", marginLeft:12}]}>No events for today</Text>);
    }




    render(){
        var currentDate = this.state.currentDate;
        if(Store.getState().Global.calendarData == null){
            return(<View style={{flex:1,backgroundColor:"blue", top:0, bottom:0}}></View>);
        }else{
        return(
            <ScrollView style={{flex:1}}>
                <CalendarList
                // the generic style for the calendar
                style={{flex:1, minHeight:360}}
                // max amount of months allowed to scroll in the past
                pastScrollRange={1}
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
                onDayPress={(day) => this.setState({currentDate: new Date(day.dateString)})}
                // this is the current day. Different from markedDates
                current={this.state.currentDate}
                // markedDates are important TODO add functionality for marked dates
                markingType={"custom"}
                markedDates={{
                [this.state.currentDate.toISOString().split("T")[0]]: {customStyles:{text:{color: "white",},
                    container:{borderRadius: 0,elevation: 10,backgroundColor:"#0A60E2",shadowColor: "blue",shadowOffset:{width: 3, 
                        height: 3},shadowRadius: 2,}},selected: true,}}}/>

                {this.generateBasicEvents()}
            </ScrollView>
        );
    }
    }
};

const mapStateToProps = (store) =>({
    calendarData: store.Global.calendarData,
});

const EventsScreen = connect(mapStateToProps)(Events);
export default EventsScreen;