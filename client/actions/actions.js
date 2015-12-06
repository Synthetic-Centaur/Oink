import axios from 'axios'
// import { pushState } from 'redux-react-router'
import { updatePath, pushPath } from 'redux-simple-router'

function requestData() {
  return { type: 'REQ_DATA' }
}

function receiveData(data) {
  return {
    type: 'RECV_DATA',
    payload: data
  }
}

function receiveError(data) {
  return {
    type: 'RECV_ERROR',
    payload: data
  }
}

export function postLogin(data) {
  return function(dispatch) {
    dispatch(requestData())
    // return axios.post('/auth/login', {
    //   email: data.email,
    //   password: data.password
    // })
    // .then((response) => {
    //   if (response.status === 200) {
    //     dispatch(receiveData(response.data))
    //     dispatch(updatePath('/home'))
    //   }
    // })
    // .catch((response) => {
    //   dispatch(receiveError(response.data))
    //   console.error(response)
    // });
  }
}

export function postSignup(data) {
  return function(dispatch) {
    dispatch(requestData())
    dispatch(updatePath('/plaid'))
    
  //   return axios.post('/auth/signup', {
  //     email: data.email,
  //     password: data.password,
  //     firstName: data.firstName,
  //     lastName: data.lastName,
  //     phone: data.phone
  //   })
  //   .then((response) => {
  //     if (response.status === 200) {
  //       dispatch(receiveData(response.data))
  //       dispatch(updatePath('/plaid'))
  //     }
  //   })
  //   .catch((response) => {
  //     dispatch(receiveError(response.data))
  //     console.error(response)
  //   });
  
  }
}
