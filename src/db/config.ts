import { ConfigService } from '@nestjs/config';
import knex, { Knex } from 'knex';

export const databaseConfig = (configService: ConfigService) => ({
  client: 'mysql2',
  connection: {
    host: configService.get('DB_HOST'),
    port: configService.get('DB_PORT'),
    user: configService.get('DB_USER'),
    password: configService.get('DB_PASSWORD'),
    database: configService.get('DB_NAME'),
    charset: 'utf8mb4', // Правильная кодировка для кириллицы
  },
  pool: { min: 2, max: 10 },
  migrations: {
    tableName: 'knex_migrations',
    directory: './src/db/migrations',
  },
  seeds: { directory: './src/db/seeds' },
});

export const dbConnection = (configService: ConfigService): Knex =>
  knex(databaseConfig(configService));

const URLS = {
  test: 'http://localhost:8080',
  sandbox: 'https://sandbox.intelogos.com',
  production: 'https://app.intelogos.com',
  staging: 'https://staging.intelogos.com',
};
export const URL = URLS[process.env.NODE_ENV ?? 'test'];
