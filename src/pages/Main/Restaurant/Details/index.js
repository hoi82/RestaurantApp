import React from "react";
import loadable from "@loadable/component";

const Details = loadable(()=> import("./Details"));

export const asyncDetails = (props) => (
    <Details {...props}/>
);