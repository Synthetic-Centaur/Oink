import { combineReducers } from 'redux'
import { routeReducer } from 'redux-simple-router';
import { asyncStatusReducer } from './reducers'

const rootReducer = combineReducers({
  asyncStatus: asyncStatusReducer,
  routing: routeReducer
});

export default rootReducer
