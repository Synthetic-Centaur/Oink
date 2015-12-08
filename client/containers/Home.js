import React, { Component, PropTypes } from 'react';
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import PieChart from '../components/home/PieChart'
import BudgetCategories from '../components/home/BudgetCategories'
import { getInitialState, postBudget } from '../api/apiHandlers'
import { numberValidation, categoryValidation } from '../actions/actions'

class Home extends Component {
  init() {
    // this.props.actions.getInitialState();
  }

  render() {
    const { actions, formPage } = this.props
    return (
      <div className="container">
        <BudgetCategories 
          postBudget={ actions.postBudget }
          numberValidation={ actions.numberValidation } 
          categoryValidation={ actions.categoryValidation }
          numberError={ formPage.numberError }
          categoryError={ formPage.categoryError }
          category={ formPage.category }  />
        <PieChart budgetData={ data }/>
      </div>
    )
  }

  componentDidMount() {
    this.init();
  }
}

Home.PropTypes = {

}

function mapStateToProps(state) {
  return {
    isLoading: state.isLoading,
    data: state.data,
    error: state.error,
    formPage: state.formPage
  }
}

function mapDispatchToProps(dispatch) {
  return {
    actions: bindActionCreators({ 
      getInitialState, 
      postBudget,
      numberValidation,
      categoryValidation
    }, dispatch)
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Home)