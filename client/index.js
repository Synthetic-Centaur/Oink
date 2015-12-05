// import 'babel-core/polyfill'
// import React from 'react'
// import { render } from 'react-dom'
// import { Provider } from 'react-redux'
// import configureStore from './store/configureStore'
// import App from './containers/App'
// import injectTapEventPlugin from 'react-tap-event-plugin'
// import createBrowserHistory from 'history/lib/createBrowserHistory'
// import { syncReduxAndRouter, routeReducer } from 'redux-simple-router'
// import { Router, Route } from 'react-router'

// //Needed for React Developer Tools
// window.React = React;

// //Needed for onTouchTap
// //Can go away when react 1.0 release
// injectTapEventPlugin();

// const initialState = window.__INITIAL_STATE__
// const store = configureStore(initialState)
// const rootElement = document.getElementById('app')

// render(
//   <Provider store={store}>
//     <Router history={history}>
//       <Route path="/" component={}></Route>

//     </Router>
//   </Provider>,
//   rootElement
// )

import 'babel-core/polyfill';
import React from 'react';
import ReactDOM from 'react-dom';
import injectTapEventPlugin from 'react-tap-event-plugin'
import {createStore, combineReducers, compose, applyMiddleware} from 'redux';
import thunk from 'redux-thunk';
import {Provider} from 'react-redux';
import {Router, Route} from 'react-router';
import createHistory from 'history/lib/createHashHistory';
import {syncReduxAndRouter, routeReducer} from 'redux-simple-router';

import reducers from './reducers/reducers';
import getRoutes from './root';

// Redux DevTools store enhancers
import {devTools, persistState} from 'redux-devtools';
// React components for Redux DevTools
import {DevTools, DebugPanel, LogMonitor} from 'redux-devtools/lib/react';
import Login from './containers/Login';
import Signup from './containers/Signup';


//Needed for React Developer Tools
window.React = React;

//Needed for onTouchTap
//Can go away when react 1.0 release
injectTapEventPlugin();


const reducer = combineReducers(Object.assign({}, reducers, {
  routing: routeReducer
}));

const finalCreateStore = compose(
  // Provides support for DevTools:
  devTools(),
  // Lets you write ?debug_session=<name> in address bar to persist debug sessions
  persistState(window.location.href.match(/[?&]debug_session=([^&]+)\b/)),
  applyMiddleware(thunk)
)(createStore);

function configureStore(initialState) {
  const store = finalCreateStore(reducer, initialState)

  if (module.hot) {
    // Enable Webpack hot module replacement for reducers
    module.hot.accept('./reducers', () => {
      const nextRootReducer = require('./reducers')
      store.replaceReducer(nextRootReducer)
    })
  }

  return store
}

const initialState = window.__INITIAL_STATE__
const store = configureStore(initialState);
const history = createHistory({
  queryKey: false
});

syncReduxAndRouter(history, store);

ReactDOM.render(
  <div>
    <Provider store={store}>
      <Router history={history}>
        <Route path="/" component={Login}/>
        <Route path="/signup" component={Signup}/>
      </Router>
    </Provider>
    <DebugPanel top right bottom>
      <DevTools store={store} monitor={LogMonitor}/>
    </DebugPanel>
  </div>,
  document.getElementById('app')
);
