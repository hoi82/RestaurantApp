import { applyMiddleware, createStore } from "redux"
import app from "../reducers";

export const configureStore = (initialstate = null) => {
    const middlewares = [];
    const middleware = applyMiddleware(...middlewares);
    const store =  initialstate == null 
        ? createStore(app, middleware)
        : createStore(app, initialstate, middleware);

    return store;
} 