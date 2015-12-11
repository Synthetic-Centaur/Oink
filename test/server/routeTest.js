import request from 'supertest'
let expect = require('chai').expect
process.env.NODE_ENV = 'dev'
var app = require('../../server/index')
var server = require('../../server/server').server
import db from ('../../server/db/dbConfig')

describe('Static routing', () => {
  it('should allow root requests to /', (done) => {
    request(server)
      .get('/')
      .expect(200, done)
  })
  it('should respond with 404 on routes not present in static file', (done) => {
    request(server)
      .get('/notinserver')
      .expect(404, done)
  })
})
describe('AuthRoutes', () => {
  it('should ')
})