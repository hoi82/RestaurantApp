import React from "react";
import loadable from "@loadable/component";

const Main = loadable(() => import("./Main"));

export default (props) => (
    <Main {...props}/>
);