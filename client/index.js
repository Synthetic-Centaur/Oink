// ## Dependencies
import 'babel-core/polyfill'
import React from 'react'
import ReactDOM from 'react-dom'
import { createStore, compose, applyMiddleware } from 'redux'
import thunk from 'redux-thunk'
import { Provider} from 'react-redux'
import { Router, Route } from 'react-router'
import createHistory from 'history/lib/createHashHistory'
import { syncReduxAndRouter } from 'redux-simple-router'

// Function to create a store with devtools, middleware, etc
import configureStore from './store/configureStore'

// Redux DevTools store enhancers
// ** NOTE: Hit Control + H to open DevTools **
import { DevTools, DebugPanel, LogMonitor } from 'redux-devtools/lib/react'

// Import containers for React Router
import Splash from './containers/Splash'
import Dashboard from './containers/Dashboard'

// Required by Material UI
import injectTapEventPlugin from 'react-tap-event-plugin'

// Needed for onTouchTap with Material UI
// Can go away when react 1.0 releases
injectTapEventPlugin()

// Needed for React Developer Tools
window.React = React

// To be used with server side rendering
const initialState = window.__INITIAL_STATE__

// Our redux store
const store = configureStore(initialState)

// Set queryKey false to avoid weird symbols at end of url
const history = createHistory({
  queryKey: false
})

// Sync Redux state with our router's history
syncReduxAndRouter(history, store)

// Render React App to the DOM
ReactDOM.render(
  <div>
    <Provider store={store}>
      <Router history={history}>
        <Route path="/" component={Splash} />
        <Route path="/dashboard" component={Dashboard} />
      </Router>
    </Provider>
    { window.ENV === 'dev' ? <DebugPanel top right bottom><DevTools store={store} monitor={LogMonitor} visibleOnLoad={false} /></DebugPanel> : null}
  </div>,
  document.getElementById('app')
)
