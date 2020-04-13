import React from "react";
import { loadableReady } from "@loadable/component";
import { hydrate, render } from "react-dom";
import App from "./components/App";
import { BrowserRouter } from "react-router-dom";
import { configureStore } from "./utils/configureStore";
import { Provider } from "react-redux";

const root = document.getElementById("root");

const store = configureStore();

const renderMethod = module.hot ? render : render;

loadableReady(()=> {
    renderMethod(
        <Provider store={store}>
            <BrowserRouter>
                <App/>
            </BrowserRouter>
        </Provider>                
        , root
    );
});

if (module.hot) {
    module.hot.accept("./components/App.js", () => {
        const NextApp = require("./components/App.js").default;
        render(<Provider store={store}>
            <BrowserRouter>
                <NextApp/>
            </BrowserRouter>
        </Provider> , document.getElementById("root"));
    })
    // module.hot.accept("./components/App.js,", ()=> {
    //     render(<App/>, root);
    // })
}