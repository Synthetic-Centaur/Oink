import { combineReducers } from 'redux'
import { routeReducer } from 'redux-simple-router';
import { asyncStatusReducer, splashPageReducer, homePageReducer } from './reducers'
import { asyncStatusReducer, splashPageReducer, authReducer } from './reducers'

/***********************************************************************************
The route reducer will take the Redux store's state and slice it up by its keys
as specified by the keys of the object passed into combineReducers. Each reducer
(the value of the object below) will be resposible for updating that part of state.
************************************************************************************/
const rootReducer = combineReducers({
  asyncStatus: asyncStatusReducer,
  auth: authReducer,
  splashPage: splashPageReducer,
  routing: routeReducer,
  homePage: homePageReducer
});

// Export the rootReducer to build our final store in configureStore.js
export default rootReducer
