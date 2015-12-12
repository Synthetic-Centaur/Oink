let expect = require('chai').expect
var server = require('../../server/server').server
var request = require('supertest')(server)

describe('Goal routing', () => {
  it('should respond with a 403 forbidden with unauthorized post requests to /api/goals', (done) => {
    request
      .post('/api/goals')
      .expect(403, done)
  })
})