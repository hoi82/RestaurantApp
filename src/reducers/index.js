import { combineReducers } from "redux";
import register from "./register";
import regNavi from "./registerNavigation";

const app = combineReducers({
    register : register,
    registerNavigation: regNavi
});

export default app;