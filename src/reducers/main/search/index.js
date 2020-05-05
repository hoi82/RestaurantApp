import { combineReducers } from "redux";
import name from "./name";
import category from "./category";
import location from "./location";
import result from "./result";

export default combineReducers({
    name: name,
    category: category,
    location: location,
    result: result
});