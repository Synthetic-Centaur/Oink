import * as ACTIONS from '../actions/actions'

//Get initial state data for user
export function getInitialState() {
  return function(dispatch) {
    dispatch(ACTIONS.requestData());
    return fetch('/api/initialState', {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        'authorization': 'Bearer ' + JSON.parse(window.localStorage.redux).auth.token
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
    });
  }
}

//Post user budget data
export function postBudget(data) {
  return function(dispatch) {
    dispatch(ACTIONS.requestData());
    return fetch('/api/budget/category/' + data.category, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'authorization': 'Bearer ' + JSON.parse(window.localStorage.redux).auth.token
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
    // .then((response) => {
    //   dispatch(ACTIONS.receiveData(response))
    // })
    .catch((error) => {
      dispatch(ACTIONS.receiveError(error));
    })
  }
}
