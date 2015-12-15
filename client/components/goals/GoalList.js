import React, { Component, PropTypes } from 'react'
import { List, ListDivider, ListItem, IconMenu, MenuItem } from 'material-ui'
import { SelectableContainerEnhance } from 'material-ui/lib/hoc/selectable-enhance'
var SelectableList = SelectableContainerEnhance(List)

class GoalList extends Component {
  selectGoal(e, index) {
    this.props.switchGoal(index) 
  }

  render() {
    let selectedGoal = this.props.selectedGoal
    const { data } = this.props
    let index = 0
    let goalList = data.goals.map((goal) => {
      console.log(index)
      return <ListItem primaryText = {goal.description} value = { index++ }/>
    })
    return (
      <SelectableList valueLink = {{value: this.props.selectedGoal, requestChange: this.selectGoal.bind(this)}}
        subheader="Select from your goals">
        {goalList}
      </SelectableList>
    )
  }
}

export default GoalList