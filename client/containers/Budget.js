// ## Budget View Container

import React, { Component, PropTypes } from 'react'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import ThemeManager from 'material-ui/lib/styles/theme-manager'
import Theme from '../material-theme.js'
import { Paper } from 'material-ui'
import OptionsBar from '../components/dashboard/budget/OptionsBar'
import PieChart from '../components/dashboard/budget/PieChart'
import BarChart from '../components/dashboard/budget/BarChart'
import WelcomeMessage from '../components/dashboard/budget/WelcomeMessage'
import BudgetCategories from '../components/dashboard/budget/BudgetCategories'
import { getInitialState, postBudget, deleteBudget } from '../actions/api/apiActions'
import { numberValidation, categoryValidation, changeSettingsView, changeCurrentBudget } from '../actions/actions'

class Budget extends Component {
  getChildContext() {
    return {
      muiTheme: ThemeManager.getMuiTheme(Theme),
    }
  }

  renderPieChart() {
    const { data } = this.props
    return data.budgets ? (data.budgets.length === 0 ? <WelcomeMessage /> : <PieChart data={data} />) : null
  }

  renderBarChart() {
    const { data } = this.props
    return data.budgets ? (data.budgets.length === 0 ? null : <BarChart data={data} />) : null
  }
  
  render() {
    const { actions, homePage, data, budgetPage } = this.props
    return (
      <div className="budget-page">

        <div className="budget-container">
          <div className="container">

            <div className="row">

              <div className="eight columns">
                
                <div className="row">
                  {this.renderPieChart()}
                </div>
                
                <div className="row">
                  {this.renderBarChart()}
                </div>
              </div>

              <Paper style={{boxShadow:'0 8px 8px #000, 0 3px 3px #000'}} className="options-container four columns">
                <OptionsBar
                  budgetPage={budgetPage}
                  actions={actions}
                  homePage={homePage}
                  data={data}
                />
              </Paper>

            </div>
          </div>
        </div>

      </div>
    )
  }
}

// Specify what props are required by the container
Budget.propTypes = {
  isLoading: PropTypes.bool.isRequired,
  data: PropTypes.object.isRequired,
  error: PropTypes.bool.isRequired,
  homePage: PropTypes.object.isRequired,
  budgetPage: PropTypes.object.isRequired
}

// Required for passing down Material UI Theme to children components
Budget.childContextTypes = {
  muiTheme: PropTypes.object
}

// Specify which pieces of state should be available as props
function mapStateToProps(state) {
  return {
    isLoading: state.asyncStatus.isLoading,
    data: state.asyncStatus.data,
    error: state.asyncStatus.error,
    homePage: state.homePage,
    budgetPage: state.budgetPage
  }
}

// Bind Redux store's dispatch to container actions and make available as props
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
