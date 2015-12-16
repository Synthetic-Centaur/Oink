import { combineReducers } from 'redux'
import { routeReducer } from 'redux-simple-router'
import {
<<<<<<< 4d37e7b1bfda2e22491cc6f74cba15ac27ace6ed
  asyncStatusReducer, splashPageReducer,
  homePageReducer, authReducer, dashboardReducer,
  goalPageReducer, plaidReducer
=======
  asyncStatusReducer, splashPageReducer, budgetReducer,
  homePageReducer, authReducer, dashboardReducer, plaidReducer
>>>>>>> Set up budgetController to update a budget if it exists on a post req
} from './reducers'

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
  homePage: homePageReducer,
  dashboard: dashboardReducer,
<<<<<<< 4d37e7b1bfda2e22491cc6f74cba15ac27ace6ed
  goalPage: goalPageReducer,
  plaid: plaidReducer
=======
  plaid: plaidReducer,
  budgetPage: budgetReducer
>>>>>>> Set up budgetController to update a budget if it exists on a post req
})

// Export the rootReducer to build our final store in configureStore.js
export default rootReducer
