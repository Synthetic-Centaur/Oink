import { updatePath } from 'redux-simple-router'
import * as ACTIONS from '../actions'
import { getInitialState } from './apiActions'

export function postLogin(data) {
  return function(dispatch) {
    dispatch(ACTIONS.requestData())
    return fetch('/auth/login', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        email: data.email,
        password: data.password
      })
    })
    .then((response) => {
      if (response.status === 200 || response.status === 403) {
        return response.json()
      } else if (response.status === 409) {
        throw new Error('User does not exist in DB')
      } else if (response.status === 500) {
        throw new Error('Error on the server', response)
      }
    })
    .then((data) => {
      if (data.success === false) {
        if (data.message === 'Invalid Email') { dispatch(ACTIONS.invalidEmail()) }

        if (data.message === 'Invalid Bank') {
          dispatch(ACTIONS.invalidBank())
          dispatch(ACTIONS.hideLogin())
          dispatch(ACTIONS.showPlaid())
        }

        if (data.message === 'Invalid Password') { dispatch(ACTIONS.invalidPassword()) }
      } else {
        dispatch(ACTIONS.addJWT(data))
        dispatch(ACTIONS.authenticateUser())
        dispatch(ACTIONS.receiveData({}))

        dispatch(updatePath('/dashboard'))
      }
    })
    .catch((err) => {
      dispatch(ACTIONS.receiveError(err))
      console.error(err)
    })
  }
}

export function postSignup(data) {
  return function(dispatch) {
    dispatch(ACTIONS.requestData())
    return fetch('/auth/signup', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        email: data.email,
        password: data.password,
        first_name: data.firstName,
        last_name: data.lastName,
        phone_number: data.phone
      })
    })
    .then((response) => {
      if (response.status === 200 || response.status === 403) {
        return response.json()
      } else if (response.status === 409) {
        throw new Error('Email or password invalid')
      } else if (response.status === 500) {
        throw new Error('Error on the server', response)
      }
    })
    .then((data) => {
      if (data.success === false) {
        if (data.message === 'User Exists') { dispatch(ACTIONS.userExists()) }
      } else {
        dispatch(ACTIONS.receiveData({}))
        dispatch(ACTIONS.addJWT(data))
        
        dispatch(ACTIONS.hideSignup())
        dispatch(ACTIONS.showPlaid())
      }
    })
    .catch((err) => {
      dispatch(ACTIONS.receiveError(err))
      console.error(err)
    })
  
  }
}

export function postPlaid(data) {
  return function(dispatch) {
    dispatch(ACTIONS.authenticateUser())
    dispatch(ACTIONS.firstPullStart())
    dispatch(updatePath('/dashboard'))
    return fetch('/auth/plaid', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        authorization: 'Bearer ' + JSON.parse(window.localStorage.redux).auth.token
      },
      body: JSON.stringify({
        public_token: data,
      })
    })
    .then((response) => {
      if (response.status === 200) {
        dispatch(ACTIONS.firstPullComplete())
      } else if (response.status === 500) {
        throw new Error('Error on the server', response)
      }
    })
    .catch((err) => {
      dispatch(ACTIONS.receiveError(err))
      console.error(err)
    })
  }
}

export function getPlaid() {
  return function(dispatch) {
    dispatch(ACTIONS.requestData())
    return fetch('/auth/plaid', {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        authorization: 'Bearer ' + JSON.parse(window.localStorage.redux).auth.token
      }
    })
    .then((response) => {
      if (response.status === 200) {
        return response.json()
      } else if (response.status === 409) {
        throw new Error('User does not exist in DB')
      } else if (response.status === 500) {
        throw new Error('Error on the server', response)
      }
    })
    .then((response) => {
      dispatch(ACTIONS.receiveData({}))
      dispatch({
        type: 'ADD_PLAID_KEY',
        data: response
      })
    })
    .catch((err) => {
      dispatch(ACTIONS.receiveError(err))
      console.error(err)
    })
  }
}

export function authRedirect() {
  return function(dispatch) {
    dispatch(updatePath('/'))
  }
}

export function splashRedirect() {
  return function(dispatch) {
    dispatch(updatePath('/dashboard'))
  }
}

export function authLogout() {
  return function(dispatch) {
    dispatch(ACTIONS.removeJWT())
    dispatch(updatePath('/'))
  }
}

export function sendPhoneVerification() {
  console.log('inside send phone verification')
  return function(dispatch) {
    dispatch(ACTIONS.requestData())
    return fetch('auth/phoneVerification/send', {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        authorization: 'Bearer ' + JSON.parse(window.localStorage.redux).auth.token
      }
    })
    .then((response) => {
      if (response.status === 200) {
        console.log('sent verification code')
      } else if (response.status === 500) {
        throw new Error('Error on the server', response)
      }
    })
    .catch((err) => {
      dispatch(ACTIONS.receiveError(err))
      console.error(err)
    })
  }
}

export function checkPhoneVerification(code) {
  console.log('inside check phone verification')
  return function(dispatch) {
    dispatch(ACTIONS.requestData())
    return fetch('auth/phoneVerification/check', {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        authorization: 'Bearer ' + JSON.parse(window.localStorage.redux).auth.token
      },
      body: JSON.stringify({
        code: code,
      })
    })
    .then((response) => {
      if (response.status === 202) {
        // user phone_verified property should now be true
        getInitialState()(dispatch)
        dispatch(ACTIONS.phoneVerifySuccess())
      } else if (response.status === 401) {
        // code that user enered is not correct --> show them error message
        dispatch(ACTIONS.phoneVerifyError())
      } else if (response.status === 500) {
        throw new Error('Error on the server', response)
      }
    })
    .catch((err) => {
      dispatch(ACTIONS.receiveError(err))
      console.error(err)
    })
  }
}
