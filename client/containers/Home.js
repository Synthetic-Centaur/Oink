import React, { Component, PropTypes } from 'react';
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import PieChart from '../components/home/PieChart'
import BudgetCategories from '../components/home/BudgetCategories'
import { getInitialState, postBudget } from '../api/apiHandlers'

class Home extends Component {
  // init() {
  //   this.props.getInitialState();
  // }

  render() {
    const { actions } = this.props
    return (
      <div className="container">
        <BudgetCategories postBudget={ actions.postBudget }/>
        <PieChart />
      </div>
    )
  }

  // componentDidMount() {
  //   this.init();
  // }
}

Home.PropTypes = {

}

function mapStateToProps(state) {
  return {
    isLoading: state.isLoading,
    data: state.data,
    error: state.error
  }
}

function mapDispatchToProps(dispatch) {
  return {
    actions: bindActionCreators({ getInitialState: getInitialState, postBudget, postBudget }, dispatch)
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Home)