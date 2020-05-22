import React from "react";
import loadable from "@loadable/component";

const Menu = loadable(() => import("./Menu"));

export const asyncMenu = (props) => (
    <Menu {...props}/>
)