import db from '../dbConfig'
import Transaction from '../models/transaction'

let Transactions = new db.Collection()

Transactions.model = Transaction

export default Transactions