import db from '../dbConfig'
import Budget from '../models/budget'

let Budgets = new db.Collection()

Budgets.model = Budget

export default Budgets