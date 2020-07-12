import { combineReducers } from "redux";
import search from "./search";
import reservation from "./reservation";
import restaurant from "./restaurant";
import favorite from "./favorite";
import takeout from "./takeout";
import reservationResult from "./reservationResult";
import menu from "./menu";

export default combineReducers({
    search: search,
    restaurant: restaurant,
    reservation: reservation,
    reservationResult: reservationResult,
    favorite: favorite,
    menu: menu,
    takeout: takeout
})