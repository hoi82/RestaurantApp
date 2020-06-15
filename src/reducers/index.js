import { combineReducers } from "redux";
import payments from "./register/payments";
import profile from "./register/profile";
import creditCard from "./register/creditCard";
import paypal from "./register/paypal";
import regNavi from "./register/registerNavigation";
import dialog from "./common/dialog";
import { connectRouter } from "connected-react-router";
import { auth } from "./auth";
import { status } from "./register/status";
import main from "./main";

//NOTE: Redux-form의 리듀서는 싱글톤으로 가급적 루트에 존재해야함. 
//만약 하위에 집어넣고 싶다면 reduxForm wrapper에 해당 위치에서 reducer를 가져오도록 해야함
//예: reduxForm({(state) => state.blah.blah})(MyComponent)
const app = (history) => combineReducers(
    {   
        auth: auth,
        shared: combineReducers({
            dialog: dialog
        }),   
        register: combineReducers({
            status: status,
            profile: profile,
            payments: payments,
            credit: creditCard,
            paypal: paypal,
            navigation: regNavi
        }),
        main: main,
        router: connectRouter(history),        
    }
)

export default app;