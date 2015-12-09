import React, { Component, PropTypes } from 'react';
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import PieChart from '../components/home/PieChart'
import BudgetCategories from '../components/home/BudgetCategories'
import NavBar from '../components/home/homeNavBar'
import { getInitialState, postBudget } from '../api/apiHandlers'
import { numberValidation, categoryValidation } from '../actions/actions'

class Home extends Component {
  //Get initial state of app, including all of user's transactions
  // init() {
  //   // this.props.actions.getInitialState();
  // }

  //Render home container with chart, budget input, and navbar
  render() {
    const { actions, homePage } = this.props
    return (
      <div className="container">
        <NavBar />
        <BudgetCategories 
          postBudget={ actions.postBudget }
          numberValidation={ actions.numberValidation } 
          categoryValidation={ actions.categoryValidation }
          numberError={ homePage.numberError }
          categoryError={ homePage.categoryError }
          category={ homePage.category }  />
        <PieChart />
      </div>
    )
  }

  //Call init when component is mounted
  // componentDidMount() {
  //   this.init();
  // }
}

Home.PropTypes = {

}

//Unpack state onto container props
function mapStateToProps(state) {
  return {
    isLoading: state.isLoading,
    data: state.data,
    error: state.error,
    homePage: state.homePage
  }
}

//Bind container actions to dispatch
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