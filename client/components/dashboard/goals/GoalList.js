import React, { Component, PropTypes } from 'react'
import { List, ListDivider, ListItem, IconMenu, MenuItem, IconButton } from 'material-ui'
import { SelectableContainerEnhance } from 'material-ui/lib/hoc/selectable-enhance'
import MoreVertIcon from 'material-ui/lib/svg-icons/navigation/more-vert'

var SelectableList = SelectableContainerEnhance(List)

class GoalList extends Component {
  handleEdit(e) {

  }

  selectGoal(e, index) {
    e.preventDefault()
    this.props.switchGoal(index)
  }

  render() {
    let selectedGoal = this.props.selectedGoal
    const { data } = this.props
    let index = 0
    let goalList = data.goals.map((goal) => {
      index++
      return <ListItem key={ index } primaryText = { goal.description } value = { index } rightIconButton={<i className='material-icons'
        onTouchTap={this.handleEdit.bind(this)}>mode_edit</i>}/>
    })
    return (
      <SelectableList valueLink = {{value: this.props.selectedGoal, requestChange: this.selectGoal.bind(this)}}
        subheader="Select from your goals" subheaderStyle={{color: '#ccc'}}>
        { goalList }
      </SelectableList>
    )
  }
}

export default GoalList