import React, { Component, PropTypes } from 'react'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import ThemeManager from 'material-ui/lib/styles/theme-manager'
import Theme from '../material-theme.js'
import { authRedirect, authLogout } from '../actions/api/authActions'
import { getInitialState } from '../actions/api/apiActions'
import { changeView, switchComponent, showSettings, hideSettings, editFirstName,
         editLastName, editPhoneNumber, editEmail } from '../actions/actions'
import SideNav from '../components/dashboard/sidenav/SideNav'
// TODO: either move settings modal onto settings and link to settings or delete settings container
import Settings from './Settings'
import SettingsModal from '../components/dashboard/settings/SettingsModal'
import Budget from './Budget'
import Goals from './Goals'
import Options from '../components/dashboard/Options'
import ComponentPlayground from './ComponentPlayground'
import { DROPDOWN_ACTIONS } from '../constants/componentActions'

class Dashboard extends React.Component {
  getChildContext() {
    return {
      muiTheme: ThemeManager.getMuiTheme(Theme),
    }
  }

  //Render home container with chart, budget input, and navbar
  componentWillMount() {
    this.checkAuth()
  }

  //Call init when component is mounted
  componentDidMount() {
    this.init()
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
    const { actions, currentComponent, data, homePage, editingFirstName, editingLastName, editingPhoneNumber, editingEmail } = this.props
    return (
      <div className="dashboard-el">
      
        <SideNav
          changeView={ actions.changeView }
          handleNavigation = {this.handleNavigation.bind(this)}
          dropDownComponents = { DROPDOWN_ACTIONS } />

        <div className="dashboard">
      
          <div className="options u-pull-right">
            <Options logout={ actions.authLogout } showSettings={ actions.showSettings }/>
          </div>

          <SettingsModal
            settings={actions.postSignup}
            showSettings={homePage.showSettings}
            showSettingsModal={actions.showSettings}
            hideSettingsModal={actions.hideSettings}
            editFirstName={actions.editFirstName}
            editLastName={actions.editLastName}
            editPhoneNumber={actions.editPhoneNumber}
            editEmail={actions.editEmail}
            data={data}
            editingFirstName={editingFirstName}
            editLastName={editingLastName}
            editingPhoneNumber={editingPhoneNumber}
            editingEmail={editingEmail}
          />

          <div className="header">
            <div className="container">
              <div className="row">

                <h1>{ currentComponent.text }</h1>

              </div>
            </div>
          </div>

          <div className="view-container container">
            <ComponentPlayground
              currentComponent = { currentComponent } />
          </div>

        </div>

      </div>
    )
  }
}

Dashboard.childContextTypes = {
  muiTheme: PropTypes.object
}

function mapStateToProps(state) {
  return {
    isLoading: state.asyncStatus.isLoading,
    data: state.asyncStatus.data,
    error: state.asyncStatus.error,
    homePage: state.homePage,
    isAuthenticated: state.auth.isAuthenticated,
    currentComponent: state.dashboard.currentComponent,
    editingFirstName: state.settings.editingFirstName,
    editingLastName: state.settings.editingLastName,
    editingPhoneNumber: state.settings.editingPhoneNumber,
    editingEmail: state.settings.editingEmail
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
      editFirstName,
      editLastName,
      editPhoneNumber,
      editEmail
    }, dispatch)
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Dashboard)
