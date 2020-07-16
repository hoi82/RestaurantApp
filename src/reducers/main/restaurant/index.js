import { combineReducers } from "redux";
import details from "./details";
import reviews from "./reviews";
import menus from "./menus";
import review from "./review";

export default combineReducers({
    details: details,
    reviews: reviews,    
    menus: menus,
    review: review
});