  let expect = require('chai').expect
import db from '../../../server/db/dbConfig'


describe('Category Table', () => {
  
  it('should have a description column which is a varchar', (done) => {
    db.knex('categories').columnInfo('description').then((info) => {
      expect(info.type).to.equal('character varying')
      done()
    })
  })
  

})

