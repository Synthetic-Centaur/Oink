import 'babel-core/polyfill';
import React from 'react';
import ReactDOM from 'react-dom';
import injectTapEventPlugin from 'react-tap-event-plugin'
import {createStore, compose, applyMiddleware} from 'redux';
import thunk from 'redux-thunk';
import {Provider} from 'react-redux';
import {Router, Route} from 'react-router';
import createHistory from 'history/lib/createHashHistory';
import { syncReduxAndRouter } from 'redux-simple-router';

import rootReducer from './reducers/index'
import getRoutes from './root';

// Redux DevTools store enhancers
import {devTools, persistState} from 'redux-devtools';
// React components for Redux DevTools
import {DevTools, DebugPanel, LogMonitor} from 'redux-devtools/lib/react';
import Splash from './containers/Splash';
import Signup from './containers/Signup';
import Plaid from './containers/Plaid';


//Needed for React Developer Tools
window.React = React;

//Needed for onTouchTap
//Can go away when react 1.0 release
injectTapEventPlugin();


const finalCreateStore = compose(
  // Provides support for DevTools:
  devTools(),
  // Lets you write ?debug_session=<name> in address bar to persist debug sessions
  persistState(window.location.href.match(/[?&]debug_session=([^&]+)\b/)),
  applyMiddleware(thunk)
)(createStore);

function configureStore(initialState) {
  const store = finalCreateStore(rootReducer, initialState)

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
        <Route path="/" component={Splash}/>
        <Route path="/signup" component={Signup}/>
        <Route path="/plaid" component={Plaid}/>
      </Router>
    </Provider>
    <DebugPanel top right bottom>
      <DevTools store={store} monitor={LogMonitor} visibleOnLoad={false}/>
    </DebugPanel>
  </div>,
  document.getElementById('app')
);
