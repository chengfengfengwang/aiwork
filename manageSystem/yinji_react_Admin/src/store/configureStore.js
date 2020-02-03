/**
 * Author: BaiJiFeiLong@gmail.com
 * Datetime: 2017/5/13 下午6:26
 */

import {createStore, applyMiddleware, compose} from  'redux'
import logger from 'redux-logger'
import thunk from 'redux-thunk'
import createSagaMiddleware from 'redux-saga'
import {routerMiddleware} from 'react-router-redux'
import createHistory from 'history/createBrowserHistory'
import {autoRehydrate} from 'redux-persist'

import rootReducer from '../reducers'

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
const sagaMiddleware = createSagaMiddleware();
let history = createHistory();
const routeMiddleware = routerMiddleware(history);


export default function configureStore() {
    return {
        ...createStore(
            rootReducer,
            composeEnhancers(applyMiddleware(
                routeMiddleware, logger, thunk, sagaMiddleware
            ), autoRehydrate())
        ),
        runSaga: sagaMiddleware.run,
        history: history
    }
}