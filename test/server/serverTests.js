process.env.NODE_ENV = 'dev'
var app = require('../../server/index')
var server = require('../../server/server').server

var goalRoutesTest = require('./goalRoutesTest')
var routeTest = require('./routeTest')
var userTableTest = require('./dbTableTests/userTableTest')
var budgetsTableTest = require ('./dbTableTests/budgetsTableTest')
var transactionTableTest = require('./dbTableTests/transactionTableTest')
var categoriesTableTest = require('./dbTableTests/categoriesTableTest')
var goalTableTest = require('./dbTableTests/goalTableTest')