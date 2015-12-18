import moment from 'moment'
import db from '../db/dbConfig'

let transactionController = {
  getTransactionsByTime(userId, month, year) {
    let start = moment().subtract(4, 'years')
    let end = moment()

    if (month === 'now') {
      start = moment().startOf('month')
    } else if (month && year) {

      // using moment validation to check if input is valid
      if (moment(month, 'MMMM').isValid() && moment(year, 'YYYY').isValid()) {
      
        // moment requires format to be established so it can convert properly
        start = moment(month + year, 'MMMM YYYY').startOf('month')
        end = moment(month + year, 'MMMM YYYY').endOf('month')
      } else {
        start = null
        end = null
      }
    }

    return db.knex('transactions').where({user_id: userId}).then((transactions) => {
      let result = []
      transactions.forEach((transaction) => {
        if (transaction.date >= start && transaction.date <= end) {
          result.push(transaction)
        }
      })
      return result
    })
  }
}

export default transactionController