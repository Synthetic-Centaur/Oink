function asyncStatusReducer (state = {
  isLoading: false,
  data: [],
  error: false
}, action = null) {
  switch(action.type) {
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

function splashPageReducer (state = {
  showLogin: false,
  showSignup: false
}, action = null) {
  switch(action.type) {
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

export default {
  asyncStatusReducer,
  splashPageReducer
}
