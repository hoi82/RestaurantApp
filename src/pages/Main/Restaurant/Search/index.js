import React from 'react';
import loadable from "@loadable/component";

const Name = loadable(() => import("./Name"));
const Category = loadable(() => import("./Category"));
const Location = loadable(() => import("./Location"));

export const asyncSearchByName = (props) => (
    <Name {...props}/>
);

export const asyncSearchByCategory = (props) => (
    <Category {...props}/>
);

export const asyncSearchByLocation = (props) => (
    <Location {...props}/>
);