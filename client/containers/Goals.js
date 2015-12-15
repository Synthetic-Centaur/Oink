import React, { Component, PropTypes } from 'react'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import MessageCenter from '../components/goals/MessageCenter'
import GoalChart from '../components/goals/GoalChart'
import GoalConfigurer from '../components/goals/GoalConfigurer'
import GoalList from '../components/goals/GoalList'
import { Paper } from 'material-ui'
import { postGoal } from '../api/apiHandlers'
import { switchGoal } from '../actions/actions'

class Goals extends Component {
  render() {
    const { actions, goalPage, data } = this.props
    return (
      <div>
        <div className = "container">
          <div className = "row">
            <div className="eight columns">
                <MessageCenter data = { data } 
                selectedGoal = { goalPage.selectedGoal }/>
                <GoalChart data = { data }
                selectedGoal = { goalPage.selectedGoal } />
            </div>
            <Paper zDepth={1} rounded={false} className="four columns">
              <GoalList
                data = { data }
                selectedGoal = { goalPage.selectedGoal }
                switchGoal = { actions.switchGoal }
               />
              <hr/>
              <GoalConfigurer
                data = { data }
                postGoal={ actions.postGoal }
                />
            </Paper>
          </div>
        </div>
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
    goalPage: state.goalPage,
  }
}

//Bind container actions to dispatch
function mapDispatchToProps(dispatch) {
  return {
    actions: bindActionCreators({
      postGoal,
      switchGoal
    }, dispatch)
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Goals)