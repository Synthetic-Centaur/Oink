/********************************************************
                DASHBOARD VIEW REDUX ACTIONS
*********************************************************/

function switchComponent(component) {
  return (dispatch) => {
    dispatch({
      type: 'SWITCH_COMPONENT',
      data: component
    })
  }
}

/********************************************************
                BUDGET VIEW REDUX ACTIONS
*********************************************************/

function changeSettingsView(view) {
  return (dispatch) => {
    dispatch({
      type: 'CHANGE_SETTINGS_VIEW',
      view: view
    })
  }
}

function changeCurrentBudget(budgetIndex) {
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
function requestData() {
  // Dispatch will be called in api/authHandlers.js for these
  return { type: 'REQ_DATA' }
}

// We have received data from the result of an async operation
function receiveData(data) {
  return {
    type: 'RECV_DATA',
    data: data
  }
}

// We have received an error as the result of an async operation
function receiveError(data) {
  return {
    type: 'RECV_ERROR',
    data: data
  }
}

/********************************************************
                    LOGIN REDUX ACTIONS
*********************************************************/

// We should show the pop-up login modal
function showLogin() {
  return (dispatch) => {
    dispatch({
      type: 'SHOW_LOGIN'
    })
  }
}

// We should hide the pop-up login modal
function hideLogin() {
  
  /* Dispatch is the dispatch from the Redux store
   We must call dispatch so a reducer can act on this action appropriately */
  return (dispatch) => {
    dispatch({
      type: 'HIDE_LOGIN'
    })
  }
}

// We should show the pop-up signup modal
function showSignup() {
  return (dispatch) => {
    dispatch({
      type: 'SHOW_SIGNUP'
    })
  }
}

// We should hide the pop-up signup modal
function hideSignup() {
  return (dispatch) => {
    dispatch({
      type: 'HIDE_SIGNUP'
    })
  }
}

/********************************************************
              AUTHENTICATION REDUX ACTIONS
*********************************************************/

// We should show the pop-up signup modal
function addJWT(data) {
  return (dispatch) => {
    dispatch({
      type: 'ADD_JWT',
      jwt: data.jwt_token,
      expiryDate: Date.now() + data.expiresIn
    })
  }
}

// We should hide the pop-up signup modal
function removeJWT() {
  return (dispatch) => {
    dispatch({
      type: 'REMOVE_JWT',
    })
  }
}

function categoryValidation(allow, category) {
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

function numberValidation(allow) {
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
                    SPENDING PAGE REDUX ACTIONS
*********************************************************/

function selectDate(date) {
  return (dispatch) => {
    dispatch({
      type: 'SELECT_DATE',
      data: date
    })
  }
}

/********************************************************
                    GOAL PAGE REDUX ACTIONS
*********************************************************/

function switchGoal(goal) {
  return (dispatch) => {
    dispatch({
      type: 'SWITCH_GOAL',
      data: goal
    })
  }
}

function validateGoal(allow) {
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

function selectAvg(avg) {
  return (dispatch) => {
    dispatch({
      type: 'ENTER_AVG',
      data: avg
    })
  }
}

function changeGoalView(view) {
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
function showSettings() {
  return (dispatch) => {
    dispatch({
      type: 'SHOW_SETTINGS'
    })
  }
}

// We should hide the pop-up settings modal
function hideSettings() {
  return (dispatch) => {
    dispatch({
      type: 'HIDE_SETTINGS'
    })
  }
}

export default {
  requestData,
  receiveData,
  receiveError,
  showLogin,
  hideLogin,
  showSignup,
  hideSignup,
  addJWT,
  removeJWT,
  categoryValidation,
  numberValidation,
  switchComponent,
  switchGoal,
  selectAvg,
  validateGoal,
  showSettings,
  hideSettings,
  changeSettingsView,
  changeCurrentBudget,
  changeGoalView,
  selectDate
}
