import React, { Component, PropTypes } from 'react'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import PlaidButton from '../components/plaid/PlaidButton'
import { postPlaid } from '../api/authHandlers'

export class Plaid extends React.Component {
  render() {
    const { actions } = this.props
    return (
      <div className="container">
        <PlaidButton authenticate={actions.postPlaid}/>
      </div>
    );
  }
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
    actions: bindActionCreators({ postPlaid: postPlaid }, dispatch)
  }
}


export default connect(mapStateToProps, mapDispatchToProps)(Plaid)
