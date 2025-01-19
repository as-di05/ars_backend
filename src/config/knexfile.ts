import * as dotenv from 'dotenv';
dotenv.config();
// console.log(dotenv.config(), '-----dotenv');
// console.log(process.env.DB_HOST, '-------');
// console.log(process.env.DB_USER);
// console.log(process.env.DB_PASSWORD);

import { Knex } from 'knex';

const config: Knex.Config = {
  client: 'mysql2',
  connection: {
    host: process.env.DB_HOST || 'localhost',
    port: +process.env.DB_PORT || 3306,
    user: process.env.DB_USER || 'root',
    password: process.env.DB_PASSWORD || '',
    database: process.env.DB_NAME || 'ars_crm',
  },
  migrations: {
    directory: '../db/migrations',
    tableName: 'knex_migrations',
  },
  seeds: {
    directory: '../db/seeds',
  },
};

module.exports = config;
