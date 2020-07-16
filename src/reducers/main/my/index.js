import { combineReducers } from "redux";
import reservation from "./reservation";
import takeout from "./takeout";

export default combineReducers({
    reservation: reservation,
    takeout: takeout
});