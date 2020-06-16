export const port = 3000;

export const endpoint = {
    home: "/app",
    login: "/login",
    register: "/register",
    notFound: "*",
    searchRestaurantByName: "/app/search/name",
    searchRestaurantByCategory: "/app/search/category",
    searchRestaurantByLocation: "/app/search/location",
    searchRestaurantByMenu: "/app/search/menu",
    options: "/app/options",    
    resultRestaurantByName: "/app/restaurants/name",
    resultRestaurantByCategory: "/app/restaurants/category",
    resultRestaurantByLocation: "/app/restaurants/location",
    resultRestaurantByMenu: "/app/restaurants/menu/:menu",
    restaurantDetail: "/app/restaurant/:id",
    newReview: "/app/review/:resid",
    editReview: "/app/review/:resid/:id",
    menuDetails: "/app/menu",    
    restaurantReservation: "/app/restaurants/reservation",
    restaurantReservationResult: "/app/restaurants/reservation/result",
    takeout: "/app/restaurant/takeout",  
    takeoutMenu: "/app/restaurant/takeout/:resid/order",
    takeoutMenuEdit: "/app/restaurant/takeout/:resid/edit",
    takeoutCheckout: "/app/restaurant/takeout/:resid/checkout",
    favoriteRestaurants: "/app/restaurants/favorite",
    recentSearchedRestaurants: "/app/restaurants/recent",
    myReservations: "/app/my/reservation",    
}

export const IMAGE_URL = "http://localhost:3005/static/images";

export const axiosConfig = {
    headers: {                
        "Accept": "application/json",
        "Content-Type": "application/json",
    },
    withCredentials: true
}