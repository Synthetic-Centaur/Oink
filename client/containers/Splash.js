import React, { Component, PropTypes } from 'react'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import Login from '../components/login/login'
import { postLogin } from '../actions/actions'

class Splash extends Component {
  render() {
    return (
        <div>
          <Login login={postLogin} />
        </div>
      );
  }
}

function mapStateToProps(state) {
  return {
    
  }
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators({
    postLogin: postLogin
  }, dispatch)
}



export default connect(mapStateToProps, mapDispatchToProps)(Splash)
