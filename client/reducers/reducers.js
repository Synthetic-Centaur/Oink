
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

export function dashboardReducer(state = {
  currentComponent: DROPDOWN_ACTIONS[0]
}, action = null) {
  switch (action.type) {
    case 'SWITCH_COMPONENT':
      return Object.assign({}, state, {currentComponent: action.data})
    case 'RESET_STATE':
      return Object.assign({}, state, {currentComponent: DROPDOWN_ACTIONS[0]})
    default:
      return state
  }
}

export function budgetReducer(state = {
  settingsView: 'ADD',
  currentBudget: { index: null }
}, action = null) {
  switch (action.type) {
    case 'CHANGE_SETTINGS_VIEW':
      return Object.assign({}, state, {settingsView: action.view})
    case 'CHANGE_CURRENT_BUDGET':
      return Object.assign({}, state, {currentBudget: { index: action.budgetIndex }})
    case 'RESET_STATE':
      return Object.assign({}, state, {settingsView: 'ADD', currentBudget: {index: null}})
    default:
      return state
  }
}

export function plaidReducer(state = {
  publicKey: '',
  showPlaid: false
}, action=null) {
  switch (action.type) {
    case 'ADD_PLAID_KEY':
      return Object.assign({}, state, {publicKey: action.data})
    case 'SHOW_PLAID':
      return Object.assign({}, state, {showPlaid: true})
    case 'HIDE_PLAID':
      return Object.assign({}, state, {showPlaid: false})
    case 'RESET_STATE':
      return Object.assign({}, state, {publicKey: '', showPlaid: false})
    default:
      return state
  }
}

export function asyncStatusReducer(state = {
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
    case 'REQ_FINISHED':
      return Object.assign({}, state, {isLoading: false, error: false})
    case 'RESET_STATE':
      return Object.assign({}, state, {isLoading: false, data: {}, error: false})
    default:
      return state
  }
}

export function splashPageReducer(state = {
  showLogin: false,
  showSignup: false,
  invalidEmail: false,
  invalidPassword: false,
  invalidPhone: false,
  invalidBank: false,
  userExists: false,
  passwordMatchError: false,
  missingSignupFields: false,
  errorText: ''
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
    case 'REMOVE_ALERTS':
      return Object.assign({}, state, {invalidBank: false, invalidEmail: false, userExists: false, invalidPassword: false, errorText: ''})
    case 'INVALID_EMAIL':
      return Object.assign({}, state, {invalidEmail: true, errorText: 'Oops, looks like that email doesn\'t exist! Please sign up to get started.'})
    case 'INVALID_PASSWORD':
      return Object.assign({}, state, {invalidPassword: true, errorText: 'Oops, looks like that password isn\'t right!'})
    case 'INVALID_BANK':
      return Object.assign({}, state, {invalidBank: true, errorText: 'Looks like you haven\'t authorized your bank with us yet.'})
    case 'USER_EXISTS':
      return Object.assign({}, state, {userExists: true, errorText: 'Looks like there is already a user with that email in our system. Please choose a different email.'})
    case 'PASSWORD_MATCH_ERR':
      return Object.assign({}, state, {passwordMatchError: true, errorText: 'Oops, looks like those passwords don\'t match. Please re-enter your password in both fields and try again.'})
    case 'PHONE_NUMBER_ERR':
      return Object.assign({}, state, {invalidPhone: true, errorText: 'Please enter a 10 digit phone number.'})
    case 'MISSING_SIGNUP_FIELDS':
      return Object.assign({}, state, {missingSignupFields: true, errorText: 'Please fill out all fields.'})
    case 'RESET_STATE':
      return Object.assign({}, state, {showLogin: false, showSignup: false, invalidEmail: false, invalidPassword: false, invalidPhone: false, invalidBank: false, userExists: false, passwordMatchError: false, missingSignupFields: false, errorText: ''})
    default:
      return state
  }
}

//Change state to allow or disallow form input
export function homePageReducer(state = {
  numberError: true,
  categoryError: true,
  showSettings: false,
  showVerify: false,
  verifySuccess: false,
  firstPull: false,
  errorText: '',
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
    case 'SHOW_SETTINGS':
      return Object.assign({}, state, {showSettings: true})
    case 'HIDE_SETTINGS':
      return Object.assign({}, state, {showSettings: false})
    case 'SHOW_PHONE_VERIFY':
      return Object.assign({}, state, {showVerify: true})
    case 'HIDE_PHONE_VERIFY':
      return Object.assign({}, state, {showVerify: false})
    case 'PHONE_VERIFY_SUCCESS':
      return Object.assign({}, state, {verifySuccess: true})
    case 'FIRST_PULL_START':
      return Object.assign({}, state, {firstPull: true})
    case 'FIRST_PULL_COMPLETE':
      return Object.assign({}, state, {firstPull: false})
    case 'PHONE_VERIFY_ERROR':
      return Object.assign({}, state, {errorText:'Incorrect Code. Please try again'})
    case 'RESET_STATE':
      return Object.assign({}, state, {numberError: true, categoryError: true, showSettings: false, showVerify: false, verifySuccess: false, firstPull: false, errorText: '', category: ''})
    default:
      return state
  }
}

export function spendingPageReducer(state = {
  selectedDate: null
}, action = null) {
  switch (action.type) {
    case 'SELECT_DATE':
      return Object.assign({}, state, {selectedDate: action.data})
    case 'RESET_STATE':
      return Object.assign({}, state, {selectedDate: null})
    default:
      return state
  }
}

export function settingsReducer(state = {
  editingFirstName: false,
  editingLastName: false,
  editingEmail: false,
  editingPhoneNumber: false,
  editingPassword: false,
  editingDeleteAccount: false,
  accountData: {},
  communicationData: {},
  securityData: {}
}, action = null) {
  switch (action.type) {
    case 'EDIT_START':
      switch (action.data) {
        case 'FIRST_NAME':
          return Object.assign({}, state, {editingFirstName: true})
        case 'LAST_NAME':
          return Object.assign({}, state, {editingLastName: true})
        case 'EMAIL':
          return Object.assign({}, state, {editingEmail: true})
        case 'PHONE_NUMBER':
          return Object.assign({}, state, {editingPhoneNumber: true})
        case 'PASSWORD':
          return Object.assign({}, state, {editingPassword: true})
        case 'DELETE_ACCOUNT':
          return Object.assign({}, state, {editingDeleteAccount: true})
        case 'RESET_STATE':
          return Object.assign({}, state, {editingFirstName: false, editingLastName: false, editingEmail: false, editingPhoneNumber: false, editingPassword: false, editingDeleteAccount: false, accountData: {}, communicationData: {},  securityData: {}})
        default:
          return state
      }
    case 'EDIT_FINISH':
      switch (action.data) {
        case 'FIRST_NAME':
          return Object.assign({}, state, {editingFirstName: false})
        case 'LAST_NAME':
          return Object.assign({}, state, {editingLastName: false})
        case 'EMAIL':
          return Object.assign({}, state, {editingEmail: false})
        case 'PHONE_NUMBER':
          return Object.assign({}, state, {editingPhoneNumber: false})
        case 'PASSWORD':
          return Object.assign({}, state, {editingPassword: false})
        case 'DELETE_ACCOUNT':
          return Object.assign({}, state, {editingDeleteAccount: false})
        default:
          return state
      }
    case 'EDIT_FINISH_ALL':
      return Object.assign({}, state, { editingFirstName: false,
                                        editingLastName: false,
                                        editingEmail: false,
                                        editingPhoneNumber: false,
                                        editingPassword: false,
                                        editingDeleteAccount: false,
                                        accountData: {},
                                        communicationData: {},
                                        securityData: {} })
    case 'UPDATE_ACCOUNT_SETTINGS':
      return Object.assign({}, state, {accountData: action.data})
    case 'UPDATE_COMMUNICATION_SETTINGS':
      return Object.assign({}, state, {communicationData: action.data})
    case 'UPDATE_SECURITY_SETTINGS':
      return Object.assign({}, state, {securityData: action.data})
    default:
      return state
  }
}

export function goalPageReducer(state = {
  selectedGoal: 1,
  isValid: false,
  selectedAvg: 0,
}, action = null) {
  switch (action.type) {
    case 'ALLOW_SUBMISSION':
      return Object.assign({}, state, {isValid: true})
    case 'DISALLOW_SUBMISSION':
      return Object.assign({}, state, {isValid: false})
    case 'SWITCH_GOAL':
      return Object.assign({}, state, {selectedGoal: action.data})
    case 'ENTER_AVG':
      return Object.assign({}, state, {selectedAvg: action.data})
    case 'CHANGE_GOAL_VIEW':
      return Object.assign({}, state, {goalView: action.data})
    case 'RESET_STATE':
      return Object.assign({}, state, {selectedGoal: 1, isValid: false, selectedAvg: 0})
    default:
      return state
  }
}

export function transactionMapReducer(state = {
  childrenCluster: {},
  mapDate: {},
  currentAddress: null
}, action = null) {
  switch (action.type) {
    case 'UPDATE_CLUSTER':
      return Object.assign({}, state, {childrenCluster: action.data.markers, currentAddress: action.data.address})
    case 'UPDATE_MAP_DATE':
      return Object.assign({}, state, {mapDate: action.data, currentAddress: null, childrenCluster: {}})
    case 'RESET_STATE':
      return Object.assign({}, state, {childrenCluster: {}, mapDate: {}, currentAddress: null})
    default:
      return state
  }
}

export function authReducer(state = {
  isAuthenticated: false,
  token: '',
  expiryDate: null
}, action = null) {
  switch (action.type) {

    case 'ADD_JWT':
      return Object.assign({}, state, {isAuthenticated: false, token: action.jwt, expiryDate: action.expiryDate})
    case 'REMOVE_JWT':
      return Object.assign({}, state, {isAuthenticated: false, token: '', expiryDate: null})
    case 'AUTHENTICATE_USER':
      return Object.assign({}, state, {isAuthenticated: true})
    case 'RESET_STATE':
      return Object.assign({}, state, {isAuthenticated: false, token: '', expiryDate: null})
    default:
      return state
  }
}
