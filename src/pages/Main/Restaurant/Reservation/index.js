import React from "react";
import loadable from "@loadable/component";

const Reservation = loadable(() => import("./Reservation"));

export const asyncReservation = (props) => (
    <Reservation {...props}/>
)