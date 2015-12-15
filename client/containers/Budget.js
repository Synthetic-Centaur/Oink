import React, { Component, PropTypes } from 'react'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import OptionsBar from '../components/home/OptionsBar'
import PieChart from '../components/home/PieChart'
import BarChart from '../components/home/BarChart'
import BudgetCategories from '../components/home/BudgetCategories'
import { getInitialState, postBudget } from '../api/apiHandlers'
>>>>>>> Working on budget view
import { numberValidation, categoryValidation } from '../actions/actions'
import Paper from 'material-ui/lib/paper'

class Budget extends Component {
  
  render() {
    const { actions, homePage, data } = this.props
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

//Unpack state onto container props
function mapStateToProps(state) {
  return {
    isLoading: state.asyncStatus.isLoading,
    data: state.asyncStatus.data,
    error: state.asyncStatus.error,
    homePage: state.homePage,
  }
}

//Bind container actions to dispatch
function mapDispatchToProps(dispatch) {
  return {
    actions: bindActionCreators({
      postBudget,
      numberValidation,
      categoryValidation
    }, dispatch)
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Budget)
