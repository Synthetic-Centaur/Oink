import knex from 'knex'
import Bookshelf from 'bookshelf'
import { db_connection } from '../env/envConfig'


const config = knex({
  client: 'postgresql',
  connection: db_connection
})

const db = Bookshelf(config)

db.knex.schema.hasTable('users').then( (exists) => {
  if (!exists) {
    db.knex.schema.createTable('users', (user) => {
      user.increments('id').primary()
      user.text('token_auth')
      user.string('password', 255)
      user.string('first_name', 255)
      user.string('last_name', 255)
      user.bigint('phone_number')
      user.string('email', 255)
      user.text('token_plaid')
    }).then((table) => {
      console.log("Created Users Table")
    })
  }
})

db.knex.schema.hasTable('transactions').then( (exists) => {
  if (!exists) {
    db.knex.schema.createTable('transactions', (transaction) => {
      transaction.increments('id').primary()
      transaction.integer('user_id')
      transaction.integer('category_id')
      transaction.string('date')
      transaction.decimal('amount', 20)
      transaction.string('address', 255)
      transaction.string('city', 255)
      transaction.string('state', 255)
      transaction.boolean('pending')
      transaction.string('store_name')
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
      budget.integer('user_id')
      budget.integer('category_id')
      budget.integer('target')
      budget.decimal('actual', 20)
    }).then((table) => {
      console.log("Created Budgets Table")
    })
  }
})

export default db
