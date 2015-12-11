import * as ACTIONS from '../actions/actions'

//Get initial state data for user
export function getInitialState() {
  console.log('In getInitialState');
  return function(dispatch) {
    console.log('got one line down')
    dispatch(ACTIONS.requestData());
    return fetch('/api/initialState', {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        'authorization': 'Bearer ' + JSON.parse(window.localStorage.redux).auth.token
      }
    })
    .then((response) => {
      console.log('YAY got response back from getInitialState')
      if (response.status === 200) {
        return response.json()
      }
    }).then((response) => {
      console.log('intitial state ---------->', response)
      dispatch(ACTIONS.receiveData(response))
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
      if (response.status === 200) {
        getInitialState()(dispatch)
      }
    })
    .catch((error) => {
      dispatch(ACTIONS.receiveError(error));
    })
  }
}
