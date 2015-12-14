import React, { Component, PropTypes } from 'react'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import { authRedirect, authLogout } from '../api/authHandlers'
import { getInitialState } from '../api/apiHandlers'
import { changeView, switchComponent } from '../actions/actions'
import SideNav from '../components/sidenav/sidenav'
import Budget from './Budget'
import Settings from '../components/dashboard/Settings'
import ComponentPlayground from './ComponentPlayground'
import { DROPDOWN_ACTIONS } from '../constants/componentActions'

class Dashboard extends React.Component {
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
    const { actions, currentView, data, homePage } = this.props
    return (
      <div>
      
        <SideNav 
          changeView={ actions.changeView }
          handleNavigation = {this.handleNavigation.bind(this)}
          dropDownComponents = { DROPDOWN_ACTIONS } />

        <div className="dashboard">
      
          <div className="settings u-pull-right">
            <Settings logout={ actions.authLogout }/>
          </div>

          <div className="header">
            <div className="container">
              <div className="row">

                <h1>{ homePage.currentComponent.text }</h1>

              </div>
            </div>
          </div>


          <div className="view-container container">
            <ComponentPlayground 
              data= { data }
              homePage = { homePage }
              actions= { actions }
              currentComponent = { homePage.currentComponent } />
          
          </div>

        </div>

      </div>
    )
  }
}

function mapStateToProps(state) {
  return {
    isLoading: state.asyncStatus.isLoading,
    data: state.asyncStatus.data,
    error: state.asyncStatus.error,
    homePage: state.homePage,
    isAuthenticated: state.auth.isAuthenticated
    // currentView: state.dashboard.currentView
  }
}

function mapDispatchToProps(dispatch) {
  return {
    actions: bindActionCreators({
      getInitialState,
      authRedirect,
      authLogout,
      changeView,
      switchComponent
    }, dispatch)
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Dashboard)
