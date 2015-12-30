// ## Function to generate Redux Store

import { createStore, applyMiddleware, compose } from 'redux'
import { devTools, persistState as persistStateDev } from 'redux-devtools'
import persistState from 'redux-localstorage'
import thunk from 'redux-thunk'
import rootReducer from '../reducers'

const finalCreateStore = compose(

  // Apply async middleware
  applyMiddleware(thunk),
  persistState('auth'),

  // Provides support for DevTools:
  devTools(),

  // Lets you write ?debug_session=<name> in address bar to persist debug sessions
  persistStateDev(window.location.href.match(/[?&]debug_session=([^&]+)\b/)),
)(createStore)

export default function configureStore(initialState) {
  const store = finalCreateStore(rootReducer, initialState)

  if (module.hot) {
    // Enable Webpack hot module replacement for reducers
    module.hot.accept('../reducers', () => {
      const nextRootReducer = require('../reducers')
      store.replaceReducer(nextRootReducer)
    })
  }
  
  // Our redux store for our application
  return store
}
