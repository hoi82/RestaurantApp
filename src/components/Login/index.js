import React from "react";
import loadable from "@loadable/component";

const Login = loadable(() => import("./Login"));

export default (props) => (
    <Login {...props}/>
);