import React, { Component, PropTypes } from 'react'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import GoogleMap from '../components/dashboard/heatmap/GoogleHeatMap'


class HeatMap extends Component {

  render() {

    const { data } = this.props
    return (
      <GoogleMap 
        transactions = { data.transactions } />
    )
  }
}

function mapStateToProps(state) {
  return {
    isLoading: state.asyncStatus.isLoading,
    data: state.asyncStatus.data,
    error: state.asyncStatus.error,
    homePage: state.homePage,
    budgetPage: state.budgetPage
  }
}

export default connect(mapStateToProps)(HeatMap)