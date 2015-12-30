import React, { Component, PropTypes } from 'react'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import ThemeManager from 'material-ui/lib/styles/theme-manager'
import Theme from '../material-theme.js'
import MessageCenter from '../components/dashboard/goals/MessageCenter'
import GoalChart from '../components/dashboard/goals/GoalChart'
import GoalConfigurer from '../components/dashboard/goals/GoalConfigurer'
import GoalList from '../components/dashboard/goals/GoalList'
import { Paper } from 'material-ui'
import { postGoal, updateGoal, deleteGoal } from '../actions/api/apiActions'
import { switchGoal, validateGoal, selectAvg, changeGoalView } from '../actions/actions'

class Goals extends Component {
  getChildContext() {
    return {
      muiTheme: ThemeManager.getMuiTheme(Theme),
    }
  }
  
  render() {
    const { actions, goalPage, data } = this.props
    if (data) {
      return (
        <div>
          <div className = "container goals">
            <br />
            <div className = "row">
              <div className="eight columns">
                  <MessageCenter
                    data = {data}
                    selectedGoal = {goalPage.selectedGoal}
                    selectAvg = {actions.selectAvg}
                    goalPage = {goalPage}
                    selectedAvg = {goalPage.selectedAvg}
                  />
                  { data.goals && data.goals.length > 0 ? 
                    <GoalChart
                      data = {data}
                      goalPage = {goalPage}
                      goalView = {goalPage.goalView}
                      selectedAvg = {goalPage.selectedAvg}
                    /> : <div /> 
                  }
              </div>
              <br />
              <Paper zDepth={1} rounded={false} className="four columns">
                <GoalList
                  data = {data}
                  goalPage = {goalPage}
                  selectedGoal = {goalPage.selectedGoal}
                  switchGoal = {actions.switchGoal}
                  deleteGoal = {actions.deleteGoal}
                  updateGoal = {actions.updateGoal}
                />
                <hr />
                <GoalConfigurer
                  data = {data}
                  actions = {actions}
                  goalPage = {goalPage}
                />
              </Paper>
            </div>
          </div>
        </div>
       )
    } else {
      return <div />
    }
  }
}

Goals.PropTypes = {
  data: PropTypes.object.isRequired,
  goalPage: PropTypes.object.isRequired
}

Goals.childContextTypes = {
  muiTheme: PropTypes.object
}

Goals.childContextTypes = {
  muiTheme: PropTypes.object
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
      switchGoal,
      validateGoal,
      selectAvg,
      deleteGoal,
      updateGoal,
      changeGoalView
    }, dispatch)
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Goals)
