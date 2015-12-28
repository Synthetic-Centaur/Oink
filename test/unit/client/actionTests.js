import expect from 'expect'
import { applyMiddleware } from 'redux'
import thunk from 'redux-thunk'
import * as ACTIONS from '../../../client/actions/actions'
import * as asyncActions from '../../../client/actions/api/apiActions'
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
  // afterEach(() => {
  //   nock.cleanAll()
  // })

  // it('should dispatch SHOW_LOGIN action', (done) => {
  //   const expectedActions = [
  //     { type: 'SHOW_LOGIN'}
  //   ]

  //   const store = mockStore({ showLogin: false, showSignup: false }, expectedActions, done)
  //   let dispatch = store.dispatch
  //   ACTIONS.showLogin()(dispatch)

  //   expect(store.getState()).toEqual({showLogin: true, showSignup: false})
  // })

  // it('should dispatch HIDE_LOGIN action', (done) => {
  //   const expectedActions = [
  //     { type: 'HIDE_LOGIN' }
  //   ]

  //   const store = mockStore({ showLogin: false, showSignup: false }, expectedActions, done)
  //   store.dispatch(ACTIONS.hideLogin())
  // })

  // it('should dispatch HIDE_SIGNUP action', (done) => {
  //   const expectedActions = [
  //     { type: 'HIDE_SIGNUP' }
  //   ]

  //   const store = mockStore({ showLogin: false, showSignup: false }, expectedActions, done)
  //   store.dispatch(ACTIONS.hideSignup())
  //   // expect(store.getState()).toEqual()
  // })

  // it('should dispatch ADD_JWT action', (done) => {
  //   let jwt = 'testJWT'
  //   let expiryDate = Date.now()
  //   const expectedActions = [
  //     { type: 'ADD_JWT', jwt: jwt, expiryDate: expiryDate }
  //   ]

  //   const store = mockStore({ isAuthenticated: false, token: '', expiryDate: null }, expectedActions, done)
  //   store.dispatch(ACTIONS.addJWT({jwt_token: jwt, expiresIn: 0}))
  //   // expect(store.getState()).toEqual()
  // })

  // it('should dispatch REMOVE_JWT action', (done) => {
  //   const expectedActions = [
  //     { type: 'REMOVE_JWT' }
  //   ]

  //   const store = mockStore({ isAuthenticated: false, token: '', expiryDate: null }, expectedActions, done)
  //   store.dispatch(ACTIONS.removeJWT())
  //   expect(store.getState()).toEqual({ isAuthenticated: false, token: '', expiryDate: null })
  // })

  // it('should dispatch ALLOW_CAT action', (done) => {
  //   const expectedActions = [
  //     { type: 'ALLOW_CAT', data: 'testCat' }
  //   ]

  //   const store = mockStore({numberError: true, categoryError: true, category: '' }, expectedActions, done)
  //   store.dispatch(ACTIONS.categoryValidation(false, 'testCat'))
  // })

  // it('should dispatch ALLOW_NUM action', (done) => {
  //   const expectedActions = [
  //     { type: 'ALLOW_NUM' }
  //   ]

  //   const store = mockStore({numberError: true, categoryError: true, category: '' }, expectedActions, done)
  //   store.dispatch(ACTIONS.numberValidation(true))
  // })

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

// describe('synchronous actions', () => {
//   it('should create an action to request data', () => {
//     let expectedAction = {
//       type: 'REQ_DATA'
//     }
//     expect(ACTIONS.requestData()).toEqual(expectedAction)
//   })

//   it('should create an action to receive data', () => {
//     let data = {budgets: [], categories: []}
//     let expectedAction = {
//       type: 'RECV_DATA',
//       data
//     }
//     expect(ACTIONS.receiveData(data)).toEqual(expectedAction)
//   })

//   it('should create an action to receive error', () => {
//     let data = 'error'
//     let expectedAction = {
//       type: 'RECV_ERROR',
//       data
//     }
//     expect(ACTIONS.receiveError(data)).toEqual(expectedAction)
//   })

//   it('should create an action to receive error', () => {
//     let data = 'error'
//     let expectedAction = {
//       type: 'RECV_ERROR',
//       data
//     }
//     expect(ACTIONS.receiveError(data)).toEqual(expectedAction)
//   })
// })

describe('Action Tests', () => {
  let dispatchedAction = {}
  let dispatch = function(action) {
    dispatchedAction = action
  }

  describe('Dashboard Actions', () => {
    beforeEach(() => {
      dispatchedAction = {}
    })
    
    it('should dispatch SWITCH_COMPONENT', () => {
      let component = {}
      let expectedAction = {
        type: 'SWITCH_COMPONENT',
        data: component
      }

      ACTIONS.switchComponent(component)(dispatch)
      expect(dispatchedAction).toEqual(expectedAction)
    })

    it('should dispatch SHOW_PHONE_VERIFY', () => {
      let expectedAction = {
        type: 'SHOW_PHONE_VERIFY'
      }

      ACTIONS.showPhoneVerify()(dispatch)
      expect(dispatchedAction).toEqual(expectedAction)
    })

    it('should dispatch HIDE_PHONE_VERIFY', () => {
      let expectedAction = {
        type: 'HIDE_PHONE_VERIFY'
      }

      ACTIONS.hidePhoneVerify()(dispatch)
      expect(dispatchedAction).toEqual(expectedAction)
    })
  })

  describe('Budget Actions', () => {
    beforeEach(() => {
      dispatchedAction = {}
    })

    it('should dispatch CHANGE_SETTINGS_VIEW', () => {
      let view = 'Heatmap'
      let expectedAction = {
        type: 'CHANGE_SETTINGS_VIEW',
        view: view
      }

      ACTIONS.changeSettingsView(view)(dispatch)
      expect(dispatchedAction).toEqual(expectedAction)
    })

    it('should dispatch CHANGE_CURRENT_BUDGET', () => {
      let budgetIndex = 1
      let expectedAction = {
      type: 'CHANGE_CURRENT_BUDGET',
      budgetIndex: budgetIndex
    }

      ACTIONS.changeCurrentBudget(budgetIndex)(dispatch)
      expect(dispatchedAction).toEqual(expectedAction)
    })

  })

  describe('Async Actions', () => {
    it('should create an action REQ_DATA', () => {
      let expectedAction = {
        type: 'REQ_DATA'
      }

      expect(ACTIONS.requestData()).toEqual(expectedAction)
    })

    it('should create an action RECV_DATA', () => {
      let data = {budgets: [], categories: []}
      let expectedAction = {
        type: 'RECV_DATA',
        data
      }

      expect(ACTIONS.receiveData(data)).toEqual(expectedAction)
    })

    it('should create an action RECV_ERROR', () => {
      let data = 'error'
      let expectedAction = {
        type: 'RECV_ERROR',
        data
      }

      expect(ACTIONS.receiveError(data)).toEqual(expectedAction)
    })
  })

  describe('Login Actions', () => {
    beforeEach(() => {
      dispatchedAction = {}
    })
    
    it('should dispatch SHOW_LOGIN', () => {
      let expectedAction = {
        type: 'SHOW_LOGIN',
      }

      ACTIONS.showLogin()(dispatch)
      expect(dispatchedAction).toEqual(expectedAction)
    })

    it('should dispatch HIDE_LOGIN', () => {
      let expectedAction = {
        type: 'HIDE_LOGIN',
      }

      ACTIONS.hideLogin()(dispatch)
      expect(dispatchedAction).toEqual(expectedAction)
    })

    it('should dispatch INVALID_EMAIL', () => {
      let expectedAction = {
        type: 'INVALID_EMAIL',
      }

      ACTIONS.invalidEmail()(dispatch)
      expect(dispatchedAction).toEqual(expectedAction)
    })

    it('should dispatch INVALID_PASSWORD', () => {
      let expectedAction = {
        type: 'INVALID_PASSWORD',
      }

      ACTIONS.invalidPassword()(dispatch)
      expect(dispatchedAction).toEqual(expectedAction)
    })

    it('should dispatch INVALID_BANK', () => {
      let expectedAction = {
        type: 'INVALID_BANK',
      }

      ACTIONS.invalidBank()(dispatch)
      expect(dispatchedAction).toEqual(expectedAction)
    })
  })

  describe('Signup Actions', () => {
    beforeEach(() => {
      dispatchedAction = {}
    })
    
    it('should dispatch SHOW_SIGNUP', () => {
      let expectedAction = {
        type: 'SHOW_SIGNUP',
      }

      ACTIONS.showSignup()(dispatch)
      expect(dispatchedAction).toEqual(expectedAction)
    })

    it('should dispatch HIDE_SIGNUP', () => {
      let expectedAction = {
        type: 'HIDE_SIGNUP',
      }

      ACTIONS.hideSignup()(dispatch)
      expect(dispatchedAction).toEqual(expectedAction)
    })

    it('should dispatch USER_EXISTS', () => {
      let expectedAction = {
        type: 'USER_EXISTS',
      }

      ACTIONS.userExists()(dispatch)
      expect(dispatchedAction).toEqual(expectedAction)
    })

    it('should dispatch REMOVE_ALERTS', () => {
      let expectedAction = {
        type: 'REMOVE_ALERTS',
      }

      ACTIONS.removeAlerts()(dispatch)
      expect(dispatchedAction).toEqual(expectedAction)
    })
  })

  describe('Plaid Actions', () => {
    beforeEach(() => {
      dispatchedAction = {}
    })
    
    it('should dispatch SHOW_PLAID', () => {
      let expectedAction = {
        type: 'SHOW_PLAID',
      }

      ACTIONS.showPlaid()(dispatch)
      expect(dispatchedAction).toEqual(expectedAction)
    })

    it('should dispatch HIDE_PLAID', () => {
      let expectedAction = {
        type: 'HIDE_PLAID',
      }

      ACTIONS.hidePlaid()(dispatch)
      expect(dispatchedAction).toEqual(expectedAction)
    })
  })

  describe('Authentication Actions', () => {
    beforeEach(() => {
      dispatchedAction = {}
    })
    
    it('should dispatch ADD_JWT', () => {
      let data = { jwt_token: '123', expiresIn: 10 }
      let expectedAction = {
        type: 'ADD_JWT',
        jwt: data.jwt_token,
        expiryDate: Date.now() + data.expiresIn
      }

      ACTIONS.addJWT(data)(dispatch)
      expect(dispatchedAction).toEqual(expectedAction)
    })

    it('should dispatch REMOVE_JWT', () => {
      let expectedAction = {
        type: 'REMOVE_JWT',
      }

      ACTIONS.removeJWT()(dispatch)
      expect(dispatchedAction).toEqual(expectedAction)
    })

    it('should dispatch AUTHENTICATE_USER', () => {
      let expectedAction = {
        type: 'AUTHENTICATE_USER',
      }

      ACTIONS.authenticateUser()(dispatch)
      expect(dispatchedAction).toEqual(expectedAction)
    })

    it('should dispatch ALLOW_CAT', () => {
      let category = 'Food and Drink'
      let expectedAction = {
        type: 'ALLOW_CAT',
        data: category
      }

      ACTIONS.categoryValidation(false, category)(dispatch)
      expect(dispatchedAction).toEqual(expectedAction)
    })

    it('should dispatch DISABLE_CAT', () => {
      let expectedAction = {
        type: 'DISABLE_CAT'
      }

      ACTIONS.categoryValidation(true)(dispatch)
      expect(dispatchedAction).toEqual(expectedAction)
    })

  })

})
