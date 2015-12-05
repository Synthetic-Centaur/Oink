import path from 'path'
import Express from 'express'
import bodyParser from 'body-parser'

import webpack from 'webpack'
import webpackDevMiddleware from 'webpack-dev-middleware'
import webpackHotMiddleware from 'webpack-hot-middleware'
import webpackConfig from '../webpack.config'

import db from './db/dbConfig.js' 
import app from './server'

// ToDo need to configure load order other than using index.js
//import routes from './routes/routes' --> moved to index.js


// Use this middleware to set up hot module reloading via webpack.
const compiler = webpack(webpackConfig)
app.use(bodyParser.json())
app.use(webpackDevMiddleware(compiler, { noInfo: true, publicPath: webpackConfig.output.publicPath }))
app.use(webpackHotMiddleware(compiler))
app.use(Express.static(__dirname + '/../public'))

