import { all, call, put, takeEvery} from "redux-saga/effects";
/*************************************************************************
* EVERYTHIGN is explained here
* https://github.com/forbesjon2/MNO/tree/master/data
* 
*************************************************************************/



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
        yield put({type: "SET_CALENDAR_DATA", payload: cd});
        yield put({type: "SET_CHATS", payload: ab});
        yield put({type: "SET_CHATS", payload: ct});
        yield put({type: "SET_HOME_DATA", payload: hd});
        yield put({type: "SET_MESSAGES_HOME", payload: mh});
        yield put({type: "SET_ACCOUNT_INFO", payload: ai});
        yield put({type: "SET_SERVER_DATA", payload: as});
        yield put({type: "SET_CURRENT_GROUP", payload: "" + hd["data"][0]["name"] + hd["data"][0]["servers"][0]["name"]});
    });
}





const initialization = function* initialization(){
    yield takeEvery("initialization", function*(action){
        loadLocalData();
    });
    
}




const Sagas = function* Sagas(){
    yield all([
        init(),
        initialization()
    ]);
};


export default Sagas;

// storeData = async () =>{
//     try{
//         await AsyncStorage.setItem("test", "testVal2ue");
//     }catch(e){
//         console.log(e);
//     }
// }

// ttest(){
//     test();
// }


// getData = async() =>{
//     try{
//         const value = await AsyncStorage.getItem("test");
//         if(value != null){
//             console.log(value);
//         }
//     }catch(e){
//         console.log(e);
//     }
// }