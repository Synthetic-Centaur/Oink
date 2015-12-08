import app from '../server'
import path from 'path'

import authHandler from '../handlers/authHandler'
import apiHandler from '../handlers/apiHandler'
import passport from 'passport'

app.post('/auth/login', authHandler.login)

app.get('/auth/logout', authHandler.logout)

app.post('/auth/signup', authHandler.signup)

app.get('/auth/authenticate', authHandler.authenticate)

app.post('/auth/plaid', authHandler.plaid)

app.get('/api/intitialState', apiHandler.intitialState)

app.post('/api/budget/category/:id', apiHandler.budget)

app.get('/message', apiHandler.message)
