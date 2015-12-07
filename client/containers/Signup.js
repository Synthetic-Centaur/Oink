import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import SignupForm from '../components/signup/SignupForm'
import { postSignup } from '../api/authHandlers'
import React, { Component, PropTypes } from 'react'

class Signup extends Component {
  render() {
    const { actions } = this.props
    return (
        <div className="container">
          <SignupForm signup={actions.postSignup} />
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
    actions: bindActionCreators({ postSignup: postSignup }, dispatch)
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Signup)
