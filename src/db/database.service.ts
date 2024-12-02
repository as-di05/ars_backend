import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import knex, { Knex } from 'knex';
import { dbConnection } from './config';

@Injectable()
export class DatabaseService {
  private knexInstance: Knex;

  constructor(private configService: ConfigService) {
    this.knexInstance = dbConnection(configService);
  }

  async createDatabase() {
    const connectionConfig = {
      host: this.configService.get('DB_HOST'),
      user: this.configService.get('DB_USER'),
      password: this.configService.get('DB_PASSWORD'),
    };

    const dbName = this.configService.get('DB_NAME');
    const tempKnex = knex({ client: 'mysql2', connection: connectionConfig });

    try {
      await tempKnex.raw(`CREATE DATABASE IF NOT EXISTS \`${dbName}\``);
      console.log(`Database "${dbName}" ensured.`);
    } catch (error) {
      console.error('Error creating database:', error);
      throw error;
    } finally {
      await tempKnex.destroy();
    }
  }

  async query<T = any>(sql: string, params?: any[]): Promise<T> {
    return this.knexInstance.raw(sql, params).then((res) => res[0]);
  }
}
