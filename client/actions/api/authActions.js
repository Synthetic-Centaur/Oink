import { updatePath } from 'redux-simple-router'
import * as ACTIONS from '../actions'

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
        if (data.message === 'Invalid Email') { alert('invalid email') }

        if (data.message === 'Invalid Bank') {
          dispatch(ACTIONS.hideLogin())
          dispatch(ACTIONS.showPlaid())
          alert('Invalid Bank')
        }

        if (data.message === 'Invalid Password') { alert('invalid password') }
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
      if (response.status === 200) {
        return response.json()
      } else if (response.status === 409) {
        throw new Error('Email or password invalid')
      } else if (response.status === 500) {
        throw new Error('Error on the server', response)
      }
    })
    .then((data) => {
      dispatch(ACTIONS.addJWT(data))
      dispatch(ACTIONS.receiveData({}))
      
      dispatch(ACTIONS.hideSignup())
      dispatch(ACTIONS.showPlaid())
    })
    .catch((err) => {
      dispatch(ACTIONS.receiveError(err))
      console.error(err)
    })
  
  }
}

export function postPlaid(data) {
  return function(dispatch) {
    dispatch(ACTIONS.requestData())
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
      if (response.status === 201) {
        dispatch(ACTIONS.receiveData({}))
        dispatch(ACTIONS.authenticateUser())
        dispatch(updatePath('/dashboard'))
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
