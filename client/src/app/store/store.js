import {createStore, applyMiddleware, compose} from 'redux';
import promiseMiddleware from 'redux-promise-middleware'
import rootReducer from './reducer';

const middleware = [promiseMiddleware()];
const enhancers = compose(applyMiddleware(...middleware), window.devToolsExtension ? window.devToolsExtension() : f => f);
const defaultInitialState = window.__INITIAL_STATE__ || {};

export default function configureStore(initialState = defaultInitialState) {
  return createStore(rootReducer, initialState, enhancers);
}
