import React, { Component, PropTypes } from 'react'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import ThemeManager from 'material-ui/lib/styles/theme-manager'
import Theme from '../material-theme.js'
import SpendingChart from '../components/dashboard/spending/SpendingChart.js'

class Spending extends Component {

  render() {
    const { actions, data } = this.props
    return (
      <div className = 'container'>
        <SpendingChart
            data= { data } />
      </div>
    )
  }
}

Spending.propTypes = {

}

//Unpack state onto container props
function mapStateToProps(state) {
  return {
    isLoading: state.asyncStatus.isLoading,
    data: state.asyncStatus.data,
    error: state.asyncStatus.error,
  }
}

//Bind container actions to dispatch
function mapDispatchToProps(dispatch) {
  return {
    actions: bindActionCreators({
    }, dispatch)
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Spending)