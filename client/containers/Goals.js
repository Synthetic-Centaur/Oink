import React, { Component, PropTypes } from 'react'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'

class Goals extends Component {
  render() {
    const { actions, homePage, data } = this.props
    return (
      <div>
        <h5>Hello World</h5>
      </div>
     )
  }
}

Goals.PropTypes = {

}

//Unpack state onto container props
function mapStateToProps(state) {
  return {
    isLoading: state.asyncStatus.isLoading,
    data: state.asyncStatus.data,
    error: state.asyncStatus.error,
    homePage: state.homePage,
  }
}

//Bind container actions to dispatch
function mapDispatchToProps(dispatch) {
  return {
    actions: bindActionCreators({

    }, dispatch)
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Goals)