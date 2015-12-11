import expect from 'expect'
import * as reducers from '../client/reducers/reducers'
import * as actions from '../client/actions/actions'

describe('asyncStatus reducer', () => {
  
  it('should return the initial state', () => {
    expect(
      reducers.asyncStatusReducer(undefined, {})
    ).toEqual([{
      isLoading: false,
      data: [],
      error: false
    }])
  })

  it('should handle RECV_DATA', () => {
    expect(reducers.asyncStatusReducer([], {
      type: 'RECV_DATA',
      data: {budgets: [], categories: []}
    })).toEqual([{
      isLoading: false,
      data: {budgets: [], categories: []},
      error: false
    }])
  })

})