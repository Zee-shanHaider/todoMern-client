import {compose ,applyMiddleware, createStore} from 'redux';
// import {configureStore} from '@reduxjs/toolkit'
import thunk from 'redux-thunk'
import logger from 'redux-logger'

import { rootReducer } from './rootReducer';

const middlewares = [logger,thunk ];

const composedEnhancers = compose(applyMiddleware(...middlewares))

export const store = createStore(
    rootReducer,
    undefined,
    composedEnhancers)