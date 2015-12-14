import React, { Component, PropTypes } from 'react'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import PieChart from '../components/home/PieChart'
import BudgetCategories from '../components/home/BudgetCategories'
import { getInitialState, postBudget } from '../api/apiHandlers'
import { numberValidation, categoryValidation } from '../actions/actions'

class Budget extends Component {
  render() {
    const { actions, homePage, data } = this.props
    return (
      <div>
        <div className = "container">
          <BudgetCategories
            data = { data }
            postBudget={ actions.postBudget }
            numberValidation={ actions.numberValidation }
            categoryValidation={ actions.categoryValidation }
            numberError={ homePage.numberError }
            categoryError={ homePage.categoryError }
            category={ homePage.category } />
          <PieChart data = { data } />
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
