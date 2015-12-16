import { combineReducers } from 'redux'
import { routeReducer } from 'redux-simple-router'
import * as REDUCERS from './reducers'

/***********************************************************************************
The route reducer will take the Redux store's state and slice it up by its keys
as specified by the keys of the object passed into combineReducers. Each reducer
(the value of the object below) will be resposible for updating that part of state.
************************************************************************************/

const rootReducer = combineReducers({
  routing: routeReducer,
  asyncStatus: REDUCERS.asyncStatusReducer,
  auth: REDUCERS.authReducer,
  splashPage: REDUCERS.splashPageReducer,
  homePage: REDUCERS.homePageReducer,
  dashboard: REDUCERS.dashboardReducer,
  goalPage: REDUCERS.goalPageReducer,
  plaid: REDUCERS.plaidReducer,
  budgetPage: REDUCERS.budgetReducer
})

// Export the rootReducer to build our final store in configureStore.js
export default rootReducer
