import expect from 'expect'
import * as ACTIONS from '../../../client/actions/actions'

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

  describe('Budget Page Actions', () => {
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

    it('should dispatch ALLOW_NUM', () => {
      let expectedAction = {
        type: 'ALLOW_NUM'
      }

      ACTIONS.numberValidation(true)(dispatch)
      expect(dispatchedAction).toEqual(expectedAction)
    })

    it('should dispatch DISABLE_NUM', () => {
      let expectedAction = {
        type: 'DISABLE_NUM'
      }

      ACTIONS.numberValidation(false)(dispatch)
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
  })

  describe('Spending Page Actions', () => {
    beforeEach(() => {
      dispatchedAction = {}
    })
    
    it('should dispatch SELECT_DATE', () => {
      let date = Date.now()
      let expectedAction = {
        type: 'SELECT_DATE',
        data: date
      }

      ACTIONS.selectDate(date)(dispatch)
      expect(dispatchedAction).toEqual(expectedAction)
    })
  })

  describe('Goal Page Actions', () => {
    beforeEach(() => {
      dispatchedAction = {}
    })
    
    it('should dispatch SWITCH_GOAL', () => {
      let goal = 'XYZ'
      let expectedAction = {
        type: 'SWITCH_GOAL',
        data: goal
      }

      ACTIONS.switchGoal(goal)(dispatch)
      expect(dispatchedAction).toEqual(expectedAction)
    })

    it('should dispatch ALLOW_SUBMISSION', () => {
      let expectedAction = {
        type: 'ALLOW_SUBMISSION'
      }

      ACTIONS.validateGoal(true)(dispatch)
      expect(dispatchedAction).toEqual(expectedAction)
    })

    it('should dispatch DISALLOW_SUBMISSION', () => {
      let expectedAction = {
        type: 'DISALLOW_SUBMISSION'
      }

      ACTIONS.validateGoal(false)(dispatch)
      expect(dispatchedAction).toEqual(expectedAction)
    })

    it('should dispatch ENTER_AVG', () => {
      let avg = 1000
      let expectedAction = {
        type: 'ENTER_AVG',
        data: avg
      }

      ACTIONS.selectAvg(avg)(dispatch)
      expect(dispatchedAction).toEqual(expectedAction)
    })

    it('should dispatch CHANGE_GOAL_VIEW', () => {
      let view = 'EDIT'
      let expectedAction = {
        type: 'CHANGE_GOAL_VIEW',
        data: view
      }

      ACTIONS.changeGoalView(view)(dispatch)
      expect(dispatchedAction).toEqual(expectedAction)
    })
  })

  describe('Settings Actions', () => {
    beforeEach(() => {
      dispatchedAction = {}
    })
    
    it('should dispatch SHOW_SETTINGS', () => {
      let expectedAction = {
        type: 'SHOW_SETTINGS'
      }

      ACTIONS.showSettings()(dispatch)
      expect(dispatchedAction).toEqual(expectedAction)
    })

    it('should dispatch HIDE_SETTINGS', () => {
      let expectedAction = {
        type: 'HIDE_SETTINGS'
      }

      ACTIONS.hideSettings()(dispatch)
      expect(dispatchedAction).toEqual(expectedAction)
    })

    it('should dispatch EDIT_START', () => {
      let item = 2
      let expectedAction = {
        type: 'EDIT_START',
        data: item
      }

      ACTIONS.editStart(item)(dispatch)
      expect(dispatchedAction).toEqual(expectedAction)
    })

    it('should dispatch EDIT_FINISH', () => {
      let item = 2
      let expectedAction = {
        type: 'EDIT_FINISH',
        data: item
      }

      ACTIONS.editFinish(item)(dispatch)
      expect(dispatchedAction).toEqual(expectedAction)
    })

    it('should dispatch UPDATE_ACCOUNT_SETTINGS', () => {
      let item = 2
      let expectedAction = {
        type: 'UPDATE_ACCOUNT_SETTINGS',
        data: item
      }

      ACTIONS.updateAccountSettings(item)(dispatch)
      expect(dispatchedAction).toEqual(expectedAction)
    })

    it('should dispatch UPDATE_COMMUNICATION_SETTINGS', () => {
      let item = 2
      let expectedAction = {
        type: 'UPDATE_COMMUNICATION_SETTINGS',
        data: item
      }

      ACTIONS.updateCommunicationSettings(item)(dispatch)
      expect(dispatchedAction).toEqual(expectedAction)
    })

    it('should dispatch UPDATE_SECURITY_SETTINGS', () => {
      let item = 2
      let expectedAction = {
        type: 'UPDATE_SECURITY_SETTINGS',
        data: item
      }

      ACTIONS.updateSecuritySettings(item)(dispatch)
      expect(dispatchedAction).toEqual(expectedAction)
    })
  })

})
