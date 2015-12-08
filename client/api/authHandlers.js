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
      console.log('STATUS',response.status)
      if (response.status === 200) {
        console.log(response)
        //dispatch(updatePath('/home'))
      }
    })
    .catch((err) => {
      dispatch(ACTIONS.receiveError(err))
      console.error(err)
    });
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
        dispatch(ACTIONS.receiveData(JSON.parse(response.body)))
        dispatch(updatePath('/plaid'))
      }
    })
    .catch((err) => {
      dispatch(ACTIONS.receiveError(err))
      //console.error(err)
    });
  
  }
}

export function postPlaid(data) {
  return function(dispatch) {
    dispatch(ACTIONS.requestData())
    return fetch('/auth/plaid', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        public_token: data.public_token,
      })
    })
    .then((response) => {
      if (response.status === 200) {
        //dispatch(ACTIONS.receiveData(JSON.parse(response.body)))
        dispatch(updatePath('/home'))
      }
    })
    .catch((err) => {
      dispatch(ACTIONS.receiveError(err))
      console.error(err)
    });
  }
}
