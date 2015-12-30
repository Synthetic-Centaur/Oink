import React, { Component, PropTypes } from 'react'
import { Slider } from 'material-ui'
import moment from 'moment'
import ReactDOM from 'react-dom'

class MessageCenter extends Component {

  handleAvg(e) {

    // establishes range from 0 to 1000, adjust values here to modify range
    this.props.selectAvg(this.refs.average.getValue() * 1000)
  }

  render() {
    const { data } = this.props

    // default message on view load without any goals
    let message = 'Welcome to Oink! I see that you don\'t currently have a goal.  Please create a goal on the right.'
    if (data.goals && this.props.selectedGoal) {
      if (data.goals[this.props.selectedGoal - 1] !== undefined) {
        let goal = data.goals[this.props.selectedGoal - 1]
        message = 'You are saving for ' + goal.description + ', and you need to save $' + goal.amount + ' to achieve this.'
      }
    }

    let curAvg = curAvg || 0
    return (
      <div>
        <h5> {message} </h5>
        <table style={{
          margin: '0 auto',
          padding: '5px'
        }}>
          <tbody>
            <tr>
              <th>Average Savings per Month:</th>
            </tr>
            <tr>
              <td>Last Month: </td>
              <td style={{ color: -data.avgNet.lastMonth > 0 ? '#B4CCB9' : '#FF8A80', textAlign: 'right' }}>${-data.avgNet.lastMonth.toFixed(2)}</td>
            </tr>
            <tr>
              <td>Over Last 3 Months: </td>
              <td style={{ color: -data.avgNet.lastThree > 0 ? '#B4CCB9' : '#FF8A80', textAlign: 'right' }}>${-data.avgNet.lastThree.toFixed(2)}</td>
            </tr>
            <tr>
              <td>Over Last 6 Months: </td>
              <td style={{ color: -data.avgNet.lastSix > 0 ? '#B4CCB9' : '#FF8A80', textAlign: 'right' }}>${-data.avgNet.lastSix.toFixed(2)}</td>
            </tr>
            <tr>
              <td>Over the Last Year: </td>
              <td style={{
                color: -data.avgNet.lastYear > 0 ? '#B4CCB9' : '#FF8A80',
                textAlign: 'right'
              }}>${-data.avgNet.lastYear.toFixed(2)}</td>
            </tr>
          </tbody>
        </table>
        <br />
        {data.goals.length > 0 ?
          <Slider
            description={'Adjust your savings below to see the impact!  Current average is $' + this.props.selectedAvg + ' a month saved.'}
            name="average"
            ref="average"
            defaultValue={(curAvg / 1000)}
            onChange={this.handleAvg.bind(this)}
          /> : <br />
        }
        
      </div>
    )
  }
}

export default MessageCenter
