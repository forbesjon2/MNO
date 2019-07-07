import Sagas from "./redux/Sagas";
import createSagaMiddleware from "redux-saga";
import {applyMiddleware, createStore} from "redux";
import reducer from "./redux/reducers/Index";


const sagaMiddleware = createSagaMiddleware();
const middleware = [sagaMiddleware];

const store = createStore(reducer, applyMiddleware(...middleware));
sagaMiddleware.run(Sagas);

export default store;