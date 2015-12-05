import React from 'react';
import {Route} from 'react-router';

import Login from './containers/Login';
import Signup from './containers/Signup';

export default function getRoutes() {
  return (
    <Route path="/" component={Login}>
      <Route path="/signup" component={Signup}></Route>
    </Route>
  );
}
