import { combineReducers } from "redux";
import restaurant from "./restaurant";
import menu from "./menu";

export default combineReducers({
    restaurant: restaurant,
    menu: menu
});