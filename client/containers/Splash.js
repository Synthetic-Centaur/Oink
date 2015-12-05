import React, { Component, PropTypes } from 'react'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import Login from '../components/login/login'
import { postLogin } from '../actions/actions'

class Splash extends Component {
  render() {
    const { actions } = this.props
    return (
        <div>
          <Login login={actions.postLogin} />
        </div>
      );
  }
}

Splash.propTypes = {
  actions: PropTypes.object.isRequired
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
    actions: bindActionCreators({ postLogin: postLogin }, dispatch)
  }
}



export default connect(mapStateToProps, mapDispatchToProps)(Splash)
