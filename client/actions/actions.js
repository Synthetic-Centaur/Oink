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
  console.log('INSIDE receiveData')
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

export function categoryValidation(allow, category) {
  console.log('in cat val', allow, category)
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
