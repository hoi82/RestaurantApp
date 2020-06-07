import { combineReducers } from "redux";
import search from "./search";
import reservation from "./reservation";
import restaurant from "./restaurant";

export default combineReducers({
    search: search,
    restaurant: restaurant,
    reservation: reservation
})