import * as ACTIONS from '../actions'
import fetch from 'isomorphic-fetch'
import { updatePath } from 'redux-simple-router'

//Get initial state data for user
export function getInitialState() {
  return function(dispatch) {
    dispatch(ACTIONS.requestData())
    return fetch('/api/initialState', {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        authorization: 'Bearer ' + JSON.parse(window.localStorage.redux).auth.token
      }
    })
    .then((response) => {
      if (response.status === 200) {
        return response.json()
      }
    })
    .then((response) => {
      console.log('Initial state------->', response)
      dispatch(ACTIONS.receiveData(response))
    })
    .catch((err) => {
      dispatch(ACTIONS.receiveError(err))
    })
  }
}

// update user settings
export function postSettings(data) {
  console.log('Data is:', data)
  return function(dispatch) {
    dispatch(ACTIONS.requestData())
    return fetch('/api/settings', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        authorization: 'Bearer ' + JSON.parse(window.localStorage.redux).auth.token
      },
      body: JSON.stringify(data)
    })
    .then((response) => {
      if (response.status === 201) {
        getInitialState()(dispatch)
      } else if (response.status === 409) {
        console.log('Cannot Update User Fields')
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

// delete user's account
export function deleteAccount() {
  console.log('Inside Delete Account')
  return function(dispatch) {
    dispatch(ACTIONS.requestData())
    return fetch('/api/deleteAccount', {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
        authorization: 'Bearer ' + JSON.parse(window.localStorage.redux).auth.token
      }
    })
    .then((response) => {
      if (response.status === 204) {
        dispatch(ACTIONS.removeJWT())
        dispatch(updatePath('/'))
      } else if (response.status === 403) {
        console.log('User not authenticated -- delete request failed')
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

//Post user budget data
export function postBudget(data) {
  return function(dispatch) {
    dispatch(ACTIONS.requestData())
    return fetch('/api/budget/category/' + data.category, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        authorization: 'Bearer ' + JSON.parse(window.localStorage.redux).auth.token
      },
      body: JSON.stringify({
        amount: data.budget,
      })
    })
    .then((response) => {
      if (response.status === 200) {
        getInitialState()(dispatch)
      }
    })
    .catch((error) => {
      dispatch(ACTIONS.receiveError(error))
    })
  }
}

export function postGoal(data) {
  return function(dispatch) {
    dispatch(ACTIONS.requestData())
    return fetch('/api/goals', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        authorization: 'Bearer ' + JSON.parse(window.localStorage.redux).auth.token
      },
      body: JSON.stringify({
        amount: data.amount,
        description: data.description,
        goalBy: data.goalBy
      })
    })
    .then((response) => {
      if (response.status === 201) {
        getInitialState()(dispatch)
      }
    })
    .catch((error) => {
      dispatch(ACTIONS.receiveError(error))
    })
  }
}

export function deleteBudget(data) {
  return (dispatch) => {
    dispatch(ACTIONS.requestData())
    return fetch('/api/budget/category/' + data.category, {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
        authorization: 'Bearer ' + JSON.parse(window.localStorage.redux).auth.token
      }
    })
    .then((response) => {
      if (response.status === 200) {
        getInitialState()(dispatch)
        dispatch(ACTIONS.receiveData(response))
      }
    })
    .catch((err) => {
      dispatch(ACTIONS.receiveError(err))
    })
  }
}

export function deleteGoal(id) {
  return (dispatch) => {
    dispatch(ACTIONS.requestData())
    return fetch('/api/goals/' + id, {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
        authorization: 'Bearer ' + JSON.parse(window.localStorage.redux).auth.token
      }
    })
    .then((response) => {
      if (response.status === 200) {
        getInitialState()(dispatch)
        dispatch(ACTIONS.receiveData(response))
      }
    })
    .catch((err) => {
      dispatch(ACTIONS.receiveError(err))
    })
  }
}

export function updateGoal(data) {
  return (dispatch) => {
    dispatch(ACTIONS.requestData())
    return fetch('/api/goals/' + data.id, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        authorization: 'Bearer ' + JSON.parse(window.localStorage.redux).auth.token
      },
      body: JSON.stringify({
        amount: data.amount,
        description: data.description,
        goalBy: data.goalBy
      })
    })
    .then((response) => {
      if (response.status === 201) {
        getInitialState()(dispatch)
        dispatch(ACTIONS.receiveData(response))
      }
    })
    .catch((err) => {
      dispatch(ACTIONS.receiveError(err))
    })
  }
}
