import path from 'path'
import Express from 'express'
import morgan from 'morgan'


import bodyParser from 'body-parser'

//Webpack dependencies
import webpack from 'webpack'
import webpackDevMiddleware from 'webpack-dev-middleware'
import webpackHotMiddleware from 'webpack-hot-middleware'
import webpackConfig from '../webpack.config'

import db from './db/dbConfig.js' 
import app from './server'
import passportConfig from './passport'



// ToDo need to configure load order other than using index.js
//import routes from './routes/routes' --> moved to index.js


// Use this middleware to set up hot module reloading via webpack.
const compiler = webpack(webpackConfig)

//Dev logging
app.use(morgan('dev'))
app.use(bodyParser.json())

//Webpack compiling for hot reloads
app.use(webpackDevMiddleware(compiler, { noInfo: true, publicPath: webpackConfig.output.publicPath }))
app.use(webpackHotMiddleware(compiler))

//Static serving of client files
app.use(Express.static(__dirname + '/../public'))

