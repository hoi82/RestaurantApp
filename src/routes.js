import { endpoint } from "./config/url";
import App from "./app";
import { asyncMain, asyncLogin, asyncRegister, asyncSearchByName, asyncSearchByCategory } from "./pages";

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
                        component: asyncSearchByName
                    },   
                    {
                        path: endpoint.searchRestaurantByCategory,
                        component: asyncSearchByCategory
                    }                 
                ]
            },
            {
                path: endpoint.login,                
                component: asyncLogin
            },
            {
                path: endpoint.register,                
                component: asyncRegister
            }
        ]
    }
];