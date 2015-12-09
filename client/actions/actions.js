/********************************************************
                    ASYNC REDUX ACTIONS
*********************************************************/

// An async operation has been made and we are waiting for a response
export function requestData() {
  // Dispatch will be called in api/authHandlers.js for these
  return { type: 'REQ_DATA' }
}

// We have received data from the result of an async operation
export function receiveData(data) {
  return {
    type: 'RECV_DATA',
    payload: data
  }
}

// We have received an error as the result of an async operation
export function receiveError(data) {
  return {
    type: 'RECV_ERROR',
    payload: data
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

/********************************************************
              AUTHENTICATION REDUX ACTIONS
*********************************************************/
// We should show the pop-up signup modal
export function addJWT(jwt_token) {
  return (dispatch) => {
    dispatch({
      type: 'ADD_TOKEN',
      payload: jwt_token
    })
  }
}

// We should hide the pop-up signup modal
export function removeJWT(jwt_token) {
  return (dispatch) => {
    dispatch({
      type: 'REMOVE_JWT',
      payload: jwt_token
    })
  }
}

export function categoryValidation(boolean, category) {
  console.log('in cat val')
  if (!boolean) {
    return (dispatch) => {
      dispatch({
        type: 'ALLOW_CAT',
        payload: category
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

export function numberValidation(boolean) {
  if (boolean) {
    console.log('should allow num')
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
