import { combineReducers } from "redux";
import details from "./details";
import reviews from "./reviews";
import menus from "./menus";

export default combineReducers({
    details: details,
    reviews: reviews,    
    menus: menus
});