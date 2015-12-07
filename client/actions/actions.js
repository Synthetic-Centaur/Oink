export function requestData() {
  return { type: 'REQ_DATA' }
}

export function receiveData(data) {
  return {
    type: 'RECV_DATA',
    payload: data
  }
}

export function receiveError(data) {
  return {
    type: 'RECV_ERROR',
    payload: data
  }
}
