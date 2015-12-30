import React, { Component, PropTypes } from 'react'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import TransactionMap from '../components/dashboard/heatmap/TransactionMap'
import { updateCluster, updateMapDate, updateAddress } from '../actions/actions'

class HeatMap extends Component {

  render() {

    const { actions, data, currentChildren, mapDate, currentAddress } = this.props

    data.transactions.forEach((transaction) => {
      transaction.date = new Date(transaction.date)
    })

    data.transactions.sort((a, b) => {
      return a.date - b.date
    })

    return (
      <TransactionMap
        transactions = { data.transactions }
        categories = { data.categories }
        accessToken = { data.mapbox.accessToken }
        currentChildren = { currentChildren }
        updateCluster = { actions.updateCluster }
        mapDate = { mapDate }
        updateMapDate = { actions.updateMapDate }
        currentAddress = { currentAddress }
        updateAddress = { updateAddress } />
    )
  }
}

function mapStateToProps(state) {
  return {
    data: state.asyncStatus.data,
    currentChildren: state.transactionMap.childrenCluster,
    mapDate: state.transactionMap.mapDate,
    currentAddress: state.transactionMap.currentAddress
  }
}

//Bind container actions to dispatch
function mapDispatchToProps(dispatch) {
  return {
    actions: bindActionCreators({
      updateCluster,
      updateMapDate
    }, dispatch)
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(HeatMap)
