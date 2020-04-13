import React from "react";
import loadable from "@loadable/component";

const Register = loadable(() => import("./Register"));

export default (props) => {
    return (
        <Register {...props}/>
    );
}