import app from '../server'
import User from '../db/models/user'
import Users from '../db/collections/users'


// app.post('/auth/login', authHandler.login)

// app.get('/auth/logout', authHandler.logout)

// app.post('/auth/signup', authHandler.signup)

// app.get('/auth/authenticate', authHandler.authenticate)

// app.get('/api/intitialState', apiHandler.intitialState)

// app.post('/api/budget/category/:id', apiHandler.budget)

// app.get('/test', (req, res) => {
//   const user = new User({first_name: 'Lucilla', last_name: 'chalmer', phone_number: 7344749351, uuid: '123ABC'})
//   Users.create(user).then(() => {
//     console.log('user has been created!!! YAY!!!')
//     res.send('Cool story bro')
//   })
// })