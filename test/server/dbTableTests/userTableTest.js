let expect = require('chai').expect
import db from '../../../server/db/dbConfig'
import util from '../util'

describe('User Table', () => {
  before( (done) => {
    util.clearDB().then(() => {
      util.populateDB( () => {
        setTimeout(done, 500)
      })
    })
  })
  
  it('should have a token_auth column which is a string', (done) => {
    db.knex('users').columnInfo('token_auth').then((info) => {
      expect(info.type).to.equal('text')
      done()
    })
  })
  it('should have a User\'s table', (done) => {
    db.knex.schema.hasTable('users').then( (exists) => {
      expect(exists).to.equal(true)
      done()
    })
  })
  it('should have a password column which is a varchar', (done) => {
    db.knex('users').columnInfo('password').then((info) => {
      expect(info.type).to.equal('character varying')
      expect(info.maxLength).to.equal(255)
      done()
    })
  })
  it('should have a first_name column which is a varchar', (done) => {
    db.knex('users').columnInfo('first_name').then((info) => {
      expect(info.type).to.equal('character varying')
      expect(info.maxLength).to.equal(255)
      done()
    })
  })
  it('should have a last_name column which is a varchar', (done) => {
    db.knex('users').columnInfo('last_name').then((info) => {
      expect(info.type).to.equal('character varying')
      expect(info.maxLength).to.equal(255)
      done()
    })
  })
  it('should have a phone_number column which is a bigint', (done) => {
    db.knex('users').columnInfo('phone_number').then((info) => {
      expect(info.type).to.equal('bigint')
      done()
    })
  })
  it('should have a email column which is a varchar', (done) => {
    db.knex('users').columnInfo('email').then((info) => {
      expect(info.type).to.equal('character varying')
      expect(info.maxLength).to.equal(255)
      done()
    })
  })
  it('should have a token_plaid column which has is a varchar', (done) => {
    db.knex('users').columnInfo('email').then((info) => {
      expect(info.type).to.equal('character varying')
      done()
    })
  })

})

