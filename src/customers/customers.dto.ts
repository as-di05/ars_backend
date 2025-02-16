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

export interface CustomerObjectDto {
  id: number;
  category: CommonType;
  district: CommonType;
  employee: UserDto;
  customerName: string;
  customerPhone: string;
  idStatus: number;
  statusUpdatedAt: string;
  createdAt: string;
  updatedAt: string;
  description: string;
  prices?: CustomerPriceDto[];
}

export interface InputCustomerDto {
  id?: number;
  categoryId?: number;
  customerName?: string;
  customerPhone?: string;
  idDistrict?: number;
  description?: string;
  startPrice?: number;
  endPrice?: number;
  currency?: string;
}

export interface InputStatusCustomerDto {
  id: number;
  statusId: number;
}

export interface CustomerPriceDto {
  id: number;
  startPrice: number;
  endPrice: number;
  currency?: string;
}

export interface InputCustomerPriceDto {
  idCustomerObj?: number;
  startPrice?: number;
  endPrice?: number;
  currency?: string;
}

class RealEstateFilterDto {
  @IsOptional()
  @IsNumber()
  @Type(() => Number)
  categoryId?: number;

  @IsOptional()
  @IsString()
  customerName?: string;

  @IsOptional()
  @IsString()
  customerPhone?: string;

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

export class GetCustomersObjectQueryDto {
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

  // @IsOptional()
  // @IsString()
  // isFavorites?: string;

  @IsOptional()
  @IsString()
  onlyMy?: string;
}
