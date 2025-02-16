import { Module } from '@nestjs/common';
import { CustomersController } from './customers.controller';
import { CustomersService } from './customers.service';
import { DatabaseModule } from 'src/db/database.module';

@Module({
  imports: [DatabaseModule],
  providers: [CustomersService],
  exports: [CustomersService],
  controllers: [CustomersController],
})
export class CustomersModule {}
