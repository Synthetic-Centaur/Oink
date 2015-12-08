export function requestData() {
  return { type: 'REQ_DATA' }
}

export function receiveData(data) {
  return {
    type: 'RECV_DATA',
    payload: data
  }
}

export function receiveError(data) {
  return {
    type: 'RECV_ERROR',
    payload: data
  }
}

export function showLogin() {
  return (dispatch) => {
    dispatch({
      type:'SHOW_LOGIN'
    })
  }
}

export function hideLogin() {
  return (dispatch) => {
    dispatch({
      type:'HIDE_LOGIN'
    })
  }
}

export function showSignup() {
  return (dispatch) => {
    dispatch({
      type:'SHOW_SIGNUP'
    })
  }
}

export function hideSignup() {
  return (dispatch) => {
    dispatch({
      type:'HIDE_SIGNUP'
    })
  }
}
