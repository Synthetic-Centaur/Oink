/********************************************************
                DASHBOARD VIEW REDUX ACTIONS
*********************************************************/

export function switchComponent(component) {
  return (dispatch) => {
    dispatch({
      type: 'SWITCH_COMPONENT',
      data: component
    })
  }
}

export function showPhoneVerify() {
  return (dispatch) => {
    dispatch({
      type: 'SHOW_PHONE_VERIFY'
    })
  }
}

export function hidePhoneVerify() {
  return (dispatch) => {
    dispatch({
      type: 'HIDE_PHONE_VERIFY'
    })
  }
}
/********************************************************
                BUDGET VIEW REDUX ACTIONS
*********************************************************/

export function changeSettingsView(view) {
  return (dispatch) => {
    dispatch({
      type: 'CHANGE_SETTINGS_VIEW',
      view: view
    })
  }
}

export function changeCurrentBudget(budgetIndex) {
  return (dispatch) => {
    dispatch({
      type: 'CHANGE_CURRENT_BUDGET',
      budgetIndex: budgetIndex
    })
  }
}

/********************************************************
                    ASYNC REDUX ACTIONS
*********************************************************/

// An async operation has been made and we are waiting for a response
export function requestData() {
  // Dispatch will be called in api/authActions.js for these
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

/********************************************************
                    LOGIN REDUX ACTIONS
*********************************************************/

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
  
  /* Dispatch is the dispatch from the Redux store
   We must call dispatch so a reducer can act on this action appropriately */
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

/********************************************************
                    SIGNUP REDUX ACTIONS
*********************************************************/

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

// The there is already a user with that email in the database
export function userExists() {
  return (dispatch) => {
    dispatch({
      type: 'USER_EXISTS'
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

/********************************************************
                    PLAID REDUX ACTIONS
*********************************************************/

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

/********************************************************
              AUTHENTICATION REDUX ACTIONS
*********************************************************/

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

/********************************************************
                    GOAL PAGE REDUX ACTIONS
*********************************************************/

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

/********************************************************
                    SETTINGS REDUX ACTIONS
*********************************************************/

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

// We should know when a user is editing their first name
export function editStart(item) {
  return (dispatch) => {
    dispatch({
      type: 'EDIT_START',
      data: item
    })
  }
}

// We should know when a user is editing their first name
export function editFinish(item) {
  return (dispatch) => {
    dispatch({
      type: 'EDIT_FINISH',
      data: item
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
