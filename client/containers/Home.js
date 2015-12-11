import React, { Component, PropTypes } from 'react';
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import { authRedirect, authLogout } from '../api/authHandlers'
import PieChart from '../components/home/PieChart'
import BudgetCategories from '../components/home/BudgetCategories'
import NavBar from '../components/home/homeNavBar'
import { getInitialState, postBudget } from '../api/apiHandlers'
import { numberValidation, categoryValidation } from '../actions/actions'

class Home extends Component {
  //Get initial state of app, including all of user's transactions
  init() {
     this.props.actions.getInitialState();
  }

  //Render home container with chart, budget input, and navbar
  componentWillMount() {
    this.checkAuth()
  }
  checkAuth() {
    const { actions, isAuthenticated } = this.props
    if (!isAuthenticated) {
      actions.authRedirect()
    }
  }
  renderContent() {
    const { actions, homePage, data } = this.props
    return (
      <div className = "container">
        <NavBar logout = { actions.authLogout } />
        <BudgetCategories
          data = { data.categories }
          postBudget={ actions.postBudget }
          numberValidation={ actions.numberValidation } 
          categoryValidation={ actions.categoryValidation }
          numberError={ homePage.numberError }
          categoryError={ homePage.categoryError }
          category={ homePage.category } />
        <PieChart 
          data = { data.budgets } />
      </div>
      )
  }
  render() {
    const { isAuthenticated, data } = this.props
    return (
      <div>
        { isAuthenticated ? this.renderContent() : null }
      </div>
    )
  }

  //Call init when component is mounted
  componentDidMount() {
    this.init()
  }
}

Home.PropTypes = {

}

//Unpack state onto container props
function mapStateToProps(state) {
  return {
    isLoading: state.isLoading,
    data: state.asyncStatus.data,
    error: state.asyncStatus.error,
    homePage: state.homePage,
    isAuthenticated: state.auth.isAuthenticated
  }
}

//Bind container actions to dispatch
function mapDispatchToProps(dispatch) {
  return {
    actions: bindActionCreators({ 
      getInitialState,
      postBudget,
      numberValidation,
      categoryValidation,
      authRedirect,
      authLogout
    }, dispatch)
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Home)
