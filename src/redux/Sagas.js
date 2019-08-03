import { all, call, put, takeEvery} from "redux-saga/effects";
import {INIT, SET_CURRENT_DATE, SET_GROUP_LAST_UPDATED, SET_HOME_GROUPS} from "./Actions";

    /*************************************************************************
    * EVERYTHIGN is explained here
    * https://github.com/forbesjon2/MNO/tree/master/data
    * 
    *************************************************************************/
const calendarData = "https://raw.githubusercontent.com/forbesjon2/MNO/master/data/CalendarData.json?token=AJWKVUJVYD6SFPTZXQVF2CK45LHJU";
const chats = "https://raw.githubusercontent.com/forbesjon2/MNO/master/data/Chats.json?token=AJWKVULG7KV5HHKKA4TEUWC45LHQE";
const homeData = "https://raw.githubusercontent.com/forbesjon2/MNO/master/data/HomeData.json?token=AJWKVUNQHYQUJHSWNBBWVDC46A74G";
const messagesHome = "https://raw.githubusercontent.com/forbesjon2/MNO/master/data/MessagesHome.json?token=AJWKVUNIFLLIHUBRLTMJDG245LHXA";
const accountInfo = "https://raw.githubusercontent.com/forbesjon2/MNO/master/data/AccountInfo.json?token=AJWKVUIHSP6IAEJWZTJ4NZC45VRNI";



//Handles Redux sagas for home Screen
const catchHomeUpdate = function* catchHomeUpdate(){
    yield takeEvery("SET_GROUP_LAST_UPDATED", function*(action){
        console.log("AB K ", action);
        

    });
}
const updateHomeGroups = function* updateHomeGroups(){
    yield takeEvery("SET_HOME_GROUPS", function*(action){
        yield put({type: SET_HOME_GROUPS, homeGroups: action.homeGroups});
    });
}



//random functions called in the loading screen for initialization
const init = function* init(){
    yield takeEvery("INIT", function*(action){
        // const cd = yield call(testGetCalendarData);
        // const ct = yield call(testGetChat);
        // const hd = yield call(testGetHomeData);
        // const mh = yield call(testGetMessagesHome);
        // const ai = yield call(testGetAccountInfo);
        const cd = require("../../data/CalendarData.json");
        const ct = require("../../data/Chats.json");
        const hd = require("../../data/HomeData.json");
        const mh = require("../../data/MessagesHome.json");
        const ai = require("../../data/AccountInfo.json");
        const ab = require("../../data/GroupData.json");
        const as = require("../../data/ServerData.json");
        yield put({type: "SET_A", payload: cd});
        yield put({type: "SET_B", payload: ab});
        yield put({type: "SET_C", payload: ct});
        yield put({type: "SET_D", payload: hd});
        yield put({type: "SET_E", payload: mh});
        yield put({type: "SET_AI", payload: ai});
        yield put({type: "SET_R", payload: as});
        yield put({type: "SET_CURRENT_GROUP", payload: "" + hd["data"][0]["name"] + hd["data"][0]["servers"][0]["name"]});
    });
}










const Sagas = function* Sagas(){
    yield all([
        catchHomeUpdate(),
        updateHomeGroups(),
        init()
    ]);
};





    
const testGetCalendarData = async function testGetCalendarData(){
    try{
        let response = await fetch(calendarData,);
        return await response.json();
    }catch(e){
        console.log("ERROR IN JSON request ", e);
        return e;
    }
}
const testGetChat = async function testGetChat(){
    try{
        let response = await fetch(chats,);
        return await response.json();
    }catch(e){
        console.log("ERROR IN JSON request ", e);
        return e;
    }
}
const testGetHomeData = async function testGetHomeData(){
    try{
        let response = await fetch(homeData,);
        return await response.json();
    }catch(e){
        console.log("ERROR IN JSON request ", e);
        return e;
    }
}
const testGetMessagesHome = async function testGetMessagesHome(){
    try{
        let response = await fetch(messagesHome,);
        return await response.json();
    }catch(e){
        console.log("ERROR IN JSON request ", e);
        return e;
    }
}
const testGetAccountInfo = async function testGetAccountInfo(){
    try{
        let response = await fetch(accountInfo,);
        return await response.json();
    }catch(e){
        console.log("ERROR IN JSON request ", e);
        return e;
    }
}


export default Sagas;