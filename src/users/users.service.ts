import { Injectable } from '@nestjs/common';
import { DatabaseService } from '../db/database.service';

@Injectable()
export class UsersService {
  constructor(private readonly databaseService: DatabaseService) {}

  async createUser(username: string, email: string, password: string) {
    const query = `
      INSERT INTO users (username, email, password)
      VALUES (?, ?, ?)
    `;
    await this.databaseService.query(query, [username, email, password]);
    return { message: 'User created successfully' };
  }

  async getAllUsers() {
    console.log('1212');

    const query = `SELECT * FROM users`;
    const res = await this.databaseService.query(query);
    console.log(res);
    if (Array.isArray(res) && res.length) {
      return `${res[0].first_name} ${res[0].last_name}`;
    }
    return '';
  }

  async getUserById(userId: number) {
    const query = `SELECT * FROM users WHERE id = ?`;
    return this.databaseService.query(query, [userId]);
  }

  async getUserByLogin(login: string) {
    const query = `SELECT * FROM users WHERE login = ?`;
    try {
      const [user] = await this.databaseService.query(query, [login]);
      if (user && user.id) {
        return user;
      }
      return null;
    } catch (error) {
      throw new Error('User is not found!');
    }
  }
}
