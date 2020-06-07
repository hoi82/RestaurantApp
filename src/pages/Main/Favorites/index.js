import React from "react";
import loadable from "@loadable/component";

const Favorites = loadable(() => import("./Favorites"));

export const asyncFavorites = (props) => (
    <Favorites {...props}/>
)