import React, { Component, PropTypes } from 'react';
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import PieChart from '../components/home/pieChart'

class Home extends Component {
  render() {
    return (
      <div>
        <PieChart />
      </div>
    )
  }
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
    
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Home)