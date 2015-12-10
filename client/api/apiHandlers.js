import * as ACTIONS from '../actions/actions'

//Get initial state data for user
export function getInitialState() {
  console.log('In getInitialState');
  return function(dispatch) {
    dispatch(ACTIONS.requestData());
    return fetch('/api/intitialState', {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json'
      }
    })
    .then((response) => {
      if (response.state === 200) {
        dispatch(ACTIONS.receiveData(JSON.parse(response.body)))
      }
    })
    .catch((err) => {
      dispatch(ACTIONS.receiveError(err))
    });
  }
}

//Post user budget data
export function postBudget(data) {
  console.log('in postBudget', data);
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
      if (response.statue === 200) {
        dispatch(ACTIONS.receiveData(JSON.parse(response.body)))
      }
    })
    .catch((error) => {
      dispatch(ACTIONS.receiveError(error));
    })
  }
}