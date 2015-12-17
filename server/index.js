//************Entry point********************//

// ES2015 Compiler
require('babel/register')

// Server initialization
require('./server')

// Injecting Middleware
require('./middleware')

// Instantiation of routes
require('./routes/routes')

//Instantiation of cron job
require('./schedule')()
