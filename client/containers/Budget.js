import React, { Component, PropTypes } from 'react'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import ThemeManager from 'material-ui/lib/styles/theme-manager'
import Theme from '../material-theme.js'
import OptionsBar from '../components/dashboard/budget/OptionsBar'
import PieChart from '../components/dashboard/budget/PieChart'
import BarChart from '../components/dashboard/budget/BarChart'
import BudgetCategories from '../components/dashboard/budget/BudgetCategories'
import { getInitialState, postBudget, deleteBudget } from '../actions/api/apiActions'
import { numberValidation, categoryValidation, changeSettingsView, changeCurrentBudget } from '../actions/actions'

class Budget extends Component {
  getChildContext() {
    return {
      muiTheme: ThemeManager.getMuiTheme(Theme),
    }
  }
  
  render() {
    const { actions, homePage, data, budgetPage } = this.props
    return (
      <div className="budget-page">

        <div className="budget-container">
          <div className="container">

            <div className="row">
              <div className="eight columns">
                <PieChart data = { data } />
              </div>

              <div className="options-container four columns u-pull-right">
                <OptionsBar
                  budgetPage = { budgetPage }
                  actions = { actions }
                  homePage = { homePage }
                  data = { data }
                />
              </div>

            </div>
          </div>
        </div>


        <div className="actuals-container">
          <div className="container">
            <div className="row">
              <div className="u-full-width">
                <BarChart data = { data }/>
              </div>
            </div>
          </div>
        </div>

      </div>
    )
  }

}

Budget.PropTypes = {
  
}

Budget.childContextTypes = {
  muiTheme: PropTypes.object
}

//Unpack state onto container props
function mapStateToProps(state) {
  return {
    isLoading: state.asyncStatus.isLoading,
    data: state.asyncStatus.data,
    error: state.asyncStatus.error,
    homePage: state.homePage,
    budgetPage: state.budgetPage
  }
}

//Bind container actions to dispatch
function mapDispatchToProps(dispatch) {
  return {
    actions: bindActionCreators({
      postBudget,
      deleteBudget,
      numberValidation,
      categoryValidation,
      changeSettingsView,
      changeCurrentBudget
    }, dispatch)
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Budget)
