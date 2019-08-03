import React from "react";
import {View, Platform, Text, TouchableWithoutFeedback, TimePickerAndroid, DatePickerIOS} from 'react-native';
import Store from "../../Store";


export default class TimePicker extends React.Component{
    constructor(props){
        super(props);
        
        this.state = {
          chosenDate: new Date(),
        }
        this.openTimePicker = this.openTimePicker.bind(this);
    }

    async openTimePicker(isStartEvent){
        try {
            const {action, hour, minute} = await TimePickerAndroid.open({
              hour: 14,
              minute: 0,
              is24Hour: false, // Will display '2 PM'
            });
            if (action !== TimePickerAndroid.dismissedAction) {
              // Selected hour (0-23), minute (0-59)
              if(isStartEvent){
                Store.dispatch({type:"SET_START_EVENT_TIME", payload: hour + ":" + minute});
              }else{
                Store.dispatch({type:"SET_END_EVENT_TIME", payload: hour + ":" + minute});
              }
            }
          } catch ({code, message}) {
            console.warn('Cannot open time picker', message);
          }
        }

    render(){
    const {isStart} = this.props;
    const {startEventTime, endEventTime} = Store.getState().Global;

    if(Platform.OS === 'ios'){
    return(
        <View style={{backgroundColor:"blue"}}>
            <DatePickerIOS
            date={this.state.chosenDate}
            onDateChange={(date) => this.setState({chosenDate: date})}
            minuteInterval={5}
            mode={"time"}
            />
        </View>
    );
    }else{
        return(
        <View>
            <TouchableWithoutFeedback onPress={() => this.openTimePicker(isStart)}>
                <View style={{height: 35, borderColor: 'gray', borderWidth: 1, marginLeft:10, marginRight:30, borderRadius:5}}>
                    <Text style={{color:"white", flexDirection:"column", fontFamily: "Khula-Light", fontSize:21, textAlign:"center"}}>
                    {[isStart ? startEventTime : endEventTime]}
                    </Text>
                </View>
            </TouchableWithoutFeedback>
        </View>
        );
    }
    }
}