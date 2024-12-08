import { Module } from '@nestjs/common';
import { UsersService } from './users.service';
import { DatabaseModule } from '../db/database.module';
import { UsersController } from './users.controller';

@Module({
  imports: [DatabaseModule],
  providers: [UsersService],
  exports: [UsersService],
  controllers: [UsersController],
})
export class UsersModule {}
