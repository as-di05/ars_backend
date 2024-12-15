import { Injectable } from '@nestjs/common';
import { DatabaseService } from 'src/db/database.service';
import {
  InputPriceDto,
  InputRealEstateDto,
  RealEstateDto,
} from './real_estate.dto';
import { ApiResponseDto } from 'src/common/common.dto';

@Injectable()
export class RealEstateService {
  constructor(private readonly dbService: DatabaseService) {}

  async createRealEstate(
    userId: number,
    input: InputRealEstateDto,
  ): Promise<ApiResponseDto> {
    const query_text = `
        INSERT INTO real_estate_objects (
            category_id, 
            employee_id, 
            owner_name, 
            owner_phone, 
            id_room,
            area,
            id_floor,
            id_series,
            district,
            id_deal_type,
            id_wall_material,
            description
        ) 
        VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
      `;
    try {
      const res = await this.dbService.query(query_text, [
        input.categoryId,
        userId,
        input.ownerName ?? null,
        input.ownerPhone ?? null,
        input.idRoom ?? null,
        input.area ?? null,
        input.idFloor ?? null,
        input.idSeries ?? null,
        input.district ?? null,
        input.idDealType ?? null,
        input.idWallMaterial ?? null,
        input.description ?? null,
      ]);

      const idRealEstate = res?.insertId ?? null;
      if (idRealEstate && input.price) {
        await this.insertNewPrice({
          idRealEstate,
          ownerPrice: input.price.ownerPrice ?? null,
          objectPrice: input.price.objectPrice ?? null,
          currency: input.price.currency ?? 'KGS',
        });
      }
      if (idRealEstate && input.documents && input.documents.length > 0) {
        await this.insertDocumentsToRe({
          idRealEstate,
          documents: input.documents,
        });
      }
      return { status: true, message: 'Real estate created successfully' };
    } catch (err) {
      console.log('Error in createRealEstate', err);
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
    if (input.district?.length) {
      updates.push('district = ?');
      params.push(input.district);
    }
    if (input.idDealType) {
      updates.push('id_deal_type = ?');
      params.push(input.idDealType);
    }
    if (input.idWallMaterial) {
      updates.push('id_wall_material = ?');
      params.push(input.idWallMaterial);
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
    users?: number[],
  ): Promise<RealEstateDto[]> {
    let filterPrice = 'NULL AS prices';
    if (roleId === 1) {
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
    }
    const query = `
        SELECT 
            re.id, 
            re.id_floor AS idFloor, 
            re.id_series AS idSeries, 
            re.id_room AS idRoom, 
            re.id_deal_type AS idDealType, 
            re.id_wall_material AS idWallMaterial, 
            re.owner_phone AS ownerPhone, 
            re.owner_name AS ownerName, 
            re.id_status AS idStatus, 
            re.status_updated_at AS statusUpdatedAt, 
            re.created_at AS createdAt, 
            re.updated_at AS updatedAt, 
            re.area, 
            re.district, 
            re.description,
             (SELECT JSON_ARRAYAGG(
                    JSON_OBJECT(
                        'id', d.id,
                        'label', d.label
                    )
                ) FROM re_documents rd
                INNER JOIN documents d ON d.id = rd.id_document
                WHERE rd.id_real_estate = re.id
            ) AS documents,
            ${filterPrice}
        FROM real_estate_objects re
        INNER JOIN users u ON u.id = re.employee_id
        INNER JOIN categories c ON c.id = re.category_id
    `;
    try {
      const res = await this.dbService.query(query, []);
      if (Array.isArray(res) && res.length) {
        return res;
      }
      return [];
    } catch (error) {
      console.log('Error is getCategories:', error);
    }
  }
}
