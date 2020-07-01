import path from "path";

export const port = 3000;

export const endpoint = {
    home: "/",
    login: "/login",
    register: "/register",
    notFound: "*",
    searchMain: "/search",
    searchRestaurantByName: "/search/name",
    searchRestaurantByCategory: "/search/category",
    searchRestaurantByLocation: "/search/location",
    searchRestaurantByMenu: "/search/menu",
    options: "/options",  
    searchResultMain: "/restaurants",  
    resultRestaurantByName: "/restaurants/name",
    resultRestaurantByCategory: "/restaurants/category",
    resultRestaurantByLocation: "/restaurants/location",
    resultRestaurantByMenu: "/restaurants/menu/:menu",
    restaurantMain: "/restaurant",
    restaurantDetail: "/restaurant/:id",
    reviewMain: "/review",
    newReview: "/review/:resid",
    editReview: "/review/:resid/:id",
    menuMain: "/menu",
    menuDetails: "/menu",
    reservationMain: "/reservation",
    restaurantReservation: "/reservation",
    restaurantReservationResult: "/reservation/result",
    takeoutMain: "/takeout",
    takeout: "/restaurant/takeout",  
    takeoutResult: "/takeout/:id",  
    favoriteRestaurants: "/restaurants/favorite",
    recentSearchedRestaurants: "/restaurants/recent",
    myMain: "/my",
    myReservations: "/my/reservation", 
    myTakeouts: "/my/takeout",
    options: "/options",   
}

export const IMAGE_URL = "http://localhost:3005/static/images";

export const axiosConfig = {
    headers: {                
        "Accept": "application/json",
        "Content-Type": "application/json",
    },
    withCredentials: true
}