import { combineReducers } from "redux";
import profile from "./profile";
import payments from "./payments";
import regNavi from "./registerNavigation";
import creditCard from "./creditCard";
import paypal from "./paypal";

const register = combineReducers({
    profile: profile,
    payments: payments,
    credit: creditCard,
    paypal: paypal,
    navigation: regNavi
});

export default register;