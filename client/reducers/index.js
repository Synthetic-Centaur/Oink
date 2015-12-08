import { combineReducers } from 'redux'
import { routeReducer } from 'redux-simple-router';
import { asyncStatusReducer, splashPageReducer } from './reducers'

const rootReducer = combineReducers({
  asyncStatus: asyncStatusReducer,
  splashPage: splashPageReducer,
  routing: routeReducer
});

export default rootReducer
