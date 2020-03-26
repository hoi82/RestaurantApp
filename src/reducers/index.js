import { combineReducers } from "redux";
import payments from "./register/payments";
import profile from "./register/profile";
import creditCard from "./register/creditCard";
import paypal from "./register/paypal";
import regNavi from "./register/registerNavigation";
import dialog from "./common/dialog";

const app = combineReducers(
    {   
        shared: combineReducers({
            dialog: dialog
        }),   
        register: combineReducers({
            profile: profile,
            payments: payments,
            credit: creditCard,
            paypal: paypal,
            navigation: regNavi
        })
    }
)

export default app;