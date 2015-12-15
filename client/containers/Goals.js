import React, { Component, PropTypes } from 'react'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import MessageCenter from '../components/goals/MessageCenter'
import GoalChart from '../components/goals/GoalChart'
import GoalConfigurer from '../components/goals/GoalConfigurer'
import GoalList from '../components/goals/GoalList'
import { Paper } from 'material-ui'

class Goals extends Component {
  render() {
    const { actions, homePage, data } = this.props
    return (
      <div>
        <div className = "container">
            <MessageCenter data = { data } />
            <GoalChart data = { data } />
        </div>
        <Paper zDepth={1} rounded={false} className="u-pull-right">
          <GoalList data = { data } />
          <hr/>
          <GoalConfigurer
            data = { data }
            postGoal = { actions.postGoal }
            updateGoal = { actions.updateGoal } />
        </Paper>
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