import request from 'supertest'
let expect = require('chai').expect
process.env.NODE_ENV = 'dev'
var app = require('../../server/index')
var server = require('../../server/server').server

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
  it('should respond with a 403 forbidden with unauthorized request to auth/plaid', (done) => {
    request(server)
      .get('/auth/plaid')
      .expect(403, done)
  })
  it('should respond with a 403 forbidden with unauthorized request to auth/login', (done) => {
    request(server)
      .post('/auth/login')
      .expect(403, done)
  })
})
describe('APIRoutes', () => {
  it('should respond with a 403 forbidden with unauthorized request to /api/initialState', (done) => {
    request(server)
      .get('/api/initialState')
      .expect(403, done)
  })
  it('should respond with a 403 forbidden with unauthorized request to /api/budget/category/:id', (done) => {
    request(server)
      .post('/api/budget/category/Transfer')
      .expect(403, done)
  })
})