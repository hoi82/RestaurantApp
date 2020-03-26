import ReactDOM from "react-dom";
import React from "react";
import App from "./components/App";
import { createStore, applyMiddleware } from "redux";
import { Provider } from "react-redux";
import app from "./reducers/index";

const middleware = [];
const store = createStore(app, applyMiddleware(...middleware));

ReactDOM.render(
    <Provider store={store}>
        <App/>
    </Provider>
    , 
    document.getElementById("root"));