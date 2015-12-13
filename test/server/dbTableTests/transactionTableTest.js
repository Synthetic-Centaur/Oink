  let expect = require('chai').expect
import db from '../../../server/db/dbConfig'
import util from '../util'


describe('Transaction Table', () => {
  before( (done) => {
    util.clearDB().then(() => {
      util.populateDB( () => {
        done()
      })
    })
  })
  after( (done) => {
    util.populateDB( () => {
        done()
    })
  })
  
  it('should have a user_id column which is an integer', (done) => {
    db.knex('transactions').columnInfo('user_id').then((info) => {
      expect(info.type).to.equal('integer')
      done()
    })
  })
  it('should have a Transactions\'s table', (done) => {
    db.knex.schema.hasTable('transactions').then( (exists) => {
      expect(exists).to.equal(true)
      done()
    })
  })
  it('should have a category_id column which is an integer', (done) => {
    db.knex('transactions').columnInfo('category_id').then((info) => {
      expect(info.type).to.equal('integer')
      done()
    })
  })
  it('should have a date column which is varchar', (done) => {
    db.knex('transactions').columnInfo('date').then((info) => {
      expect(info.type).to.equal('date')
      done()
    })
  })
  it('should have a address column which is varchar', (done) => {
    db.knex('transactions').columnInfo('address').then((info) => {
      expect(info.type).to.equal('character varying')
      done()
    })
  })
  it('should have a city column which is varchar', (done) => {
    db.knex('transactions').columnInfo('city').then((info) => {
      expect(info.type).to.equal('character varying')
      done()
    })
  })
  it('should have a state column which is varchar', (done) => {
    db.knex('transactions').columnInfo('state').then((info) => {
      expect(info.type).to.equal('character varying')
      done()
    })
  })
  it('should have a pending column which is boolean', (done) => {
    db.knex('transactions').columnInfo('pending').then((info) => {
      expect(info.type).to.equal('boolean')
      done()
    })
  })
  it('should have a store_name column which is varchar', (done) => {
    db.knex('transactions').columnInfo('store_name').then((info) => {
      expect(info.type).to.equal('character varying')
      done()
    })
  })
  it('should have a amount column which is a decimal', (done) => {
    db.knex('transactions').columnInfo('amount').then((info) => {
      expect(info.type).to.equal('real')
      done()
    })
  })
})

