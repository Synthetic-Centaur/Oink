let expect = require('chai').expect
var server = require('../../server/server').server
var request = require('supertest')(server)
import db from '../../server/db/dbConfig'

describe('Static routing', () => {
  before((done)=>{
    db.knex('users').insert({first_name: 'John', last_name: 'Smith', token_auth: 'testingAuth', email: 'johnsmith@example.com', phone_number: '8085551234', token_plaid: 'testingPlaid', password: 'AwesomeTest'}).then(() => {
      done()
    })
  })
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
  after((done) => {
    setTimeout(done, 250)
  })
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
})