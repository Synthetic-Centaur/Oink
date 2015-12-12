import app from '../server'

import authHandler from '../handlers/authHandler'
import apiHandler from '../handlers/apiHandler'


app.post('/auth/login', authHandler.login)

app.post('/auth/signup', authHandler.signup)

app.post('/auth/plaid', authHandler.plaid)

app.get('/auth/plaid', authHandler.isLoggedIn, authHandler.getPlaid)

app.get('/api/initialState', apiHandler.initialState)

app.post('/api/budget/category/:id', apiHandler.budget)

app.post('/api/goals', apiHandler.goals)