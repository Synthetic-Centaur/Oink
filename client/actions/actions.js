/*******************************************************
This page contains all of the non-external facing
redux actions for the app. An action returns a function
that accepts dispatch as an argument, and invokes dispatch
on by providing dispatch and object with the signature of
{
  type: 'MY_ACTION',
  payload: data (optional parameter)
}

Actions must be dispatched for any changes in state to
take place in our redux store.
********************************************************/

// ## DASHBOARD REDUX ACTIONS

// Change the current dashboard view
export function switchComponent(component) {
  return (dispatch) => {
    dispatch({
      type: 'SWITCH_COMPONENT',
      data: component
    })
  }
}

// Show phone verification notification
export function showPhoneVerify() {
  return (dispatch) => {
    dispatch({
      type: 'SHOW_PHONE_VERIFY'
    })
  }
}

// Hide phone verification notification
export function hidePhoneVerify() {
  return (dispatch) => {
    dispatch({
      type: 'HIDE_PHONE_VERIFY'
    })
  }
}

export function phoneVerifySuccess() {
  return (dispatch) => {
    dispatch({
      type: 'PHONE_VERIFY_SUCCESS'
    })
  }
}

export function phoneVerifyError() {
  return (dispatch) => {
    dispatch({
      type: 'PHONE_VERIFY_ERROR'
    })
  }
}

// ## BUDGET REDUX ACTIONS

// Change the view of the settings to add, edit, delete, etc.
export function changeSettingsView(view) {
  return (dispatch) => {
    dispatch({
      type: 'CHANGE_SETTINGS_VIEW',
      view: view
    })
  }
}

// Reflect the index of the current budget that is being edited on state
export function changeCurrentBudget(budgetIndex) {
  return (dispatch) => {
    dispatch({
      type: 'CHANGE_CURRENT_BUDGET',
      budgetIndex: budgetIndex
    })
  }
}

export function categoryValidation(allow, category) {
  if (!allow) {
    return (dispatch) => {
      dispatch({
        type: 'ALLOW_CAT',
        data: category
      })
    }
  } else {
    return (dispatch) => {
      dispatch({
        type: 'DISABLE_CAT'
      })
    }
  }
}

export function numberValidation(allow) {
  if (allow) {
    return (dispatch) => {
      dispatch({
        type: 'ALLOW_NUM'
      })
    }
  } else {
    return (dispatch) => {
      dispatch({
        type: 'DISABLE_NUM'
      })
    }
  }
}

// ## ASYNC REDUX ACTIONS
// ** Note: Dispatch will be called in api/authActions.js for these **

// An async operation has been made and we are waiting for a response
export function requestData() {
  return { type: 'REQ_DATA' }
}

// We have received data from the result of an async operation
export function receiveData(data) {
  return {
    type: 'RECV_DATA',
    data: data
  }
}

// We have received an error as the result of an async operation
export function receiveError(data) {
  return {
    type: 'RECV_ERROR',
    data: data
  }
}

// ## LOGIN REDUX ACTIONS

// We should show the pop-up login modal
export function showLogin() {
  return (dispatch) => {
    dispatch({
      type: 'SHOW_LOGIN'
    })
  }
}

// We should hide the pop-up login modal
export function hideLogin() {
  return (dispatch) => {
    dispatch({
      type: 'HIDE_LOGIN'
    })
  }
}

// The user provided an email that does not exist in the system
export function invalidEmail() {
  return (dispatch) => {
    dispatch({
      type: 'INVALID_EMAIL'
    })
  }
}

// The user provided an password that does not exist in the system
export function invalidPassword() {
  return (dispatch) => {
    dispatch({
      type: 'INVALID_PASSWORD'
    })
  }
}

// The user has not authorized their bank account
export function invalidBank() {
  return (dispatch) => {
    dispatch({
      type: 'INVALID_BANK'
    })
  }
}

// ## SIGNUP REDUX ACTIONS

// We should show the pop-up signup modal
export function showSignup() {
  return (dispatch) => {
    dispatch({
      type: 'SHOW_SIGNUP'
    })
  }
}

// We should hide the pop-up signup modal
export function hideSignup() {
  return (dispatch) => {
    dispatch({
      type: 'HIDE_SIGNUP'
    })
  }
}

// There is already a user with that email in the database
export function userExists() {
  return (dispatch) => {
    dispatch({
      type: 'USER_EXISTS'
    })
  }
}

// The password fields don't match
export function passwordMatchError() {
  return (dispatch) => {
    dispatch({
      type: 'PASSWORD_MATCH_ERR'
    })
  }
}

// Missing required fields for signup
export function missingSignupFields() {
  return (dispatch) => {
    dispatch({
      type: 'MISSING_SIGNUP_FIELDS'
    })
  }
}

// Remove all error messages
export function removeAlerts() {
  return (dispatch) => {
    dispatch({
      type: 'REMOVE_ALERTS'
    })
  }
}

// Trigger a loading state during first initial pull of data after signup
export function firstPullStart() {
  return (dispatch) => {
    dispatch({
      type: 'FIRST_PULL_START'
    })
  }
}

// Resets state to default of false, initial state call will then fire
export function firstPullComplete() {
  return (dispatch) => {
    dispatch({
      type: 'FIRST_PULL_COMPLETE'
    })
  }
}

// ## PLAID REDUX ACTIONS

// We should show the pop-up signup modal
export function showPlaid() {
  return (dispatch) => {
    dispatch({
      type: 'SHOW_PLAID'
    })
  }
}

// We should hide the pop-up signup modal
export function hidePlaid() {
  return (dispatch) => {
    dispatch({
      type: 'HIDE_PLAID'
    })
  }
}

// ## AUTHENTICATION REDUX ACTIONS

// We should show the pop-up signup modal
export function addJWT(data) {
  return (dispatch) => {
    dispatch({
      type: 'ADD_JWT',
      jwt: data.jwt_token,
      expiryDate: Date.now() + data.expiresIn
    })
  }
}

// We should hide the pop-up signup modal
export function removeJWT() {
  return (dispatch) => {
    dispatch({
      type: 'REMOVE_JWT',
    })
  }
}

export function authenticateUser() {
  return (dispatch) => {
    dispatch({
      type: 'AUTHENTICATE_USER',
    })
  }
}

// ## SPENDING PAGE REDUX ACTIONS

export function selectDate(date) {
  return (dispatch) => {
    dispatch({
      type: 'SELECT_DATE',
      data: date
    })
  }
}

// ## GOAL PAGE REDUX ACTIONS

export function switchGoal(goal) {
  return (dispatch) => {
    dispatch({
      type: 'SWITCH_GOAL',
      data: goal
    })
  }
}

export function validateGoal(allow) {
  if (allow) {
    return (dispatch) => {
      dispatch({
        type: 'ALLOW_SUBMISSION'
      })
    }
  } else {
    return (dispatch) => {
      dispatch({
        type: 'DISALLOW_SUBMISSION'
      })
    }
  }
}

export function selectAvg(avg) {
  return (dispatch) => {
    dispatch({
      type: 'ENTER_AVG',
      data: avg
    })
  }
}

export function changeGoalView(view) {
  return (dispatch) => {
    dispatch({
      type: 'CHANGE_GOAL_VIEW',
      data: view
    })
  }
}

// ## SETTINGS REDUX ACTIONS

// We should show the pop-up settings modal
export function showSettings() {
  return (dispatch) => {
    dispatch({
      type: 'SHOW_SETTINGS'
    })
  }
}

// We should hide the pop-up settings modal
export function hideSettings() {
  return (dispatch) => {
    dispatch({
      type: 'HIDE_SETTINGS'
    })
  }
}

// We should know when a user is editing a single property
export function editStart(item) {
  return (dispatch) => {
    dispatch({
      type: 'EDIT_START',
      data: item
    })
  }
}

// We should know when a user is editing a single property
export function editFinish(item) {
  return (dispatch) => {
    dispatch({
      type: 'EDIT_FINISH',
      data: item
    })
  }
}

// We should know when a user is editing a single property
export function editFinishAll() {
  return (dispatch) => {
    dispatch({
      type: 'EDIT_FINISH_ALL'
    })
  }
}

// Update the user account settings on state
export function updateAccountSettings(item) {
  return (dispatch) => {
    dispatch({
      type: 'UPDATE_ACCOUNT_SETTINGS',
      data: item
    })
  }
}

// Update the communication settings on state
export function updateCommunicationSettings(item) {
  return (dispatch) => {
    dispatch({
      type: 'UPDATE_COMMUNICATION_SETTINGS',
      data: item
    })
  }
}

// Update the communication settings on state
export function updateSecuritySettings(item) {
  return (dispatch) => {
    dispatch({
      type: 'UPDATE_SECURITY_SETTINGS',
      data: item
    })
  }
}

/********************************************************
                    TRANSACTION MAP REDUX ACTIONS
*********************************************************/


export function updateCluster(data) {
  return (dispatch) => {
    dispatch({
      type: 'UPDATE_CLUSTER',
      data: data
    })
  }
}

export function updateMapDate(date) {
  return (dispatch) => {
    dispatch({
      type: 'UPDATE_MAP_DATE',
      data: date
    })
  }
}

