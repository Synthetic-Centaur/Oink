  let expect = require('chai').expect
import db from '../../../server/db/dbConfig'
import util from '../util'


describe('Category Table', () => {
  beforeEach( (done) => {
    util.clearDB().then(() => {
      util.populateDB( () => {
        setTimeout(done, 250)
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

