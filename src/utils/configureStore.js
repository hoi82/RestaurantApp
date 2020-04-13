import { applyMiddleware, createStore, compose } from "redux"
import app from "../reducers";
import { isServer, isDevelopment } from "../config/env";
import { createMemoryHistory, createBrowserHistory } from "history";
import { routerMiddleware } from "connected-react-router";

export const configureStore = ({ initialState, url }) => {
    const history = isServer ? createMemoryHistory({
        initialEntries: [url || "/"],
    })
    : createBrowserHistory();
    const middlewares = [routerMiddleware(history)];
    const composeEnhancers = (isDevelopment && !isServer && window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__) ||
    compose;
    const enhancers =  composeEnhancers(
        applyMiddleware(...middlewares)
    );
    const store = createStore(app(history),
        initialState || {},
        enhancers
    );    

    if (module.hot) {
        module.hot.accept("../reducers/", () => {
            try {
                const nextReducer = require("../reducers").default;

                store.replaceReducer(nextReducer(history));
            } catch (error) {
                console.log(`🥵 Reducer hot reloading error`);
            }
        })
    }

    return { store, history };
} 