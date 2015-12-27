import React, { Component, PropTypes } from 'react'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import GoogleMap from '../components/dashboard/heatmap/GoogleHeatMap'
import TransactionMap from '../components/dashboard/heatmap/TransactionMap'

class HeatMap extends Component {

  render() {

    const { data } = this.props

    data.transactions.forEach(function(transaction) {
      transaction.date = new Date(transaction.date)
    })

    data.transactions.sort(function(a,b) {
      return a.date - b.date
    })

    return (
      <TransactionMap
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
