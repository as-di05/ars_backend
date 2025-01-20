import { Injectable } from '@nestjs/common';
import { DatabaseService } from 'src/db/database.service';
import { CategoryDto } from './categories.dto';

@Injectable()
export class CategoriesService {
  constructor(private readonly dbService: DatabaseService) {}

  async getCategories(): Promise<CategoryDto[]> {
    const query = `SELECT id, label FROM categories`;
    try {
      const res = await this.dbService.query(query, []);
      if (Array.isArray(res) && res.length) {
        return res;
      }
      return [];
    } catch (error) {
      console.log('Error is getCategories:', error);
    }
  }
}
