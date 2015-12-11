import path from 'path'
import Express from 'express'
import morgan from 'morgan'

import bodyParser from 'body-parser'
import jwt from 'jsonwebtoken'

// Webpack dependencies
import webpack from 'webpack'
import webpackDevMiddleware from 'webpack-dev-middleware'
import webpackHotMiddleware from 'webpack-hot-middleware'
import webpackConfig from '../webpack.config'


import db from './db/dbConfig.js'
import {populateTables} from './db/dbConfig'
populateTables(() => {})

import app from './server'


if (process.env.NODE_ENV === 'dev') {
  // Use this middleware to set up hot module reloading via webpack.
  const compiler = webpack(webpackConfig)
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
app.use(Express.static(__dirname + '/../public'))
