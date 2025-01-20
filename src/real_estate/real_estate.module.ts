import { Module } from '@nestjs/common';
import { RealEstateController } from './real_estate.controller';
import { RealEstateService } from './real_estate.service';
import { DatabaseModule } from 'src/db/database.module';

@Module({
  imports: [DatabaseModule],
  controllers: [RealEstateController],
  providers: [RealEstateService],
  exports: [RealEstateService],
})
export class RealEstateModule {}
