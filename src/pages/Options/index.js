import React from "react";
import loadable from "@loadable/component";

const Options = loadable(() => import("./Options"));

export const asyncOptions = (props) => (
    <Options {...props}/>
)