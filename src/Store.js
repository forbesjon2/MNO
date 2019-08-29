import {createStore} from "redux";
import reducer from "./redux/reducers/Index";
const store = createStore(reducer);
export default store;