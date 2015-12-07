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

import configureStore from './store/configureStore'

// Redux DevTools store enhancers
import { DevTools, DebugPanel, LogMonitor } from 'redux-devtools/lib/react';

// Import containers for React Router
import Splash from './containers/Splash';
import Signup from './containers/Signup';
import Plaid from './containers/Plaid';


//Needed for React Developer Tools
window.React = React;

//Needed for onTouchTap with Material UI
//Can go away when react 1.0 releases
injectTapEventPlugin();

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
        <Route path="/" component={Splash} />
        <Route path="/signup" component={Signup} />
        <Route path="/plaid" component={Plaid} />
      </Router>
    </Provider>
    <DebugPanel top right bottom>
      <DevTools store={store} monitor={LogMonitor} visibleOnLoad={false} />
    </DebugPanel>
  </div>,
  document.getElementById('app')
);
