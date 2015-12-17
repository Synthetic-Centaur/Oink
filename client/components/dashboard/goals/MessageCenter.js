import React, { Component, PropTypes } from 'react'
import { Slider } from 'material-ui'
import moment from 'moment'
import ReactDOM from 'react-dom'

class MessageCenter extends Component {

  handleAvg(e) {
    this.props.selectAvg(this.refs.average.getValue() * 1000)
  }

  render() {
    const { data } = this.props
    let message = 'Welcome to Oink! I see that you don\'t currently have a goal.  Please create a goal on the right.'
    if (data.goals[this.props.selectedGoal - 1] !== undefined) {
      let goal = data.goals[this.props.selectedGoal - 1]
      let start = moment(goal.goalStarted)
      let avg = Math.min(data.avgNet.lastMonth, data.avgNet.lastThree, data.avgNet.lastSix, data.avgNet.lastYear)
      
      let end = moment(goal.goalStarted).add((goal.amount / (-avg / 30)), 'days')
      message = 'You are saving for ' + goal.description + ', and you need to save $' + goal.amount + ' to achieve this.'
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
              <th style={{ align: 'center'}}>Average Savings per Month:</th>
            </tr>
            <tr>
              <td>Last Month: </td>
              <td style={{ color: -data.avgNet.lastMonth > 0 ? 'green' : 'red', textAlign: 'right' }}>{-data.avgNet.lastMonth.toFixed(2)}</td>
            </tr>
            <tr>
              <td>Over Last 3 Months: </td>
              <td style={{ color: -data.avgNet.lastThree > 0 ? 'green' : 'red', textAlign: 'right' }}>{-data.avgNet.lastThree.toFixed(2)}</td>
            </tr>
            <tr>
              <td>Over Last 6 Months: </td>
              <td style={{ color: -data.avgNet.lastSix > 0 ? 'green' : 'red', textAlign: 'right' }}>{-data.avgNet.lastSix.toFixed(2)}</td>
            </tr>
            <tr>
              <td>Over the Last Year: </td>
              <td style={{
                color: -data.avgNet.lastYear > 0 ? 'green' : 'red',
                textAlign: 'right'
              }}>{-data.avgNet.lastYear.toFixed(2)}</td>
            </tr>
          </tbody>
        </table>
        <br/>
        {data.goals.length > 0 ? <Slider description= {'Adjust your savings below to see the impact!  Current average is $' + this.props.selectedAvg + ' a month saved.'} name="average" ref="average" defaultValue={0} onChange={this.handleAvg.bind(this)}/> : <br/>}
        
      </div>
    )
  }
}

export default MessageCenter