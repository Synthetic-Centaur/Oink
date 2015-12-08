import * as ACTIONS from '../actions/actions'

export function getInitialState() {
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

export function postBudget(data) {
  const categories = {
    //this might be populated with the corresponding id's of each category
  }
  return function(dispatch) {
    dispatch(ACTIONS.requestData());
    return fetch('/api/budget/category/' + id, {
      method: 'POST',
      header: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        budget: data.budget,
        category: data.category
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