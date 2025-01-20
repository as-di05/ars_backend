import {
  Body,
  Controller,
  Get,
  Param,
  Post,
  Req,
  UseGuards,
} from '@nestjs/common';
import { JwtAuthGuard } from 'src/auth/jwt.auth.quard';
import { CategoriesService } from './categories.service';
import { CategoryDto } from './categories.dto';

@Controller('categories')
@UseGuards(JwtAuthGuard)
export class CategoriesController {
  constructor(private readonly categoriesService: CategoriesService) {}

  @Get()
  async getCategories(
    @Req() req: any,
    @Param('id') id?: number,
  ): Promise<CategoryDto[]> {
    return this.categoriesService.getCategories();
  }
}
