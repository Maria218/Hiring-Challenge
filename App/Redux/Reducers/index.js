import { combineReducers } from "redux";
import { studentReducer } from "./students";
import { resultReducer } from "./results";

const rootReducer = combineReducers({
    studentReducer,
    resultReducer
})

export default rootReducer;
