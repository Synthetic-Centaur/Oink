  let expect = require('chai').expect
import db from '../../../server/db/dbConfig'
import util from '../util'


describe('Category Table', () => {
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
  
  it('should have a description column which is a varchar', (done) => {
    db.knex('categories').columnInfo('description').then((info) => {
      expect(info.type).to.equal('character varying')
      done()
    })
  })
  

})

