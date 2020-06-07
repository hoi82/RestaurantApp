import { endpoint } from "./config/url";
import path from "path";
import App from "./app";
import { asyncMain, asyncLogin, asyncRegister, asyncSearchByName, asyncSearchByCategory, NotFound } from "./pages";
import { asyncSearchByLocation } from "./pages/Main/Restaurant/Search";
import { GetAllCategories } from "./actions/main/search";
import { asyncResultByName, asyncResultByCategory, asyncResultByLocation } from "./pages/Main/Restaurant/SearchResult";
import { asyncDetails } from "./pages/Main/Restaurant/Details";
import { asyncMenu } from "./pages/Main/Restaurant/Menu";
import { asyncNewReview } from "./pages/Main/Restaurant/Review";
import { asyncReservation } from "./pages/Main/Restaurant/Reservation";
import { asyncReservationResult } from "./pages/Main/Restaurant/ReservationResult";
import { asyncTakeout } from "./pages/Main/Restaurant/Takeout";
import { asyncFavorites } from "./pages/Main/Favorites";

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
                        exact: true,
                        loadData: () => [ GetAllCategories() ]
                    },
                    {
                        path: endpoint.searchRestaurantByLocation,
                        component: asyncSearchByLocation,
                        exact: true
                    },
                    {
                        path: path.resolve(endpoint.resultRestaurantByName, ":name"),
                        component: asyncResultByName,
                        exact: true
                    },
                    {
                        path: path.resolve(endpoint.resultRestaurantByCategory, ":category"),
                        component: asyncResultByCategory,
                        exact: true
                    },
                    {
                        path: endpoint.resultRestaurantByLocation,
                        component: asyncResultByLocation,
                        exact: true
                    },
                    {
                        path: path.resolve(endpoint.restaurantDetail, ":id"),
                        component: asyncDetails,
                        exact: true
                    },
                    {
                        path: path.resolve(endpoint.menuDetails, ":id"),
                        component: asyncMenu,
                        exact: true
                    },
                    {
                        path: endpoint.newReview,
                        component: asyncNewReview,
                        exact: true
                    },
                    {
                        path: path.resolve(endpoint.editReview, ":resid", ":id"),
                        component: asyncNewReview,
                        exact: true
                    },
                    {
                        path: path.resolve(endpoint.restaurantReservation, ":id"),
                        component: asyncReservation,
                        exact: true
                    },
                    {
                        path: path.resolve(endpoint.restaurantReservationResult, ":id"),
                        component: asyncReservationResult,
                        exact: true
                    },
                    {
                        path: path.resolve(endpoint.takeout, ":id"),
                        component: asyncTakeout,                        
                        exact: true
                    },
                    {
                        path: endpoint.favoriteRestaurants,
                        component: asyncFavorites,
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