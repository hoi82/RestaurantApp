import React from "react";
import loadable from "@loadable/component";

const TakeoutResult = loadable(() => import("./TakeoutResult"));

export const asyncTakeoutResult = (props) => (
    <TakeoutResult {...props}/>
)