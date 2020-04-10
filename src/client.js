import React from "react";
import { loadableReady } from "@loadable/component";
import { hydrate } from "react-dom";
import App from "./components/App";
import { BrowserRouter } from "react-router-dom";
import { configureStore } from "./utils/configureStore";
import { Provider } from "react-redux";

const root = document.getElementById("root");

const store = configureStore();

loadableReady(()=> {
    hydrate(
        <Provider store={store}>
            <BrowserRouter>
                <App/>
            </BrowserRouter>
        </Provider>                
        , root
    );
});