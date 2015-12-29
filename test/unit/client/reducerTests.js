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
      errorText: '',
      invalidBank: false,
      invalidEmail: false,
      invalidPassword: false,
      missingSignupFields: false,
      passwordMatchError: false,
      showLogin: false,
      showSignup: false,
      userExists: false
    })
  })

  it('should handle SHOW_LOGIN', () => {
    expect(
      reducers.splashPageReducer(undefined, {
        type: 'SHOW_LOGIN'
      })
    ).toEqual({
      errorText: '',
      invalidBank: false,
      invalidEmail: false,
      invalidPassword: false,
      missingSignupFields: false,
      passwordMatchError: false,
      showLogin: true,
      showSignup: false,
      userExists: false
    })
  })

  it('should handle HIDE_LOGIN', () => {
    expect(
      reducers.splashPageReducer(undefined, {
        type: 'HIDE_LOGIN'
      })
    ).toEqual({
      errorText: '',
      invalidBank: false,
      invalidEmail: false,
      invalidPassword: false,
      missingSignupFields: false,
      passwordMatchError: false,
      showLogin: false,
      showSignup: false,
      userExists: false
    })
  })

  it('should handle SHOW_SIGNUP', () => {
    expect(
      reducers.splashPageReducer(undefined, {
        type: 'SHOW_SIGNUP'
      })
    ).toEqual({
      errorText: '',
      invalidBank: false,
      invalidEmail: false,
      invalidPassword: false,
      missingSignupFields: false,
      passwordMatchError: false,
      showLogin: false,
      showSignup: true,
      userExists: false
    })
  })

  it('should handle HIDE_SIGNUP', () => {
    expect(
      reducers.splashPageReducer(undefined, {
        type: 'HIDE_SIGNUP'
      })
    ).toEqual({
      errorText: '',
      invalidBank: false,
      invalidEmail: false,
      invalidPassword: false,
      missingSignupFields: false,
      passwordMatchError: false,
      showLogin: false,
      showSignup: false,
      userExists: false
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
      firstPull: false,
      category: '',
      showSettings: false,
      showVerify: false,
      verifySuccess: false,
      errorText: ''
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
      firstPull: false,
      category: '',
      showSettings: false,
      showVerify: false,
      verifySuccess: false,
      errorText: ''
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
      category: '',
      showSettings: false,
      firstPull: false,
      showVerify: false,
      verifySuccess: false,
      errorText: ''
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
      category: 'testCategory',
      showSettings: false,
      firstPull: false,
      showVerify: false,
      verifySuccess: false,
      errorText: ''
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
      category: '',
      showSettings: false,
      firstPull: false,
      showVerify: false,
      verifySuccess: false,
      errorText: ''
    })
  })

  it('should handle SHOW_SETTINGS', () => {
    expect(
      reducers.homePageReducer(undefined, {
        type: 'SHOW_SETTINGS'
      })
    ).toEqual({
      numberError: true,
      categoryError: true,
      category: '',
      showSettings: true,
      firstPull: false,
      showVerify: false,
      verifySuccess: false,
      errorText: ''
    })
  })

  it('should handle HIDE_SETTINGS', () => {
    expect(
      reducers.homePageReducer(undefined, {
        type: 'HIDE_SETTINGS'
      })
    ).toEqual({
      numberError: true,
      categoryError: true,
      category: '',
      showSettings: false,
      firstPull: false,
      showVerify: false,
      verifySuccess: false,
      errorText: ''
    })
  })

  it('should handle SHOW_PHONE_VERIFY', () => {
    expect(
      reducers.homePageReducer(undefined, {
        type: 'SHOW_PHONE_VERIFY'
      })
    ).toEqual({
      numberError: true,
      categoryError: true,
      category: '',
      showSettings: false,
      firstPull: false,
      showVerify: true,
      verifySuccess: false,
      errorText: ''
    })
  })

  it('should handle HIDE_PHONE_VERIFY', () => {
    expect(
      reducers.homePageReducer(undefined, {
        type: 'HIDE_PHONE_VERIFY'
      })
    ).toEqual({
      numberError: true,
      categoryError: true,
      category: '',
      showSettings: false,
      firstPull: false,
      showVerify: false,
      verifySuccess: false,
      errorText: ''
    })
  })

  it('should handle PHONE_VERIFY_SUCCESS', () => {
    expect(
      reducers.homePageReducer(undefined, {
        type: 'PHONE_VERIFY_SUCCESS'
      })
    ).toEqual({
      numberError: true,
      categoryError: true,
      category: '',
      showSettings: false,
      firstPull: false,
      showVerify: false,
      verifySuccess: true,
      errorText: ''
    })
  })

  it('should handle PHONE_VERIFY_ERROR', () => {
    expect(
      reducers.homePageReducer(undefined, {
        type: 'PHONE_VERIFY_ERROR'
      })
    ).toEqual({
      numberError: true,
      categoryError: true,
      category: '',
      showSettings: false,
      firstPull: false,
      showVerify: false,
      verifySuccess: false,
      errorText: 'Incorrect Code. Please try again'
    })
  })

  it('should handle FIRST_PULL_START', () => {
    expect(
      reducers.homePageReducer(undefined, {
        type: 'FIRST_PULL_START'
      })
    ).toEqual({
      numberError: true,
      categoryError: true,
      category: '',
      showSettings: false,
      firstPull: true,
      showVerify: false,
      verifySuccess: false,
      errorText: ''
    })
  })

  it('should handle FIRST_PULL_COMPLETE', () => {
    expect(
      reducers.homePageReducer(undefined, {
        type: 'FIRST_PULL_COMPLETE'
      })
    ).toEqual({
      numberError: true,
      categoryError: true,
      category: '',
      showSettings: false,
      firstPull: false,
      showVerify: false,
      verifySuccess: false,
      errorText: ''
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
      isAuthenticated: false,
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

describe('settingsReducer', () => {
  
  it('should return initial state', () => {
    expect(
      reducers.settingsReducer(undefined, {})
    ).toEqual({
      editingFirstName: false,
      editingLastName: false,
      editingEmail: false,
      editingPhoneNumber: false,
      editingPassword: false,
      editingDeleteAccount: false,
      accountData: {},
      communicationData: {},
      securityData: {}
    })
  })

  it('should handle EDIT_START', () => {
    expect(
      reducers.settingsReducer(undefined, {
        type: 'EDIT_START',
        data: 'FIRST_NAME'
      })
    ).toEqual({
      editingFirstName: true,
      editingLastName: false,
      editingEmail: false,
      editingPhoneNumber: false,
      editingPassword: false,
      editingDeleteAccount: false,
      accountData: {},
      communicationData: {},
      securityData: {}
    })
    expect(
      reducers.settingsReducer(undefined, {
        type: 'EDIT_START',
        data: 'LAST_NAME'
      })
    ).toEqual({
      editingFirstName: false,
      editingLastName: true,
      editingEmail: false,
      editingPhoneNumber: false,
      editingPassword: false,
      editingDeleteAccount: false,
      accountData: {},
      communicationData: {},
      securityData: {}
    })
    expect(
      reducers.settingsReducer(undefined, {
        type: 'EDIT_START',
        data: 'EMAIL'
      })
    ).toEqual({
      editingFirstName: false,
      editingLastName: false,
      editingEmail: true,
      editingPhoneNumber: false,
      editingPassword: false,
      editingDeleteAccount: false,
      accountData: {},
      communicationData: {},
      securityData: {}
    })
    expect(
      reducers.settingsReducer(undefined, {
        type: 'EDIT_START',
        data: 'PHONE_NUMBER'
      })
    ).toEqual({
      editingFirstName: false,
      editingLastName: false,
      editingEmail: false,
      editingPhoneNumber: true,
      editingPassword: false,
      editingDeleteAccount: false,
      accountData: {},
      communicationData: {},
      securityData: {}
    })
    expect(
      reducers.settingsReducer(undefined, {
        type: 'EDIT_START',
        data: 'PASSWORD'
      })
    ).toEqual({
      editingFirstName: false,
      editingLastName: false,
      editingEmail: false,
      editingPhoneNumber: false,
      editingPassword: true,
      editingDeleteAccount: false,
      accountData: {},
      communicationData: {},
      securityData: {}
    })
    expect(
      reducers.settingsReducer(undefined, {
        type: 'EDIT_START',
        data: 'DELETE_ACCOUNT'
      })
    ).toEqual({
      editingFirstName: false,
      editingLastName: false,
      editingEmail: false,
      editingPhoneNumber: false,
      editingPassword: false,
      editingDeleteAccount: true,
      accountData: {},
      communicationData: {},
      securityData: {}
    })
  })
  it('should handle EDIT_FINISH', () => {
    expect(
      reducers.settingsReducer(undefined, {
        type: 'EDIT_FINISH',
        data: 'FIRST_NAME'
      })
    ).toEqual({
      editingFirstName: false,
      editingLastName: false,
      editingEmail: false,
      editingPhoneNumber: false,
      editingPassword: false,
      editingDeleteAccount: false,
      accountData: {},
      communicationData: {},
      securityData: {}
    })
    expect(
      reducers.settingsReducer(undefined, {
        type: 'EDIT_FINISH',
        data: 'LAST_NAME'
      })
    ).toEqual({
      editingFirstName: false,
      editingLastName: false,
      editingEmail: false,
      editingPhoneNumber: false,
      editingPassword: false,
      editingDeleteAccount: false,
      accountData: {},
      communicationData: {},
      securityData: {}
    })
    expect(
      reducers.settingsReducer(undefined, {
        type: 'EDIT_FINISH',
        data: 'EMAIL'
      })
    ).toEqual({
      editingFirstName: false,
      editingLastName: false,
      editingEmail: false,
      editingPhoneNumber: false,
      editingPassword: false,
      editingDeleteAccount: false,
      accountData: {},
      communicationData: {},
      securityData: {}
    })
    expect(
      reducers.settingsReducer(undefined, {
        type: 'EDIT_FINISH',
        data: 'PHONE_NUMBER'
      })
    ).toEqual({
      editingFirstName: false,
      editingLastName: false,
      editingEmail: false,
      editingPhoneNumber: false,
      editingPassword: false,
      editingDeleteAccount: false,
      accountData: {},
      communicationData: {},
      securityData: {}
    })
    expect(
      reducers.settingsReducer(undefined, {
        type: 'EDIT_FINISH',
        data: 'PASSWORD'
      })
    ).toEqual({
      editingFirstName: false,
      editingLastName: false,
      editingEmail: false,
      editingPhoneNumber: false,
      editingPassword: false,
      editingDeleteAccount: false,
      accountData: {},
      communicationData: {},
      securityData: {}
    })
    expect(
      reducers.settingsReducer(undefined, {
        type: 'EDIT_FINISH',
        data: 'DELETE_ACCOUNT'
      })
    ).toEqual({
      editingFirstName: false,
      editingLastName: false,
      editingEmail: false,
      editingPhoneNumber: false,
      editingPassword: false,
      editingDeleteAccount: false,
      accountData: {},
      communicationData: {},
      securityData: {}
    })
  })

})
