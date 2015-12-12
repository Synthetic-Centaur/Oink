import db from '../../server/db/dbConfig'
import {populateTables} from '../../server/db/dbConfig'

let util = {
  clearDB() {
    //clear out DB tables
    return db.knex.schema.dropTableIfExists('budgets').then( () => {
      return db.knex.schema.dropTableIfExists('users').then( () => {
        return db.knex.schema.dropTableIfExists('transactions').then( () => {
          return db.knex.schema.dropTableIfExists('categories').then( () => {
            return db.knex.schema.dropTableIfExists('goals').then( () => {
              return "Done" 
            })
          })
        })
      })
    })    
  },
  populateDB(cb) {
    // add each db table back
    populateTables( () => {
      cb()
    })
  }
}


export default util