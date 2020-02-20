import ReactDOM from "react-dom";
import React from "react";
import App from "./components/App";
import { createStore } from "redux";
import { Provider } from "react-redux";
import app from "./reducers/index";

const store = createStore(app);

ReactDOM.render(
    <Provider store={store}>
        <App/>
    </Provider>, 
    document.getElementById("root"));