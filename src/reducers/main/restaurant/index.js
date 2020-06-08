import { combineReducers } from "redux";
import details from "./details";
import reviews from "./reviews";
import review from "./review";

export default combineReducers({
    details: details,
    reviews: reviews,
    review: review
});