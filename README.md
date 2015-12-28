#Oink Financial

### Team

* ***Product Owner***
  * [Aaron Ackerman](https://github.com/)
* ***Scrum Master***
  * [Lucilla Chalmer](https://github.com/)
* ***Development Team***
  * [Aaron Ackerman](https://github.com/)
  * [Lucilla Chalmer](https://github.com/)
  * [Todd Levin](https://github.com/tlevin)
  * [Clayton Schneider](https://github.com/claytonschneider)

### Tech Overview

* **Task Runner**
  * Webpack
* **Client Side**
  * React
  * Redux
  * Material-ui
* **Server Side**
  * Node
  * Express
  * Postgres
  * Knex
* **APIs**
  * Twillio
  * Plaid

### Usage

End User features
* spending tracking / transaction
* budget planning
* goal planning
* location view of transactions

Developer features
* integration with Plaid and Twillio API
* phone verification

### Requirements

- Node 4.x
- Postgresql 9.1.x

### Development

#### Installing Dependencies

From within the root directory:

```sh
npm install

```
#### Setting environment variables and keys

> ***Important***: Please follow the directions in order to setup the necessary API keys and secrets.  Proper local functionality and testing relies on this.

***To configure Env keys***

1. In /server/env, duplicate the envConfig-temp file
2. Enter in your API keys for Twillio and Plaid
  * Click [here](https://www.twilio.com/try-twilio) to get a Twillio account
  * Click [here](https://dashboard.plaid.com/signup/) to get a Plaid account
3. Enter a secret phrase for JWT secret
4. Save the new file as envConfig.js
  * This file will be git-ignored
5. Verify that no API data is in your envConfig-temp file (Retain this, any pull requests without it will be refused)


#### Setting up Postgres

> ***Important***: Please follow the directions in order to setup the necessary local user and PostgreSQL database - proper local functionality and testing relies on this.

***To setup your database locally:***

1. Install ***Postgres.app***
  * full-featured PostgreSQL installation w/ `psql` CLI
  * http://postgresapp.com/
2. Install ***Postico*** *_[optional]_*
  * PostgreSQL Client for OSX aka GUI
  * https://eggerapps.at/postico/
3. Use ***psql***, the Postgres CLI, to create needed database and authorized user
  1. From your terminal, enter `psql` and hit enter
  2. Now that `psql` is running, go ahead and create the user
    * `CREATE USER admin WITH SUPERUSER;`
    * `ALTER USER admin WITH PASSWORD 'admin';`
    * `SET ROLE admin;`
    * `CREATE DATABASE oink;`
4. Double check that your ***Postgres.app*** is running from your OSX toolbar, it should indicate that the port you are using is ***5432***
5. You're successfully setup for Postgres to use ***oink***!



### Roadmap

View the project roadmap [here](https://github.com/Synthetic-Centaur/Oink/issues)



## Contributing

See [CONTRIBUTING.md](CONTRIBUTING.md) for contribution guidelines.