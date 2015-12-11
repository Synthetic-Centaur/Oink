import expect from 'expect'
import { applyMiddleware } from 'redux'
import thunk from 'redux-thunk'
import * as actions from '../client/actions'
import * as asyncActions from '../client/api/apiHandlers'
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

    const mockStoreWithMiddleware = applyMiddleware(
      ...middlewares
    )(mockStoreWithoutMiddleware)

    return mockStoreWithMiddleware()
  }
}

////////////////////////////////////////////////////////////////////////////////////////

describe('async actions', () => {
  afterEach(() => {
    nock.cleanAll()
  })

  it('creates RECV_DATA action when fetching intial state has been completed', (done) => {
    nock('localhost:3000')
      .get('/api/initialState')
      .reply(200, { budget: ['some budget'], categories: ['some categories'] })

    const expectedActions = [
      { type: 'REQ_DATA' },
      { type: 'RECV_DATA', data: { budget: ['some budget'], categories: ['some categories'] }}
    ]

    const store = mockStore({ data: [] }, expectedActions, done)
    store.dispatch(asyncActions.getInitialState())
  })

  // it('create RECV_DATA action when posting budget category has been completed', (done) => {
  //   nock('localhost:3000')
  //     //how do we add /:categoryid ???
  //     .post('/api/budget/category/')
  //     .reply(200, {})
  // })

})

describe('actions', () => {
  
})