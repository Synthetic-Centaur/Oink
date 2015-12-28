let expect = require('chai').expect
var server = require('../../server/server').server
var request = require('supertest')(server)
import db from '../../server/db/dbConfig'

describe('Settings routing', () => {
  beforeEach((done) => {
    db.knex('users')
    .insert({first_name: 'Bob', last_name: 'Smith', phone_number: 1234567890, email: 'BS@gmail.com'})
    .then(() => {
      done()
    })
  })
  it('should respond with a 403 forbidden with unauthorized post requests to /api/settings', (done) => {
    request
      .post('/api/settings')
      .expect(403, done)
  })
  it('should respond with a 201 for authorized post requests to /api/settings', (done) => {
    let newSettings = {
      first_name: 'Sam'
    }
    request
      .post('/api/settings')
      .set('Authorization', 'Bearer testingAuth')
      .send(newSettings)
      .expect(201, done)
  })
  it('should have an entry in db after successful post to /api/settings', (done) => {
    let newSettings = {
      first_name: 'Sam',
      last_name: 'Smith'
    }
    request
      .post('/api/settings')
      .set('Authorization', 'Bearer testingAuth')
      .send(newSettings)
      .expect(201, newSettings, () => {
        db.knex('users')
        .where({email: 'BS@gmail.com'})
        .select('first_name','last_name', 'phone_number')
        .then( (result) => {
          expect(result[0].fisrt_name).to.equal(newSettings.fisrt_name)
          done()
        })
      })
  })
})
