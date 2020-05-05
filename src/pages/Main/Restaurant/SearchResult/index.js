import React from 'react';
import loadable from '@loadable/component';

const Name = loadable(() => import("./Name"));

const Category = loadable(() => import("./Category"));

const Location = loadable(() => import("./Location"));

export const asyncResultByName = (props) => (
    <Name {...props}/>
);

export const asyncResultByCategory = (props) => (
    <Category {...props}/>
)

export const asyncResultByLocation = (props) => (
    <Location {...props}/>
)