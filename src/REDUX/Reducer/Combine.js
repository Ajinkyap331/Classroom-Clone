import Logged from './Login'
import Info from './loginDetails';
import Class from './Class'
import { combineReducers } from "redux";

const rootReducer = combineReducers({
    Log: Logged,
    info: Info,
    class : Class
})

export default rootReducer