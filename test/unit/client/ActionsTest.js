import expect from 'expect'
import { applyMiddleware } from 'redux'
import thunk from 'redux-thunk'
import * as ACTIONS from '../../../client/actions/actions'
import * as asyncActions from '../../../client/api/apiHandlers'
import nock from 'nock'

const middleware = [ thunk ]

/////////////////////Create mock Redux store with middleware////////////////////////////
function mockStore(getState, expectedActions, done) {
  if (!Array.isArray(expectedActions)) {
    throw new Error('expectedActions should be an array of expected actions.')
  }
  if (typeof done !== 'undefined' && typeof done !== 'function') {
    throw new Error('done should either be undefined or a function.')
  }

  function mockStoreWithoutMiddleware() {
    return {
      getState() {
        return typeof getState === 'function' ?
          getState() :
          getState
      },

      dispatch(action) {
        const expectedAction = expectedActions.shift()

        try {
          expect(action).toEqual(expectedAction)
          if (done && !expectedActions.length) {
            done()
          }
          return action 
        } catch (e) {
          done(e)
        }
      }
    }


  }
    const mockStoreWithMiddleware = applyMiddleware(...middleware)(mockStoreWithoutMiddleware)
    return mockStoreWithMiddleware()
}

////////////////////////////////////////////////////////////////////////////////////////



describe('async actions', () => {
  afterEach(() => {
    nock.cleanAll()
  })

  it('should dispatch SHOW_LOGIN action', (done) => {
    const expectedActions = [
      { type: 'SHOW_LOGIN'}
    ]

    const store = mockStore({ showLogin: false, showSignup: false }, expectedActions, done)
    store.dispatch(ACTIONS.showLogin())
  })

  it('should dispatch HIDE_LOGIN action', (done) => {
    const expectedActions = [
      { type: 'HIDE_LOGIN' }
    ]

    const store = mockStore({ showLogin: false, showSignup: false }, expectedActions, done)
    store.dispatch(ACTIONS.hideLogin())
  })

  it('should dispatch HIDE_SIGNUP action', (done) => {
    const expectedActions = [
      { type: 'HIDE_SIGNUP' }
    ]

    const store = mockStore({ showLogin: false, showSignup: false }, expectedActions, done)
    store.dispatch(ACTIONS.hideSignup())
  })

  it('should dispatch ADD_JWT action', (done) => {
    const expectedActions = [
      { type: 'ADD_JWT' }
    ]

    const store = mockStore({ isAuthenticated: false, token: '', expiryDate: null }, expectedActions, done)
    store.dispatch(ACTIONS.addJWT())
  })

  // it('creates RECV_DATA action when fetching intial state has been completed', (done) => {
  //   nock('http://localhost:3000')
  //     .get('/api/initialState')
  //     .reply(200, { budget: ['some budget'], categories: ['some categories'] })

  //   const expectedActions = [
  //     { type: 'REQ_DATA' },
  //     { type: 'RECV_DATA', data: { budget: ['some budget'], categories: ['some categories'] }}
  //   ]

  //   const store = mockStore({ data: [] }, expectedActions, done)
  //   store.dispatch(asyncActions.getInitialState('token'))
  // })

  // it('create RECV_DATA action when posting budget category has been completed', (done) => {
  //   nock('localhost:3000')
  //     //how do we add /:categoryid ???
  //     .post('/api/budget/category/')
  //     .reply(200, {})
  // })

})

describe('synchronous actions', () => {
  it('should create an action to request data', () => {
    const expectedAction = {
      type: 'REQ_DATA'
    }
    expect(ACTIONS.requestData()).toEqual(expectedAction)
  })

  it('should create an action to receive data', () => {
    const data = {budgets: [], categories: []}
    const expectedAction = {
      type: 'RECV_DATA',
      data
    }
    expect(ACTIONS.receiveData(data)).toEqual(expectedAction)
  })

  it('should create an action to receive error', () => {
    const data = 'error'
    const expectedAction = {
      type: 'RECV_ERROR',
      data
    }
    expect(ACTIONS.receiveError(data)).toEqual(expectedAction)
  })
})