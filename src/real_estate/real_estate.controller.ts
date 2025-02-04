import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Query,
  Req,
  UploadedFiles,
  UseGuards,
  UseInterceptors,
} from '@nestjs/common';
import { JwtAuthGuard } from 'src/auth/jwt.auth.quard';
import { RealEstateService } from './real_estate.service';
import {
  CommonType,
  GetRealEstatesQueryDto,
  InputRealEstateDto,
  InputStatusRealEstateDto,
  RealEstateDto,
} from './real_estate.dto';
import { ApiResponseDto } from 'src/common/common.dto';
import { FileFieldsInterceptor } from '@nestjs/platform-express';

@Controller('real-estate')
@UseGuards(JwtAuthGuard)
export class RealEstateController {
  constructor(private readonly realEstateService: RealEstateService) {}

  @Post('create')
  @UseInterceptors(FileFieldsInterceptor([{ name: 'images', maxCount: 10 }]))
  async createRealEstate(
    @Req() req: any,
    @Body() input: InputRealEstateDto,
    @UploadedFiles() files: { images?: Express.Multer.File[] },
  ): Promise<ApiResponseDto> {
    const { userId } = req.user;
    return this.realEstateService.createRealEstate(
      userId,
      input,
      files?.images || [],
    );
  }

  @Post('update')
  async updateRealEstate(
    @Req() req: any,
    @Body() input: InputRealEstateDto,
  ): Promise<ApiResponseDto> {
    const { userId } = req.user;
    return this.realEstateService.updateRealEstate(userId, input);
  }

  @Post('update-status')
  async updateStatusRealEstate(
    @Req() req: any,
    @Body() input: InputStatusRealEstateDto,
  ): Promise<ApiResponseDto> {
    const { userId } = req.user;
    return this.realEstateService.updateStatusRealEstate(userId, input);
  }

  @Get()
  async getRealEstates(
    @Req() req: any,
    @Query() query: GetRealEstatesQueryDto,
  ): Promise<RealEstateDto[]> {
    const { userId, roleId } = req.user;
    return this.realEstateService.getRealEstates(userId, roleId, query);
  }

  @Post('add-favorite')
  async addToFavorites(
    @Req() req: any,
    @Body() body: { idRealEstate: number },
  ): Promise<ApiResponseDto> {
    const { userId } = req.user;
    const { idRealEstate } = body;
    if (!userId) {
      return { status: false, message: 'User not authenticated' };
    }
    try {
      return await this.realEstateService.addToFavorites(idRealEstate, userId);
    } catch (error) {
      return { status: false, message: 'Error adding to favorites' };
    }
  }

  @Delete('remove-favorite/:id')
  async removeFromFavorites(
    @Req() req: any,
    @Param('id') idRealEstate: number,
  ): Promise<ApiResponseDto> {
    const { userId } = req.user;
    if (!userId) {
      return { status: false, message: 'User not authenticated' };
    }
    try {
      return await this.realEstateService.removeFromFavorites(
        idRealEstate,
        userId,
      );
    } catch (error) {
      return { status: false, message: 'Error removing from favorites' };
    }
  }

  @Get('districts')
  async getAllDistricts(): Promise<CommonType[]> {
    return this.realEstateService.getAllDistricts();
  }

  @Get('deal-types')
  async getDealTypes(): Promise<CommonType[]> {
    return this.realEstateService.getDealTypes();
  }

  @Get('series')
  async getReSeries(): Promise<CommonType[]> {
    return this.realEstateService.getReSeries();
  }

  @Get('heatings')
  async getHeatings(): Promise<CommonType[]> {
    return this.realEstateService.getHeatings();
  }

  @Get('wall-materials')
  async getWallMaterials(): Promise<CommonType[]> {
    return this.realEstateService.getWallMaterials();
  }

  @Get('documents')
  async getReDocuments(): Promise<CommonType[]> {
    return this.realEstateService.getReDocuments();
  }
}
