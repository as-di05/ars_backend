import { Controller, Get } from '@nestjs/common';
import { DatabaseService } from './db/database.service';

@Controller()
export class AppController {
  constructor(private readonly dbService: DatabaseService) {}

  // Тестовый endpoint для проверки кодировки
  @Get('test-encoding')
  async testEncoding() {
    try {
      const result = await this.dbService.query(
        'SELECT id, label FROM districts LIMIT 5'
      );
      return {
        message: 'Encoding test',
        data: result,
        rawQuery: 'SELECT id, label FROM districts LIMIT 5',
      };
    } catch (error) {
      return { error: error.message };
    }
  }

  // Endpoint для исправления кодировки старых данных
  // ВНИМАНИЕ: Используйте только один раз для исправления данных!
  @Get('fix-encoding')
  async fixEncoding() {
    try {
      // Исправляем таблицу roles
      await this.dbService.query(
        "UPDATE roles SET name = 'Управляющий' WHERE id = 1"
      );
      await this.dbService.query(
        "UPDATE roles SET name = 'Менеджер' WHERE id = 2"
      );
      await this.dbService.query(
        "UPDATE roles SET name = 'Сотрудник' WHERE id = 3"
      );

      // Исправляем пользователя 2
      await this.dbService.query(
        "UPDATE users SET first_name = 'Адилет', last_name = 'Улукбеков' WHERE id = 2"
      );

      // Проверяем результат
      const roles = await this.dbService.query('SELECT id, name FROM roles ORDER BY id');
      const users = await this.dbService.query(
        'SELECT id, login, first_name, last_name FROM users WHERE id IN (1, 2)'
      );

      return {
        message: 'Encoding fixed successfully',
        roles,
        users,
      };
    } catch (error) {
      return { error: error.message };
    }
  }
}
