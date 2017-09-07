import React from 'react'
import 'typeface-roboto'
import { render } from 'react-dom'
import { Provider } from 'react-redux'
import { createStore, applyMiddleware, compose } from 'redux'
import thunkMiddleware from 'redux-thunk'
import { createLogger } from 'redux-logger'
import rootReducer from './App/Reducers/RootReducer'
import App from './App'

const loggerMiddleware = createLogger()

let store = createStore(
    rootReducer,
    {},
    compose(
      applyMiddleware(thunkMiddleware, loggerMiddleware),
      window.devToolsExtension ? window.devToolsExtension() : f => f
    )
)

render(
  <Provider store={store}>
    <App />
  </Provider>,
  document.getElementById('root')
)
