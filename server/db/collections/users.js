import db from '../dbConfig'
import User from '../models/user'

export let Users = new db.Collection()

Users.model = User;