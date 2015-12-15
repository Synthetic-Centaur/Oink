import React, { Component, PropTypes } from 'react'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import PlaidButton from '../components/plaid/PlaidButton'
import { postPlaid, getPlaid } from '../actions/api/authActions'

export class Plaid extends React.Component {
  render() {
    const { actions, publicKey } = this.props

    return (
      <div className="container">
        <PlaidButton
          authenticate={actions.postPlaid}
          getKey={actions.getPlaid}
          publicKey={publicKey}
        />
      </div>
    )
  }
}

function mapStateToProps(state) {
  return {
    isLoading: state.isLoading,
    data: state.data,
    error: state.error,
    publicKey: state.plaid.publicKey
  }
}

function mapDispatchToProps(dispatch) {
  return {
    actions: bindActionCreators({ postPlaid: postPlaid, getPlaid: getPlaid }, dispatch)
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Plaid)
