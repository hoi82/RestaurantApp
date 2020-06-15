import React from 'react';
import loadable from '@loadable/component';

const Result = loadable(() => import("./Result"));

export const asyncSearchResult = (props) => (
    <Result {...props}/>
)