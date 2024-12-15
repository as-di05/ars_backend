import {
  Body,
  Controller,
  Get,
  Param,
  Post,
  Query,
  Req,
  UseGuards,
} from '@nestjs/common';
import { JwtAuthGuard } from 'src/auth/jwt.auth.quard';
import { RealEstateService } from './real_estate.service';
import { InputRealEstateDto, RealEstateDto } from './real_estate.dto';
import { ApiResponseDto } from 'src/common/common.dto';

@Controller('real-estate')
@UseGuards(JwtAuthGuard)
export class RealEstateController {
  constructor(private readonly realEstateService: RealEstateService) {}

  @Post('create')
  async createRealEstate(
    @Req() req: any,
    @Body() input: InputRealEstateDto,
  ): Promise<ApiResponseDto> {
    const { userId } = req.user;
    return this.realEstateService.createRealEstate(userId, input);
  }

  @Post('update')
  async updateRealEstate(
    @Req() req: any,
    @Body() input: InputRealEstateDto,
  ): Promise<ApiResponseDto> {
    const { userId } = req.user;
    return this.realEstateService.updateRealEstate(userId, input);
  }

  @Get()
  async getRealEstates(
    @Req() req: any,
    @Query('users') users?: number[],
  ): Promise<RealEstateDto[]> {
    const { userId, roleId } = req.user;
    return this.realEstateService.getRealEstates(userId, roleId, users);
  }
}
