// ## API actions for client-server data flow

import * as ACTIONS from '../actions'
import fetch from 'isomorphic-fetch'
import { updatePath } from 'redux-simple-router'

// Get initial state data for user
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
      dispatch(ACTIONS.receiveData(response))
    })
    .catch((err) => {
      dispatch(ACTIONS.receiveError(err))
    })
  }
}

// Update user's settings
export function postSettings(data) {
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
        throw new Error('Cannot Update User Fields')
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

// Delete user's account
export function deleteAccount() {
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
        dispatch(ACTIONS.resetState())
      } else if (response.status === 403) {
        throw new Error('User not authenticated -- delete request failed')
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

// Add a user's budget
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

// Add a user's goal
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

// Delete a user's budget
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

// Delete a user's goal
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

// Update a user's goal
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
