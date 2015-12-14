let expect = require('chai').expect
var server = require('../../server/server').server
var request = require('supertest')(server)
import db from '../../server/db/dbConfig'

describe('Goal routing', () => {
  beforeEach((done) => {
    db.knex('goals')
    .where({description: 'Tahiti'})
    .del()
    .then(() => {
      done()
    })
  })
  it('should respond with a 403 forbidden with unauthorized post requests to /api/goals', (done) => {
    request
      .post('/api/goals')
      .expect(403, done)
  })
  it('should respond with a 201 for authorized post requests to /api/goals', (done) => {
    let goal = {
      description: "Tahiti",
      amount: 200,
      goalBy: "2015-12-13T00:05:35.333Z"
    }
    request
      .post('/api/goals')
      .set('Authorization', 'Bearer testingAuth')
      .send(goal)
      .expect(201, done)
  })
  it('should respond with goal for authorized post to /api/goals', (done) => {
    let goal = {
      description: "Tahiti",
      amount: 200,
      goalBy: "2015-12-13T00:05:35.333Z"
    }
    request
      .post('/api/goals')
      .set('Authorization', 'Bearer testingAuth')
      .send(goal)
      .expect(201, goal, done)
  })
  it('should have an entry in db after successful post to /api/goals', (done) => {
    let goal = {
      description: "Tahiti",
      amount: 200,
      goalBy: "2015-12-13T00:05:35.333Z"
    }
    request
      .post('/api/goals')
      .set('Authorization', 'Bearer testingAuth')
      .send(goal)
      .expect(201, goal, () => {
        db.knex('goals')
        .where({description: 'Tahiti'})
        .select('description','amount', 'goalBy')
        .then( (result) => {
          expect(result[0].description).to.equal(goal.description)
          done()
        })
      })
  })
  it('should have goals included in a get request to /api/initialState', (done) => {
    let goal = {
      description: "Tahiti",
      amount: 200,
      goalBy: "2015-12-13T00:05:35.333Z",
      user_id: 1
    }
    request
      .get('/api/initialState')
      .set('Authorization', 'Bearer testingAuth')
      .expect(200)
      .expect((res) => {
        expect(res.body.state.goals.description).to.equal('Tahiti')
        expect(res.body.state.goals.amount).to.equal(200)
        done() 
      })

  })
})