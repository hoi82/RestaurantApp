import React from "react";
import loadable from "@loadable/component";

const Takeouts = loadable(() => import("./Takeouts/Takeouts"));
const Reservations = loadable(() => import("./Reservations/Reservations"));

export const asyncMyTakeouts = (props) => (
    <Takeouts {...props}/>
);

export const asyncMyReservations = (props) => (
    <Reservations {...props}/>
)