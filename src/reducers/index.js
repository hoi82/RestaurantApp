import { combineReducers } from "redux";
import register from "./register";

const app = combineReducers({
    register : register
});

export default app;