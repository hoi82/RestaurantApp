import { combineReducers } from "redux";
import dialog from "./common/dialog";
import { connectRouter } from "connected-react-router";
import { auth } from "./auth";
import main from "./main";
import register from "./register";

//NOTE: Redux-form의 리듀서는 싱글톤으로 가급적 루트에 존재해야함. 
//만약 하위에 집어넣고 싶다면 reduxForm wrapper에 해당 위치에서 reducer를 가져오도록 해야함
//예: reduxForm({(state) => state.blah.blah})(MyComponent)
const app = (history) => combineReducers(
    {   
        auth: auth,
        shared: combineReducers({
            dialog: dialog
        }),           
        register: register,
        main: main,
        router: connectRouter(history),        
    }
)

export default app;