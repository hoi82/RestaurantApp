import React from "react";
import loadable from "@loadable/component";

const Favorites = loadable(() => import("./Favorites"));

export const asyncFavoriteRestaurants = (props) => (
    <Favorites {...props}/>
)