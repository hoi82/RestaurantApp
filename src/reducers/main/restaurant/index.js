import { combineReducers } from "redux";
import details from "./details";
import reviews from "./reviews";

export default combineReducers({
    details: details,
    reviews: reviews,    
});