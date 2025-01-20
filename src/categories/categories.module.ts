import { Module } from '@nestjs/common';
import { CategoriesService } from './categories.service';
import { CategoriesController } from './categories.controller';
import { DatabaseModule } from 'src/db/database.module';

@Module({
  imports: [DatabaseModule],
  providers: [CategoriesService],
  exports: [CategoriesService],
  controllers: [CategoriesController],
})
export class CategoriesModule {}
