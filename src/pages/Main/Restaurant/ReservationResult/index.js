import React from "react";
import loadable from "@loadable/component";

const ReservationResult = loadable(() => import("./ReservationResult"));

export const asyncReservationResult = (props) => (
    <ReservationResult {...props}/>
)