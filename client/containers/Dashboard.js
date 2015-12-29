import React, { Component, PropTypes } from 'react'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import ThemeManager from 'material-ui/lib/styles/theme-manager'
import Theme from '../material-theme.js'
import { authRedirect, authLogout, sendPhoneVerification, checkPhoneVerification } from '../actions/api/authActions'
import { getInitialState, postSettings, deleteAccount } from '../actions/api/apiActions'
import { changeView, switchComponent, showSettings, hideSettings, editStart, editFinish,
         updateAccountSettings, updateCommunicationSettings, updateSecuritySettings,
         showPhoneVerify, hidePhoneVerify, editFinishAll } from '../actions/actions'
import SideNav from '../components/dashboard/sidenav/SideNav'
import SettingsModal from '../components/dashboard/settings/SettingsModal'
import PhoneVerifyModal from '../components/dashboard/phoneVerify/PhoneVerifyModal'
import PhoneVerifyIcon from '../components/dashboard/phoneVerify/PhoneVerifyIcon'
import Budget from './Budget'
import Goals from './Goals'
import Options from '../components/dashboard/Options'
import LoadingIndicator from '../components/dashboard/LoadingIndicator'
import ComponentPlayground from './ComponentPlayground'
import { DROPDOWN_ACTIONS } from '../constants/componentActions'
import { FontIcon, FlatButton, RaisedButton } from 'material-ui'

class Dashboard extends React.Component {
  getChildContext() {
    return {
      muiTheme: ThemeManager.getMuiTheme(Theme),
    }
  }

  // This is our delayed call to initial state after transactions are loaded on server side on first pull
  shouldComponentUpdate(nextProps) {
    if (this.props.firstPull !== nextProps.firstPull) {
      this.init()
    }
    
    return true
  }

  //Render home container with chart, budget input, and navbar
  componentWillMount() {
    this.checkAuth()
    document.body.style.backgroundColor = '#262626'
  }

  //Call init when component is mounted only when not first call for an user
  componentDidMount() {
    if (!this.props.firstPull) {
      this.init()
    }
  }

  //Get initial state of app, including all of user's transactions
  init() {
    this.props.actions.getInitialState()
  }

  checkAuth() {
    const { actions, isAuthenticated } = this.props
    if (!isAuthenticated) {
      actions.authRedirect()
    }
  }

  handleNavigation(component) {
    const { actions } = this.props
    actions.switchComponent(component)
  }

  render() {

    const { actions, currentComponent, data, homePage, editingFirstName, editingLastName,
            editingEmail, editingPhoneNumber, editingPassword, editingDeleteAccount,
            accountData, communicationData, securityData, isLoading} = this.props

    const userIsVerified = data.user ? data.user.phone_verified : true

    return (
      <div className="dashboard-el">

        <LoadingIndicator isLoading={isLoading} />
      
        <SideNav
          changeView={ actions.changeView }
          handleNavigation = {this.handleNavigation.bind(this)}
          dropDownComponents = { DROPDOWN_ACTIONS } />

        <div className="dashboard">
            <div className="row">

              <div className="options u-pull-right">
                <Options logout={ actions.authLogout } showSettings={ actions.showSettings }/>
              </div>

              <div className="needsVerify u-pull-left" style={{paddingTop: '20px', paddingLeft: '20px', position: 'relative', zIndex: '4'}}>
                <PhoneVerifyIcon
                  showPhoneVerify={actions.showPhoneVerify}
                  showVerify={homePage.showVerify}
                  userIsVerified={userIsVerified}
                />
              </div>



              <div className="header">
                <div className="container">
                  <div className="row">

                    <h1>{ currentComponent.text }</h1>

                  </div>
                </div>
              </div>
            </div>
        </div>

        <div className="view-container container">
          <ComponentPlayground
            currentComponent = { currentComponent } />
        </div>
        
       <PhoneVerifyModal
        showPhoneVerify={actions.showPhoneVerify}
        hidePhoneVerify={actions.hidePhoneVerify}
        showVerify={homePage.showVerify}
        errorText={homePage.errorText}
        verifySuccess={homePage.verifySuccess}
        isLoading={isLoading}
        sendPhoneVerification={actions.sendPhoneVerification}
        checkPhoneVerification={actions.checkPhoneVerification}
       />

      <SettingsModal
        postSettings={actions.postSettings}
        showSettings={homePage.showSettings}
        showSettingsModal={actions.showSettings}
        hideSettingsModal={actions.hideSettings}
        editStart={actions.editStart}
        editFinish={actions.editFinish}
        data={data}
        editingFirstName={editingFirstName}
        editingLastName={editingLastName}
        editingEmail={editingEmail}
        editingPhoneNumber={editingPhoneNumber}
        editingPassword={editingPassword}
        editingDeleteAccount={editingDeleteAccount}
        accountData={accountData}
        communicationData={communicationData}
        securityData={securityData}
        updateAccountSettings={actions.updateAccountSettings}
        updateCommunicationSettings={actions.updateCommunicationSettings}
        updateSecuritySettings={actions.updateSecuritySettings}
        deleteAccount={actions.deleteAccount}
        editFinishAll={actions.editFinishAll}
      />

      </div>
    )
  }
}

Dashboard.childContextTypes = {
  muiTheme: PropTypes.object
}

function mapStateToProps(state) {
  return {
    firstPull: state.homePage.firstPull,
    isLoading: state.asyncStatus.isLoading,
    data: state.asyncStatus.data,
    error: state.asyncStatus.error,
    homePage: state.homePage,
    isAuthenticated: state.auth.isAuthenticated,
    currentComponent: state.dashboard.currentComponent,
    editingFirstName: state.settings.editingFirstName,
    editingLastName: state.settings.editingLastName,
    editingEmail: state.settings.editingEmail,
    editingPhoneNumber: state.settings.editingPhoneNumber,
    editingPassword: state.settings.editingPassword,
    editingDeleteAccount: state.settings.editingDeleteAccount,
    accountData: state.settings.accountData,
    communicationData: state.settings.communicationData,
    securityData: state.settings.securityData
  }
}

function mapDispatchToProps(dispatch) {
  return {
    actions: bindActionCreators({
      getInitialState,
      authRedirect,
      authLogout,
      showSettings,
      hideSettings,
      changeView,
      switchComponent,
      postSettings,
      deleteAccount,
      editStart,
      editFinish,
      updateAccountSettings,
      updateCommunicationSettings,
      updateSecuritySettings,
      showPhoneVerify,
      hidePhoneVerify,
      sendPhoneVerification,
      checkPhoneVerification,
      editFinishAll
    }, dispatch)
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Dashboard)
