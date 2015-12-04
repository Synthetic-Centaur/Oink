import app from '../server'


app.post('/auth/login', authHandler.login)

app.get('/auth/logout', authHandler.logout)

app.post('/auth/signup', authHandler.signup)

app.get('/auth/authenticate', authHandler.authenticate)

app.get('/api/intitialState', apiHandler.intitialState)

app.post('/api/budget/category/:id', apiHandler.budget)
