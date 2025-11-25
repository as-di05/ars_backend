import { Type } from 'class-transformer';
import {
  IsBoolean,
  IsNumber,
  IsOptional,
  IsString,
  ValidateNested,
} from 'class-validator';
import { UserDto } from 'src/users/users.dto';

export interface CommonType {
  id: number;
  label: string;
}

export interface RealEstateDto {
  id: number;
  category: CommonType;
  idFloor: number;
  idSeries: number;
  idRoom: number;
  dealType: CommonType;
  district: CommonType;
  employee: UserDto;
  idWallMaterial: number;
  isFavorite?: boolean;
  idHeating: number;
  ownerName: string;
  ownerPhone: string;
  idStatus: number;
  statusUpdatedAt: string;
  createdAt: string;
  updatedAt: string;
  area: number;
  description: string;
  prices?: PriceDto[];
  documents?: CommonType[];
  images?: Array<{ id: number; url: string }>;
}

export interface InputRealEstateDto {
  id?: number;
  categoryId?: number;
  ownerName?: string;
  ownerPhone?: string;
  idRoom?: number;
  area?: number;
  idFloor?: number;
  idSeries?: number;
  idDistrict?: number;
  idDealType?: number;
  idWallMaterial?: number;
  idHeating?: number;
  description?: string;
  documents?: number[] | null;
  price?: InputPriceDto | null;
  ownerPrice?: number;
  objectPrice?: number;
  currency?: string;
}

export interface InputStatusRealEstateDto {
  id: number;
  statusId: number;
}

export interface PriceDto {
  id: number;
  idRealEstate: number;
  ownerPrice: number;
  objectPrice: number;
  currency?: string;
}

export interface InputPriceDto {
  idRealEstate?: number;
  ownerPrice?: number;
  objectPrice?: number;
  currency?: string;
}

class RealEstateFilterDto {
  @IsOptional()
  @IsNumber()
  @Type(() => Number)
  categoryId?: number;

  @IsOptional()
  @IsString()
  ownerName?: string;

  @IsOptional()
  @IsString()
  ownerPhone?: string;

  @IsOptional()
  @IsNumber()
  @Type(() => Number)
  districtId?: number;

  @IsOptional()
  @IsNumber()
  @Type(() => Number)
  floorId?: number;

  @IsOptional()
  @IsNumber()
  @Type(() => Number)
  roomId?: number;

  @IsOptional()
  @IsNumber()
  @Type(() => Number)
  seriesId?: number;
}

export class GetRealEstatesQueryDto {
  @IsOptional()
  @IsString()
  users?: string;

  @IsOptional()
  @IsNumber()
  @Type(() => Number)
  id?: number;

  @IsOptional()
  @ValidateNested()
  @Type(() => RealEstateFilterDto)
  filter: RealEstateFilterDto;

  @IsOptional()
  @IsString()
  search?: string;

  @IsOptional()
  @IsString()
  sortColumn?: string;

  @IsOptional()
  @IsString()
  isFavorites?: string;

  @IsOptional()
  @IsString()
  onlyMy?: string;
}
