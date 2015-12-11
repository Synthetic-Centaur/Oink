import request from 'supertest'
let expect = require('chai').expect
var server = require('../../server/server').server
var request = require('supertest')(server)

describe('Static routing', () => {
  it('should allow root requests to /', (done) => {
    request
      .get('/')
      .expect(200, done)
  })
  it('should respond with 404 on routes not present in static file', (done) => {
    request
      .get('/notinserver')
      .expect(404, done)
  })
})
describe('AuthRoutes', () => {
  it('should respond with a 403 forbidden with unauthorized request to auth/plaid', (done) => {
    request
      .get('/auth/plaid')
      .expect(403, done)
  })
  it('should respond with a 403 forbidden with unauthorized request to auth/login', (done) => {
    var invalidUser = {
      email: "jim@example.com",
      password: "KittyKat"
    }

    request
      .post('/auth/login')
      .send(invalidUser)
      .expect(403, done)
  })
})
describe('APIRoutes', () => {
  it('should respond with a 403 forbidden with unauthorized request to /api/initialState', (done) => {
    request
      .get('/api/initialState')
      .expect(403, done)
  })
  it('should respond with a 403 forbidden with unauthorized request to /api/budget/category/:id', (done) => {
    request
      .post('/api/budget/category/Transfer')
      .expect(403, done)
  })
