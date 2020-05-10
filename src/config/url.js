export const port = 3000;

export const endpoint = {
    home: "/app",
    login: "/login",
    register: "/register",
    notFound: "*",
    searchRestaurantByName: "/app/restaurants/search/name",
    searchRestaurantByCategory: "/app/restaurants/search/category",
    searchRestaurantByLocation: "/app/restaurants/search/location",
    searchRestaurantByMenu: "/app/restaurants/search/menu",
    options: "/app/options",
    resultRestaurantByName: "/app/restaurants/name",
    resultRestaurantByCategory: "/app/restaurants/category",
    resultRestaurantByLocation: "/app/restaurants/location",
    resultRestaurantByMenu: "/app/restaurants/menu/:menu",
    restaurantDetail: "/app/restaurants/details",
    restaurantReservation: "/app/restaurants/reservation",
    myReservations: "/app/my/reservation",
}