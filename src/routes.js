import { endpoint } from "./config/url";
import App from "./app";
import { asyncMain, asyncLogin, asyncRegister, asyncSearchByName, asyncSearchByCategory, NotFound } from "./pages";
import { asyncSearchByLocation } from "./pages/Main/Restaurant/Search";

export default [
    {
        component: App,
        routes: [
            {
                path: endpoint.home,                          
                component: asyncMain,     
                routes: [
                    {
                        path: endpoint.searchRestaurantByName,
                        component: asyncSearchByName,
                        exact: true
                    },   
                    {
                        path: endpoint.searchRestaurantByCategory,
                        component: asyncSearchByCategory,
                        exact: true
                    },
                    {
                        path: endpoint.searchRestaurantByLocation,
                        component: asyncSearchByLocation,
                        exact: true
                    }                 
                ]
            },
            {
                path: endpoint.login,                
                component: asyncLogin,
                exact: true
            },
            {
                path: endpoint.register,                
                component: asyncRegister,
                exact: true
            },
            {
                path: endpoint.notFound,
                component: NotFound,
            }
        ]
    }
];