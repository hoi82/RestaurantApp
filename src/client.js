import React from "react";
import ReactDOM from "react-dom";
import { loadableReady } from "@loadable/component";
import { configureStore } from "./utils/configureStore";
import { Provider } from "react-redux";
import { AppContainer } from "react-hot-loader";
import { ConnectedRouter } from "connected-react-router";
import { renderRoutes } from "react-router-config";
import routes from "./routes";

const root = document.getElementById("root");

const initialState = window.__INITIAL_STATE__;
const { store, history } = configureStore({ initialstate: {} });

const render = (routes) => {
    const renderMethod = module.hot ? ReactDOM.render : ReactDOM.hydrate;    
    renderMethod(
        <AppContainer>
            <Provider store={store}>
                <ConnectedRouter history={history}>
                    {renderRoutes(routes)}
                </ConnectedRouter>                    
            </Provider>
        </AppContainer>
        , root
    )
};

loadableReady(()=> {
    render(routes);
});

if (module.hot) {
    module.hot.accept("./routes", () => {
        try {
            const nextRoutes = require("./routes").default;

            render(nextRoutes);
        } catch (error) {
            console.error(`🥵 Routes hot reloading error! ${error}`);
        }
    });    
}