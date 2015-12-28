import path from 'path'
import Express from 'express'
import morgan from 'morgan'

import bodyParser from 'body-parser'
import jwt from 'jsonwebtoken'

import db from './db/dbConfig.js'
import {populateTables} from './db/dbConfig'
populateTables(() => {})

import app from './server'

if (process.env.NODE_ENV === 'dev' || process.env.NODE_ENV === 'test') {

  // Webpack dependencies
  let webpack = require('webpack')
  let webpackDevMiddleware = require('webpack-dev-middleware')
  let webpackHotMiddleware = require('webpack-hot-middleware')
  let webpackConfig = require('../webpack.config')

  let compiler = webpack(webpackConfig)
  
  // Webpack compiling for hot reloads
  app.use(webpackDevMiddleware(compiler, { noInfo: true, publicPath: webpackConfig.output.publicPath }))
  app.use(webpackHotMiddleware(compiler))
}

// Body Parser middleware for handling requests
app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())

//Dev logging
app.use(morgan('dev'))

//Static serving of client files
app.use('/', Express.static(__dirname + '/../public'))

//Static serving of documentation
app.use('/documentation', Express.static(__dirname + '/../docs'))
