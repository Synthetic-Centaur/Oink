import knex from 'knex'
import Bookshelf from 'bookshelf'
const config = knex({
  client: 'postgresql',
  connection: {
    host: 'localhost',
    port: 5432,
    user: 'admin', 
    password: 'admin',
    database: 'oink',
    charset: 'UTF8_GENERAL_CI'
  }
})

const db = Bookshelf(config)

db.knex.schema.hasTable('users').then( (exists) => {
  if (!exists) {
    db.knex.schema.createTable('users', (user) => {
      user.increments('id').primary()
      user.string('first_name', 255)
      user.string('last_name', 255)
      user.bigint('phone_number')
      user.timestamps()
      user.string('uuid')
    }).then((table) => {
      console.log("Created Users Table")
    })
  }
})

db.knex.schema.hasTable('transactions').then( (exists) => {
  if (!exists) {
    db.knex.schema.createTable('transactions', (transaction) => {
      transaction.increments('id').primary()
      transaction.date('date')
      transaction.decimal('amount', 2)
      transaction.string('address', 255)
      transaction.string('city', 255)
      transaction.string('state', 255)
      transaction.string('zip', 255)
      transaction.boolean('pending')
      transaction.uuid('store_name')
    }).then((table) => {
      console.log("Created Transactions Table")
    })
  }
})

db.knex.schema.hasTable('categories').then( (exists) => {
  if (!exists) {
    db.knex.schema.createTable('categories', (category) => {
      category.increments('id').primary()
      category.string('description', 255)
    }).then((table) => {
      console.log("Created Categories Table")
    })
  }
})

db.knex.schema.hasTable('budgets').then( (exists) => {
  if (!exists) {
    db.knex.schema.createTable('budgets', (budget) => {
      budget.increments('id').primary()
      budget.string('target', 255)
      budget.string('actual', 255)
    }).then((table) => {
      console.log("Created Budgets Table")
    })
  }
})

export default db
