import React from 'react';
import loadable from "@loadable/component";

const Name = loadable(() => import("./Name"));
const Category = loadable(() => import("./Category"));

export const asyncSearchByName = (props) => (
    <Name {...props}/>
);

export const asyncSearchByCategory = (props) => (
    <Category {...props}/>
);