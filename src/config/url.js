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
    resultRestaurantByName: "/app/restaurants/name/:name",
    resultRestaurantByCategory: "/app/restaurants/category/:category",
    resultRestaurantByLocation: "/app/restaurants/location/:location",
    resultRestaurantByMenu: "/app/restaurants/menu/:menu",
    restaurantDetail: "/app/restaurants/:id",
    restaurantReservation: "/app/restaurants/:id/reservation",
    myReservations: "/app/my/reservation",
}