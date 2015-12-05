import db from '../dbConfig'
import User from '../models/user'

let Users = new db.Collection()

Users.model = User

export default Users