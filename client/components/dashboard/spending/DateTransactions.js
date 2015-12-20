import React, { Component, PropTypes } from 'react'
import { List, ListItem } from 'material-ui'
import moment from 'moment'

class DateTransactions extends Component {

  render() {
    const { data, selectedDate } = this.props
    let index = 0
    let transactions = data.transactions.map((transaction) => {
      index++
      if (transaction.date === selectedDate) {
        let color = -transaction.amount > 0 ? 'green' : 'red'
        return (
          <tr key={index}>
            <td>{transaction.store_name}</td>
            <td style= {{color: color}}>${-transaction.amount}</td>
          </tr>
        )
      }
    })

    return (
      <div className = 'container'>
        <h5 className= "center">Transactions on {moment(selectedDate).format('dddd, MMMM Do YYYY')}</h5>
        <div className = 'row'>
          <table className = 'twelve columns'>
          <tbody>
            <tr>
                <th>Name</th>
                <th>Amount</th>
            </tr>
            { transactions }
          </tbody>
          </table>
        </div>
      </div>
    )
  }
}

export default DateTransactions