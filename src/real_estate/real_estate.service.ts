import { Injectable } from '@nestjs/common';
import { DatabaseService } from 'src/db/database.service';
import {
  CommonType,
  GetRealEstatesQueryDto,
  InputPriceDto,
  InputRealEstateDto,
  RealEstateDto,
} from './real_estate.dto';
import { ApiResponseDto } from 'src/common/common.dto';
import * as sharp from 'sharp';
import * as fs from 'fs';
import * as path from 'path';
import { transformSearchText } from 'src/utils/utils';

@Injectable()
export class RealEstateService {
  constructor(private readonly dbService: DatabaseService) {}

  async createRealEstate(
    userId: number,
    input: InputRealEstateDto,
    uploadedFiles: Express.Multer.File[],
  ): Promise<ApiResponseDto> {
    if (!input.categoryId || !userId || !input.ownerName || !input.ownerPhone) {
      return { status: false, message: 'Missing required fields' };
    }
    let query_text = `
        INSERT INTO real_estate_objects (
            category_id, 
            employee_id, 
            owner_name, 
            owner_phone, 
            id_room,
            area,
            id_floor,
            id_series,
            id_district,
            id_deal_type,
            id_wall_material,
            id_heating,
            description
        ) 
        VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
      `;
    try {
      const res = await this.dbService.query(query_text, [
        input.categoryId,
        userId,
        input.ownerName ?? null,
        input.ownerPhone ?? null,
        input.idRoom ?? null,
        typeof input.area === 'string' && input.area === 'null'
          ? null
          : input.area,
        input.idFloor ?? null,
        input.idSeries ?? null,
        input.idDistrict ?? null,
        input.idDealType ?? null,
        typeof input.idWallMaterial === 'string' &&
        input.idWallMaterial === 'null'
          ? null
          : input.idWallMaterial,
        input.idHeating ?? null,
        input.description ?? null,
      ]);

      const idRealEstate = res?.insertId ?? null;
      if (idRealEstate && (input.ownerPrice || input.objectPrice)) {
        await this.insertNewPrice({
          idRealEstate,
          ownerPrice: input.ownerPrice ?? null,
          objectPrice: input.objectPrice ?? null,
          currency: input.currency ?? 'KGS',
        });
      }
      if (idRealEstate && input.documents && input.documents.length > 0) {
        await this.insertDocumentsToRe({
          idRealEstate,
          documents: Array.isArray(input.documents)
            ? input.documents
            : [input.documents],
        });
      }
      if (idRealEstate && uploadedFiles.length > 0) {
        await this.insertImagesToRe({
          idRealEstate,
          images: uploadedFiles ?? [],
        });
      }
      return { status: true, message: 'Real estate created successfully' };
    } catch (err) {
      console.log('Error in createRealEstate', err);
      return { status: false, message: 'Failed to create real estate' };
    }
  }

  async updateRealEstate(
    userId: number,
    input: InputRealEstateDto,
  ): Promise<ApiResponseDto> {
    if (!input.id || !userId) {
      return { status: false, message: 'ID not found' };
    }
    let query_text = `SELECT id FROM real_estate_objects WHERE id = ? AND employee_id = ?`;
    try {
      const res = await this.dbService.query(query_text, [input.id, userId]);
      if (!Array.isArray(res) || !res.length) {
        return { status: false, message: 'Internal Server Error!' };
      }
    } catch (err) {
      console.log('Error in updateRealEstate', err);
    }

    const params = [];
    const updates: string[] = [];
    if (input.categoryId) {
      updates.push('category_id = ?');
      params.push(input.categoryId);
    }
    if (input.idRoom) {
      updates.push('id_room = ?');
      params.push(input.idRoom);
    }
    if (input.ownerName?.length) {
      updates.push('owner_name = ?');
      params.push(input.ownerName);
    }
    if (input.area && input.area > 0) {
      updates.push('area = ?');
      params.push(input.area);
    }
    if (input.idFloor) {
      updates.push('id_floor = ?');
      params.push(input.idFloor);
    }
    if (input.idSeries) {
      updates.push('id_series = ?');
      params.push(input.idSeries);
    }
    if (input.idDistrict) {
      updates.push('id_district = ?');
      params.push(input.idDistrict);
    }
    if (input.idDealType) {
      updates.push('id_deal_type = ?');
      params.push(input.idDealType);
    }
    if (input.idWallMaterial) {
      updates.push('id_wall_material = ?');
      params.push(input.idWallMaterial);
    }
    if (input.idHeating) {
      updates.push('id_heating = ?');
      params.push(input.idHeating);
    }
    if (input.description?.length) {
      updates.push('description = ?');
      params.push(input.description);
    }
    params.push(input.id);
    query_text = `UPDATE real_estate_objects SET ${updates.join(', ')} WHERE id = ?`;

    try {
      if (updates.length > 0) {
        await this.dbService.query(query_text, params);
      }
      if (input.price) {
        await this.insertNewPrice({
          idRealEstate: input.id,
          ownerPrice: input.price.ownerPrice ?? null,
          objectPrice: input.price.objectPrice ?? null,
          currency: input.price.currency ?? 'KGS',
        });
      }
      if (input.documents && input.documents.length > 0) {
        await this.insertDocumentsToRe({
          idRealEstate: input.id,
          documents: input.documents,
        });
      }
      return { status: true, message: 'Real estate created successfully' };
    } catch (err) {
      console.log('Error in createRealEstate', err);
    }
  }

  async insertNewPrice(input: InputPriceDto): Promise<ApiResponseDto> {
    if (!input.idRealEstate) {
      return { status: false, message: 'ID Real Estate not found' };
    }
    const query_text = `
        INSERT INTO re_price_history (id_real_estate, owner_price, object_price, currency) 
        VALUES (?, ?, ?, ?)
    `;
    try {
      await this.dbService.query(query_text, [
        input.idRealEstate,
        input.ownerPrice,
        input.objectPrice,
        input.currency,
      ]);
      return {
        status: true,
        message: 'Real Estate price inserted successfully',
      };
    } catch (err) {
      console.log('Error in insertNewPrice', err);
    }
  }

  async insertImagesToRe({
    idRealEstate,
    images,
  }: {
    idRealEstate: number;
    images: Express.Multer.File[];
  }): Promise<ApiResponseDto> {
    if (!idRealEstate) {
      return { status: false, message: 'ID Real Estate not found' };
    }
    const uploadDir = path.join(process.cwd(), 'uploads', 'images');
    if (!fs.existsSync(uploadDir)) {
      fs.mkdirSync(uploadDir, { recursive: true });
    }

    const compressedImages = [];
    for (const file of images) {
      const fileExtension = file.mimetype.split('/')[1];
      const fileName = `${Date.now()}-${file.originalname.split('.')[0]}.${fileExtension}`;
      const filePath = path.join(uploadDir, fileName);

      await sharp(file.buffer)
        .resize({ width: 800 })
        .jpeg({ quality: 80 })
        .toFile(filePath);

      compressedImages.push([idRealEstate, fileName]);
    }

    const query_text = `
      INSERT INTO re_photos (id_real_estate, name)
      VALUES ? ON DUPLICATE KEY UPDATE name=VALUES(name)
    `;

    try {
      await this.dbService.query(query_text, [compressedImages]);
      return {
        status: true,
        message: 'Real Estate images inserted successfully',
      };
    } catch (err) {
      console.log('Error in insertImagesToRe', err);
      return { status: false, message: 'Error inserting images' };
    }
  }

  async insertDocumentsToRe({
    idRealEstate,
    documents,
  }: {
    idRealEstate: number;
    documents: number[] | null;
  }): Promise<ApiResponseDto> {
    if (!idRealEstate) {
      return { status: false, message: 'ID Real Estate not found' };
    }

    let query_text = `DELETE FROM re_documents WHERE id_real_estate = ?;`;
    try {
      await this.dbService.query(query_text, [idRealEstate]);

      if (documents && documents.length > 0) {
        query_text = `
            INSERT INTO re_documents (id_real_estate, id_document) 
            VALUES ? AS NEW ON DUPLICATE KEY UPDATE 
                id_document=NEW.id_document
        `;
        await this.dbService.query(query_text, [
          documents.map((item) => [idRealEstate, item]),
        ]);
      }
      return {
        status: true,
        message: 'Real Estate documents inserted successfully',
      };
    } catch (err) {
      console.log('Error in insertDocumentsToRe', err);
    }
  }
  async getRealEstates(
    userId: number,
    roleId: number,
    params: GetRealEstatesQueryDto,
  ): Promise<RealEstateDto[]> {
    const { users, id, search, isFavorites, filter, onlyMy } = params;
    const baseUrl = 'https://turan-nedvijimost-27595b75bbe9.herokuapp.com';
    let otherFilters: string[] = [];
    let queryParams: any[] = [];

    if (filter?.ownerName) {
      otherFilters.push('re.owner_name LIKE ?');
      queryParams.push(`%${filter.ownerName}%`);
    }
    if (filter?.ownerPhone) {
      otherFilters.push('re.owner_phone = ?');
      queryParams.push(filter.ownerPhone);
    }
    if (filter?.districtId) {
      otherFilters.push('re.id_district = ?');
      queryParams.push(filter.districtId);
    }
    if (filter?.floorId) {
      otherFilters.push('re.id_floor = ?');
      queryParams.push(filter.floorId);
    }
    if (filter?.roomId) {
      otherFilters.push('re.id_room = ?');
      queryParams.push(filter.roomId);
    }
    if (filter?.seriesId) {
      otherFilters.push('re.id_series = ?');
      queryParams.push(filter.seriesId);
    }
    if (filter?.categoryId) {
      otherFilters.push('re.category_id = ?');
      queryParams.push(filter.categoryId);
    }

    let searchFilter = '';
    if (typeof search === 'string' && search.length > 0) {
      const textSearch = transformSearchText(search);
      searchFilter = `
        (re.id LIKE ? OR 
         re.owner_name LIKE ? OR
         re.description LIKE ?
        )
      `;
      queryParams.push(`%${textSearch}%`, `%${textSearch}%`, `%${textSearch}%`);
    }

    let filterPrice = 'NULL AS prices';
    // if (roleId === 1) {
    filterPrice = `
        (SELECT JSON_ARRAYAGG(
            JSON_OBJECT(
                'id', ph.id,
                'ownerPrice', ph.owner_price,
                'objectPrice', ph.object_price,
                'currency', ph.currency,
                'createdAt', ph.created_at,
                'updatedAt', ph.updated_at
            )
        ) FROM re_price_history ph
        WHERE ph.id_real_estate = re.id
        ) AS prices
      `;
    // }

    let filters = '';
    if (otherFilters.length > 0) {
      filters = `WHERE ${otherFilters.join(' AND ')}`;
    }
    if (searchFilter.length > 0) {
      filters = filters
        ? `${filters} AND ${searchFilter}`
        : `WHERE ${searchFilter}`;
    }
    if (isFavorites === 'true') {
      filters = filters
        ? `${filters} AND rf.id_user = ?`
        : `WHERE rf.id_user = ?`;
      queryParams.push(userId);
    }
    if (typeof id === 'number') {
      filters = filters ? `${filters} AND re.id = ?` : `WHERE re.id = ?`;
      queryParams.push(id);
    }
    if (onlyMy === 'true') {
      filters = filters
        ? `${filters} AND re.employee_id = ?`
        : `WHERE re.employee_id = ?`;
      queryParams.push(userId);
    }

    let sortColumn = 're.created_at';
    const allowedSortColumns: { [key: string]: string } = {
      created: 're.created_at',
      lastUpdated: 're.updated_at',
    };
    if (searchFilter.length > 0) {
      sortColumn = `re.id, re.owner_name, re.description`;
    } else if (params.sortColumn && allowedSortColumns[params.sortColumn]) {
      sortColumn = allowedSortColumns[params.sortColumn];
    }

    const query = `
      SELECT 
          re.id, 
          re.id_floor AS idFloor, 
          re.id_series AS idSeries, 
          JSON_OBJECT(
              'id', c.id,
              'label', c.label
          ) AS category,
          JSON_OBJECT(
              'id', dp.id,
              'label', dp.label
          ) AS dealType,
          JSON_OBJECT(
              'id', u.id,
              'firstName', u.first_name,
              'lastName', u.last_name,
              'phone', u.phone_number,
              'avatarUrl', u.avatar_url,
              'roleId', u.role_id
          ) AS employee,
          JSON_OBJECT(
              'id', d.id,
              'label', d.label
          ) AS district,
          re.id_room AS idRoom, 
          re.id_wall_material AS idWallMaterial, 
          re.id_heating AS idHeating, 
          re.owner_phone AS ownerPhone, 
          re.owner_name AS ownerName, 
          re.id_status AS idStatus, 
          re.status_updated_at AS statusUpdatedAt, 
          re.created_at AS createdAt, 
          re.updated_at AS updatedAt, 
          re.area,
          re.description,
          rf.id as ids,
          IF(rf.id_user IS NOT NULL, 1, 0) AS isFavorite,
          (SELECT JSON_ARRAYAGG(
                JSON_OBJECT(
                    'id', d.id,
                    'label', d.label
                )
            ) FROM re_documents rd
            INNER JOIN documents d ON d.id = rd.id_document AND rd.id_real_estate = re.id
          ) AS documents,
          (SELECT JSON_ARRAYAGG(
                JSON_OBJECT(
                    'id', rp.id,
                    'url', CONCAT('${baseUrl}/uploads/images/', rp.name)
                )
            ) FROM re_photos rp
            WHERE rp.id_real_estate = re.id
          ) AS images,
          ${filterPrice}
      FROM real_estate_objects re
      INNER JOIN users u ON u.id = re.employee_id
      LEFT JOIN re_favorites rf ON rf.id_real_estate = re.id AND rf.id_user = ${userId}
      INNER JOIN categories c ON c.id = re.category_id
      LEFT JOIN deal_types dp ON dp.id = re.id_deal_type
      LEFT JOIN districts d ON d.id = re.id_district
      ${filters}
      ORDER BY ${sortColumn} DESC
    `;

    try {
      const res = await this.dbService.query(query, queryParams);
      if (Array.isArray(res) && res.length) {
        return res;
      }
      return [];
    } catch (error) {
      console.log('Error in getRealEstates:', error);
    }
  }

  async addToFavorites(
    idRealEstate: number,
    idUser: number,
  ): Promise<ApiResponseDto> {
    const query_text = `
      INSERT INTO re_favorites (id_real_estate, id_user)
      VALUES (?, ?)
      ON DUPLICATE KEY UPDATE 
        id_real_estate = VALUES(id_real_estate), 
        id_user = VALUES(id_user);
    `;
    try {
      await this.dbService.query(query_text, [idRealEstate, idUser]);
      return { status: true, message: 'Added to favorites successfully' };
    } catch (err) {
      console.error('Error adding to favorites', err);
      return { status: false, message: 'Error adding to favorites' };
    }
  }

  async removeFromFavorites(
    idRealEstate: number,
    idUser: number,
  ): Promise<ApiResponseDto> {
    const query_text = `
      DELETE FROM re_favorites
      WHERE id_real_estate = ? AND id_user = ?
    `;
    try {
      const result = await this.dbService.query(query_text, [
        idRealEstate,
        idUser,
      ]);
      if (result.affectedRows > 0) {
        return { status: true, message: 'Removed from favorites successfully' };
      } else {
        return { status: false, message: 'No matching record found' };
      }
    } catch (err) {
      console.error('Error removing from favorites', err);
      return { status: false, message: 'Error removing from favorites' };
    }
  }

  async getAllDistricts(): Promise<CommonType[]> {
    const query_text = 'SELECT * FROM districts';
    try {
      const response = await this.dbService.query(query_text, []);
      if (Array.isArray(response) && response.length) {
        return response;
      }
      return [];
    } catch (error) {
      console.log('Error in getAllDistricts:', error);
      throw error;
    }
  }

  async getDealTypes(): Promise<CommonType[]> {
    const query_text = 'SELECT * FROM deal_types';
    try {
      const response = await this.dbService.query(query_text, []);
      if (Array.isArray(response) && response.length) {
        return response;
      }
      return [];
    } catch (error) {
      console.log('Error in getDealTypes:', error);
      throw error;
    }
  }

  async getReSeries(): Promise<CommonType[]> {
    const query_text = 'SELECT * FROM re_series';
    try {
      const response = await this.dbService.query(query_text, []);
      if (Array.isArray(response) && response.length) {
        return response;
      }
      return [];
    } catch (error) {
      console.log('Error in getReSeries:', error);
      throw error;
    }
  }

  async getHeatings(): Promise<CommonType[]> {
    const query_text = 'SELECT * FROM re_heatings';
    try {
      const response = await this.dbService.query(query_text, []);
      if (Array.isArray(response) && response.length) {
        return response;
      }
      return [];
    } catch (error) {
      console.log('Error in getHeatings:', error);
      throw error;
    }
  }

  async getWallMaterials(): Promise<CommonType[]> {
    const query_text = 'SELECT * FROM wall_materials';
    try {
      const response = await this.dbService.query(query_text, []);
      if (Array.isArray(response) && response.length) {
        return response;
      }
      return [];
    } catch (error) {
      console.log('Error in getWallMaterials:', error);
      throw error;
    }
  }

  async getReDocuments(): Promise<CommonType[]> {
    const query_text = 'SELECT * FROM documents';
    try {
      const response = await this.dbService.query(query_text, []);
      if (Array.isArray(response) && response.length) {
        return response;
      }
      return [];
    } catch (error) {
      console.log('Error in getReDocuments:', error);
      throw error;
    }
  }
}
