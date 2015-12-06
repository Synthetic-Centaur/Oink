import React from 'react';
import {Route} from 'react-router';

import Splash from './containers/Splash';
import Signup from './containers/Signup';

export default function getRoutes() {
  return (
    <Route path="/" component={Splash}>
      <Route path="/signup" component={Signup}></Route>
    </Route>
  );
}
