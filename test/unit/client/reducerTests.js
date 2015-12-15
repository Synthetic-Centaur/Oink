import expect from 'expect'
import * as reducers from '../../../client/reducers/reducers'
import * as actions from '../../../client/actions/actions'

describe('asyncStatus reducer', () => {

  it('should return the initial state', () => {
    expect(
      reducers.asyncStatusReducer(undefined, {})
    ).toEqual({
      isLoading: false,
      data: {},
      error: false
    })
  })

  it('should handle RECV_DATA', () => {
    expect(reducers.asyncStatusReducer(undefined, {
      type: 'RECV_DATA',
      data: {budgets: [], categories: []}
    })).toEqual({
      isLoading: false,
      data: {budgets: [], categories: []},
      error: false
    })
  })

  it('should handle RECV_ERROR', () => {
    expect(reducers.asyncStatusReducer(undefined, {
      type: 'RECV_ERROR',
      data: 'error'
    })).toEqual({
      isLoading: false,
      data: 'error',
      error: true
    })
  })

  it('should handle REQ_DATA', () => {
    expect(reducers.asyncStatusReducer(undefined, {
      type: 'REQ_DATA'
    })).toEqual({
      isLoading: true,
      error: false,
      data: {}
    })
  })

})

describe('splashPageReducer', () => {

  it('should return the initial state', () => {
    expect(
      reducers.splashPageReducer(undefined, {})
    ).toEqual({
      showLogin: false,
      showSignup: false
    })
  })

  it('should handle SHOW_LOGIN', () => {
    expect(
      reducers.splashPageReducer(undefined, {
        type: 'SHOW_LOGIN'
      })
    ).toEqual({
      showLogin: true,
      showSignup: false
    })
  })

  it('should handle HIDE_LOGIN', () => {
    expect(
      reducers.splashPageReducer(undefined, {
        type: 'HIDE_LOGIN'
      })
    ).toEqual({
      showLogin: false,
      showSignup: false
    })
  })

  it('should handle SHOW_SIGNUP', () => {
    expect(
      reducers.splashPageReducer(undefined, {
        type: 'SHOW_SIGNUP'
      })
    ).toEqual({
      showLogin: false,
      showSignup: true
    })
  })

  it('should handle HIDE_SIGNUP', () => {
    expect(
      reducers.splashPageReducer(undefined, {
        type: 'HIDE_SIGNUP'
      })
    ).toEqual({
      showLogin: false,
      showSignup: false
    })
  })
})

describe('homePageReducer', () => {

  it('should return the initial state', () => {
    expect(
      reducers.homePageReducer(undefined, {})
    ).toEqual({
      numberError: true,
      categoryError: true,
      category: ''
    })
  })

  it('should handle ALLOW_NUM', () => {
    expect(
      reducers.homePageReducer(undefined, {
        type: 'ALLOW_NUM'
      })
    ).toEqual({
      numberError: false,
      categoryError: true,
      category: ''
    })
  })

  it('should handle DISABLE_NUM', () => {
    expect(
      reducers.homePageReducer(undefined, {
        type: 'DISABLE_NUM'
      })
    ).toEqual({
      numberError: true,
      categoryError: true,
      category: ''
    })
  })

  it('should handle ALLOW_CAT', () => {
    expect(
      reducers.homePageReducer(undefined, {
        type: 'ALLOW_CAT',
        data: 'testCategory'
      })
    ).toEqual({
      numberError: true,
      categoryError: false,
      category: 'testCategory'
    })
  })

  it('should handle DISABLE_CAT', () => {
    expect(
      reducers.homePageReducer(undefined, {
        type: 'DISABLE_CAT'
      })
    ).toEqual({
      numberError: true,
      categoryError: true,
      category: ''
    })
  })
})

describe('authReducer', () => {
  
  it('should return initial state', () => {
    expect(
      reducers.authReducer(undefined, {})
    ).toEqual({
      isAuthenticated: false,
      token: '',
      expiryDate: null
    })
  })

  it('should handle ADD_JWT', () => {
    let testDate = Date.now()
    expect(
      reducers.authReducer(undefined, {
        type: 'ADD_JWT',
        jwt: 'testJWT',
        expiryDate: testDate
      })
    ).toEqual({
      isAuthenticated: true,
      token: 'testJWT',
      expiryDate: testDate
    })
  })

  it('should handle REMOVE_JWT', () => {
    expect(
      reducers.authReducer(undefined, {
        type: 'REMOVE_JWT'
      })
    ).toEqual({
      isAuthenticated: false,
      token: '',
      expiryDate: null
    })
  })
})
