import { endpoint } from "./config/url";
import path from "path";
import App from "./app";
import { asyncMain, asyncRegister, asyncSearchByName, asyncSearchByCategory, NotFound } from "./pages";
import { asyncSearchByLocation } from "./pages/Main/Restaurant/Search";
import { GetAllCategories } from "./actions/main/search";
import { asyncSearchResult } from "./pages/Main/Restaurant/SearchResult";
import { asyncDetails } from "./pages/Main/Restaurant/Details";
import { asyncMenu } from "./pages/Main/Restaurant/Menu";
import { asyncReviewForm } from "./pages/Main/Restaurant/Review";
import { asyncReservation } from "./pages/Main/Restaurant/Reservation";
import { asyncReservationResult } from "./pages/Main/Restaurant/ReservationResult";
import { asyncTakeout } from "./pages/Main/Restaurant/Takeout";
import { asyncTakeoutResult } from "./pages/Main/TakeoutResult";
import { asyncFavoriteRestaurants } from "./pages/Main/Favorites";
import { asyncOptions } from "./pages/Options";
import { asyncMyReservations, asyncMyTakeouts } from "./pages/Main/My";

export default [
    {
        component: App,
        routes: [
            {
                path: [endpoint.searchMain, endpoint.restaurantMain, endpoint.searchResultMain, 
                    endpoint.reviewMain, endpoint.reservationMain, endpoint.menuMain, endpoint.takeoutMain, endpoint.myMain],
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
                        component: asyncSearchResult,
                        exact: true
                    },
                    {
                        path: path.resolve(endpoint.resultRestaurantByCategory, ":category"),
                        component: asyncSearchResult,
                        exact: true
                    },
                    {
                        path: endpoint.resultRestaurantByLocation,
                        component: asyncSearchResult,
                        exact: true
                    },
                    {
                        path: endpoint.restaurantDetail,
                        component: asyncDetails,
                        exact: true
                    },
                    {
                        path: endpoint.newReview,
                        component: asyncReviewForm,
                        exact: true
                    },
                    {
                        path: endpoint.editReview,
                        component: asyncReviewForm,
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
                        path: path.resolve(endpoint.menuDetails, ":id"),
                        component: asyncMenu,
                        exact: true
                    },                                        
                    {
                        path: path.resolve(endpoint.takeout, ":id"),
                        component: asyncTakeout,                        
                        exact: true
                    },
                    {
                        path: endpoint.favoriteRestaurants,
                        component: asyncFavoriteRestaurants,
                        exact: true
                    },
                    {
                        path: endpoint.takeoutResult,
                        component: asyncTakeoutResult,
                        exact: true
                    },
                    {
                        path: endpoint.myReservations,
                        component: asyncMyReservations,
                        exact: true
                    },
                    {
                        path: endpoint.myTakeouts,
                        component: asyncMyTakeouts,
                        exact: true
                    }
                ]
            },
            {
                path: "/",
                component: asyncMain,
                exact: true
            },
            {
                path: endpoint.register,                
                component: asyncRegister,
                exact: true
            },
            {
                path: endpoint.options,
                component: asyncOptions,
                exact: true
            },
            // {
            //     path: endpoint.login,                
            //     component: asyncLogin,
            //     exact: true
            // },   
            {                
                component: NotFound,
            }                     
        ]
    }
];