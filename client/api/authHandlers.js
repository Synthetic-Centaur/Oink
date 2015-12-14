import { updatePath } from 'redux-simple-router'
import * as ACTIONS from '../actions/actions'

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
      if (response.status === 200) {
        return response.json()
      } else if (response.status === 409) {
        console.log('User does not exist in DB')
      } else if (response.status === 500) {
        throw new Error('Error on the server', response)
      }
    })
    .then((data) => {
      dispatch(ACTIONS.addJWT(data))
      dispatch(ACTIONS.receiveData({}))

      dispatch(updatePath('/dashboard'))
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
        console.log('Email or password invalid')
      } else if (response.status === 500) {
        throw new Error('Error on the server', response)
      }
    })
    .then((data) => {
      dispatch(ACTIONS.addJWT(data))
      dispatch(ACTIONS.receiveData({}))
      
      dispatch(updatePath('/plaid'))
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
        dispatch(updatePath('/dashboard'))
        dispatch(ACTIONS.receiveData({}))
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

export function authRedirect() {
  return function(dispatch) {
    dispatch(updatePath('/'))
  }
}

export function authLogout() {
  return function(dispatch) {
    dispatch(ACTIONS.removeJWT())
    dispatch(updatePath('/'))
  }
}
