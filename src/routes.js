import { endpoint } from "./config/url";
import App from "./app";
import { asyncMain, asyncLogin, asyncRegister } from "./pages";

// const Login = loadable(() => import("./pages/Login/Login"));

// const Register = loadable(() => import("./pages/Register/Register"));

// const Main = loadable(() => import("./components/main/Main.js"));

export default [
    {
        component: App,
        routes: [
            {
                path: endpoint.home,
                exact: true,
                component: asyncMain
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

// const addExact = (routes) => {        
//     return routes.map(route => {
//         return route.path !== endpoint.notFound 
//         ? {
//             ...route,
//             exact: true
//         }
//         : route
//     });    
// };

// export default addExact([
//     {
//         path: endpoint.login,
//         component: Login
//     },
//     {
//         path: endpoint.register,
//         component: Register
//     },  
//     {
//         path:endpoint.home,
//         component: Main
//     }  
// ]);