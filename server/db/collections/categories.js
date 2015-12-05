import db from '../dbConfig'
import Category from '../models/category'

let Categories = new db.Collection()

Categories.model = Category

export default Categories