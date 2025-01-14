import { Type } from 'class-transformer';
import { IsNumber, IsOptional, IsString } from 'class-validator';
import { UserDto } from 'src/users/users.dto';

export interface RealEstateDto {
  id: number;
  category: {
    id: number;
    label: string;
  };
  idFloor: number;
  idSeries: number;
  idRoom: number;
  dealType: {
    id: number;
    label: string;
  };
  district: {
    id: number;
    label: string;
  };
  employee: UserDto;
  idWallMaterial: number;
  ownerName: string;
  ownerPhone: string;
  idStatus: number;
  statusUpdatedAt: string;
  createdAt: string;
  updatedAt: string;
  area: number;
  description: string;
  prices?: PriceDto[];

  documents?: {
    id: number;
    label: string;
  }[];
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
  description?: string;
  documents?: number[] | null;
  price?: InputPriceDto | null;
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

export class GetRealEstatesQueryDto {
  @IsOptional()
  @IsString()
  users?: string;

  @IsOptional()
  @IsNumber()
  @Type(() => Number)
  id?: number;

  @IsOptional()
  @IsNumber()
  @Type(() => Number)
  categoryId?: number;

  @IsOptional()
  @IsString()
  sortColumn?: string;
}
