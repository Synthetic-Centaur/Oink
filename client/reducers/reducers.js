/***************************************************************************************
These are the reducers that manage changes to the state of our application.

Each reducer takes in the current piece (a key on state defined in combineReducers)
of state that it is responsible for managing. We provide default values for each of
these pieces of state.

The signature for a reducer is (state, action) => return state
A reducer will return a new state, using Object.assign, depending on what actions was
dispatched as the result of user interaction. If there is no relevant action, it will
just return the current state. See actions folder and api folder for a list of
these actions.
***************************************************************************************/
import { DROPDOWN_ACTIONS } from '../constants/componentActions'


function dashboardReducer(state = {
  currentComponent: DROPDOWN_ACTIONS[0]
}, action = null) {
  switch (action.type) {
    case 'SWITCH_COMPONENT':
     return Object.assign({}, state, {currentComponent: action.data})
    default:
      return state
  }
}

function asyncStatusReducer(state = {
  isLoading: false,
  data: {},
  error: false
}, action = null) {
  switch (action.type) {

    case 'RECV_ERROR':
      return Object.assign({}, state, {isLoading: false, data: action.data, error: true})
    case 'RECV_DATA':
      return Object.assign({}, state, {isLoading: false, data: action.data, error: false})
    case 'REQ_DATA':
      return Object.assign({}, state, {isLoading: true, error: false})
    default:
      return state
  }
}

function splashPageReducer(state = {
  showLogin: false,
  showSignup: false
}, action = null) {
  switch (action.type) {

    case 'SHOW_LOGIN':
      return Object.assign({}, state, {showLogin: true})
    case 'HIDE_LOGIN':
      return Object.assign({}, state, {showLogin: false})
    case 'SHOW_SIGNUP':
      return Object.assign({}, state, {showSignup: true})
    case 'HIDE_SIGNUP':
      return Object.assign({}, state, {showSignup: false})
    default:
      return state
  }
}

//Change state to allow or disallow form input
function homePageReducer(state = {
  numberError: true,
  categoryError: true,
  category: ''
}, action = null) {
  switch (action.type) {
    case 'SWITCH_COMPONENT':
     return Object.assign({}, state, {currentComponent: action.data})
    case 'ALLOW_NUM':
      return Object.assign({}, state, {numberError: false})
    case 'DISABLE_NUM':
      return Object.assign({}, state, {numberError: true})
    case 'ALLOW_CAT':
      return Object.assign({}, state, {categoryError: false, category: action.data})
    case 'DISABLE_CAT':
      return Object.assign({}, state, {categoryError: true})
    default:
      return state
  }
}

function goalPageReducer(state = {
  selectedGoal: 0
}, action = null) {
  switch (action.type) {
    case 'SWITCH_GOAL':
      return Object.assign({}, state, {selectedGoal: action.data})
    default:
      return state
  }
}


function authReducer(state = {
  isAuthenticated: false,
  token: '',
  expiryDate: null
}, action = null) {
  switch (action.type) {

    case 'ADD_JWT':
      return Object.assign({}, state, {isAuthenticated: true, token: action.jwt, expiryDate: action.expiryDate})
    case 'REMOVE_JWT':
      return Object.assign({}, state, {isAuthenticated: false, token: '', expiryDate: null})
    default:
      return state
  }
}

export default {
  asyncStatusReducer,
  splashPageReducer,
  homePageReducer,
  authReducer,
  splashPageReducer,
  dashboardReducer,
  goalPageReducer
}
