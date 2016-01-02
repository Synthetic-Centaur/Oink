// ## MAP CONTAINER

// Imports Transaction Map component, actions, and react/redux
import React, { Component, PropTypes } from 'react'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import TransactionMap from '../components/dashboard/heatmap/TransactionMap'
import { updateCluster, updateMapDate, updateAddress } from '../actions/actions'
import _ from 'underscore'
import moment from 'moment'

class Map extends Component {

  render() {
    // Receives actions as well as data set by map component on state
    const { actions, data, currentChildren, mapDate, currentAddress } = this.props

    return (
      <TransactionMap
        transactions = {data.transactions}
        categories = {data.categories}
        accessToken = {data.mapbox.accessToken}
        currentChildren = {currentChildren}
        updateCluster = {actions.updateCluster}
        mapDate = {mapDate}
        updateMapDate = {actions.updateMapDate}
        currentAddress = {currentAddress}
        updateAddress = {updateAddress}
      />
    )
  }
}

Map.PropTypes = {
  data: PropTypes.obj,
  actions: PropTypes.obj,
  mapDate: PropTypes.obj,
  currentAddress: PropTypes.string,
  currentChildren: PropTypes.obj
}

// Binds state to properties on container
function mapStateToProps(state) {
  return {
    data: state.asyncStatus.data,
    currentChildren: state.transactionMap.childrenCluster,
    mapDate: state.transactionMap.mapDate,
    currentAddress: state.transactionMap.currentAddress
  }
}

//Binds container actions to dispatch
function mapDispatchToProps(dispatch) {
  return {
    actions: bindActionCreators({
      updateCluster,
      updateMapDate
    }, dispatch)
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Map)
