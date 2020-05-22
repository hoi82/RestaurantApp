import React from "react";
import loadable from "@loadable/component";

const NewReview = loadable(() => import("./NewReview"));

export const asyncNewReview = (props) => (
    <NewReview {...props}/>
)