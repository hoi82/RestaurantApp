import React from "react";
import loadable from "@loadable/component";

const ReviewFormContainer = loadable(() => import("./ReviewForm"));

export const asyncReviewForm = (props) => (
    <ReviewFormContainer {...props}/>
)