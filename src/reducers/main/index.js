import { combineReducers } from "redux";
import search from "./search";
import details from "./details";

export default combineReducers({
    search: search,
    details: details
})