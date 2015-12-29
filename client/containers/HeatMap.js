import React, { Component, PropTypes } from 'react'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import GoogleMap from '../components/dashboard/heatmap/GoogleHeatMap'
import TransactionMap from '../components/dashboard/heatmap/TransactionMap'
import { updateChildren } from '../actions/actions'

class HeatMap extends Component {

  render() {

    const { actions, data, currentChildren } = this.props

    data.transactions.forEach(function(transaction) {
      transaction.date = new Date(transaction.date)
    })

    data.transactions.sort(function(a,b) {
      return a.date - b.date
    })

    return (
      <TransactionMap
        transactions = { data.transactions } 
        categories = { data.categories } 
        updateChildren = { actions.updateChildren }
        currentChildren = { currentChildren } />
    )
  }
}

function mapStateToProps(state) {
  return {
    data: state.asyncStatus.data,
    currentChildren: state.transactionMap.childrenCluster
  }
}

//Bind container actions to dispatch
function mapDispatchToProps(dispatch) {
  return {
    actions: bindActionCreators({
      updateChildren
    }, dispatch)
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(HeatMap)
