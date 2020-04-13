import loadable from "@loadable/component";
import { endpoint } from "./config/url";

const Login = loadable(() => import(/* webpackPrefetch: true */ "./components/login/Login"));

const Register = loadable(() => import(/* webpackPrefetch: true */ "./components/register/Register"));

const Main = loadable(() => import(/* webpackPrefetch: true */"./components/main/Main.js"));

const addExact = (routes) => {        
    return routes.map(route => {
        return route.path !== endpoint.notFound 
        ? {
            ...route,
            exact: true
        }
        : route
    });    
};

export default addExact([
    {
        path: endpoint.login,
        component: Login
    },
    {
        path: endpoint.register,
        component: Register
    },  
    {
        path:endpoint.home,
        component: Main
    }  
]);