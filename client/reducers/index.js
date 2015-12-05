import { combineReducers } from 'redux'
import { routeReducer } from 'redux-simple-router';
import { loginReducer } from './reducers'

const rootReducer = combineReducers({
  loginReducer: loginReducer,
  routing: routeReducer
});

export default rootReducer
