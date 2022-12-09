// Update with your config settings.

const HOST = process.env.DATABASE_HOST || '127.0.0.1';
const USER = process.env.POSTGRES_USER || 'postgres';
const PASSWORD = process.env.POSTGRES_PASSWORD || 'docker';
const DATABASE = process.env.POSTGRES_DB || 'store'
const PORT = process.env.PORT || 5432;

/**
 * @type { Object.<string, import("knex").Knex.Config> }
 * 
 * 
 */
module.exports = {

  development: {
    client: 'postgresql',
    connection: {
      host: '127.0.0.1',
      password: 'docker',
      user: 'postgres',
      port: 5432,
      database: 'store'
    }
  },

  staging: {
    client: 'postgresql',
    connection: {
      database: 'my_db',
      user:     'username',
      password: 'password'
    },
    pool: {
      min: 2,
      max: 10
    },
    migrations: {
      directory: './migrations/20221207153329_initalization.js'
    },

    seeds: {
      directory: './seeds/'
    }
  },

  production: {
    client: 'postgresql',
    connection: process.env.DATABASE_URL+'?ss;=no-verify',
    pool: {
      min: 2,
      max: 10
    },
    migrations: {
      tableName: 'knex_migrations'
    }
  }

};
