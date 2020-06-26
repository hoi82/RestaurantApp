import { combineReducers } from "redux";
import search from "./search";
import reservation from "./reservation";
import restaurant from "./restaurant";
import favorite from "./favorite";
import menu from "./menu";
import takeout from "./takeout";

export default combineReducers({
    search: search,
    restaurant: restaurant,
    reservation: reservation,
    favorite: favorite,
    menu: menu,    
    takeout: takeout
})