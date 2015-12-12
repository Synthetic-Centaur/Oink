import db from '../../../server/db/dbConfig'
let expect = require('chai').expect


describe('Goals Table', () => {
  
  it('should have a Goal\'s table', (done) => {
    db.knex.schema.hasTable('goals').then( (exists) => {
      expect(exists).to.equal(true)
      done()
    })
  })
  it('should have a user_id column which is an integer', (done) => {
    db.knex('goals').columnInfo('user_id').then((info) => {
      expect(info.type).to.equal('integer')
      done()
    })
  })
  it('should have a description which is an varchar', (done) => {
    db.knex('goals').columnInfo('description').then((info) => {
      expect(info.type).to.equal('character varying')
      done()
    })
  })
  it('should have a amount which is an integer', (done) => {
    db.knex('goals').columnInfo('amount').then((info) => {
      expect(info.type).to.equal('integer')
      done()
    })
  })
  it('should have a goalBy column which is a date', (done) => {
    db.knex('goals').columnInfo('goalBy').then((info) => {
      expect(info.type).to.equal('date')
      done()
    })
  })

})

