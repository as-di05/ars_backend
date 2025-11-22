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
}
