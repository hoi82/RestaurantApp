import React from "react";
import loadable from "@loadable/component";

const Takeout = loadable(() => import("./Takeout"));

export const asyncTakeout = (props) => (
    <Takeout {...props}/>
)