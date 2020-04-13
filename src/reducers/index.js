import { combineReducers } from "redux";
import payments from "./register/payments";
import profile from "./register/profile";
import creditCard from "./register/creditCard";
import paypal from "./register/paypal";
import regNavi from "./register/registerNavigation";
import dialog from "./common/dialog";
import { connectRouter } from "connected-react-router";

const app = (history) => combineReducers(
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
        }),
        router: connectRouter(history)
    }
)

export default app;