export interface RealEstateDto {
  id: number;
  idFloor: number;
  idSeries: number;
  idRoom: number;
  idDealType: number;
  idWallMaterial: number;
  ownerName: string;
  ownerPhone: string;
  idStatus: number;
  statusUpdatedAt: string;
  createdAt: string;
  updatedAt: string;
  area: number;
  district: string;
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
  district?: string;
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
