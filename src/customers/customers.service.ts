import { Injectable } from '@nestjs/common';
import { DatabaseService } from 'src/db/database.service';
import {
  CustomerObjectDto,
  GetCustomersObjectQueryDto,
  InputCustomerDto,
  InputCustomerPriceDto,
  InputStatusCustomerDto,
} from './customers.dto';
import { ApiResponseDto } from 'src/common/common.dto';

@Injectable()
export class CustomersService {
  constructor(private readonly dbService: DatabaseService) {}

  async createCustomersObject(
    userId: number,
    input: InputCustomerDto,
  ): Promise<ApiResponseDto> {
    if (
      !input.categoryId ||
      !userId ||
      !input.customerName ||
      !input.customerPhone
    ) {
      return { status: false, message: 'Missing required fields' };
    }
    let query_text = `
        INSERT INTO customers_objects (
            category_id, 
            employee_id, 
            customer_name, 
            customer_phone, 
            id_district,
            description
        ) 
        VALUES (?, ?, ?, ?, ?, ?)
      `;
    try {
      const res = await this.dbService.query(query_text, [
        input.categoryId,
        userId,
        input.customerName ?? null,
        input.customerPhone ?? null,
        input.idDistrict ?? null,
        input.description ?? null,
      ]);

      const idCustomerObj = res?.insertId ?? null;
      if (idCustomerObj && (input.startPrice || input.endPrice)) {
        await this.insertNewPrice({
          idCustomerObj,
          startPrice: input.startPrice ?? null,
          endPrice: input.endPrice ?? null,
          currency: input.currency ?? 'KGS',
        });
      }
      return { status: true, message: 'Customer object created successfully' };
    } catch (err) {
      console.log('Error in createRealEstate', err);
      return { status: false, message: 'Failed to create real estate' };
    }
  }

  async insertNewPrice(input: InputCustomerPriceDto): Promise<ApiResponseDto> {
    if (!input.idCustomerObj) {
      return { status: false, message: 'ID Customer object not found' };
    }
    const query_text = `
          INSERT INTO customer_obj_prices (id_customer_obj, start_price, end_price, currency) 
          VALUES (?, ?, ?, ?)
    `;
    try {
      await this.dbService.query(query_text, [
        input.idCustomerObj,
        input.startPrice,
        input.endPrice,
        input.currency,
      ]);
      return {
        status: true,
        message: 'Customer object price inserted successfully',
      };
    } catch (err) {
      console.log('Error in insertNewPrice', err);
    }
  }

  async updateStatusCustomerObject(
    userId: number,
    input: InputStatusCustomerDto,
  ): Promise<ApiResponseDto> {
    if (!input.id || !input.statusId || !userId) {
      return { status: false, message: 'ID not found' };
    }
    let query_text = `SELECT id_status FROM customers_objects WHERE id = ? AND employee_id = ?`;
    try {
      const res = await this.dbService.query(query_text, [input.id, userId]);
      if (
        !Array.isArray(res) ||
        !res.length ||
        res[0]?.id_status === input.statusId
      ) {
        return { status: false, message: 'Internal Server Error!' };
      }
      query_text = `UPDATE customers_objects SET id_status = ?, status_updated_at = NOW() WHERE id = ?`;
      await this.dbService.query(query_text, [input.statusId, input.id]);
      return {
        status: true,
        message: 'Customer object status successfully change',
      };
    } catch (err) {
      console.log('Error in updateStatusCustomerObject', err);
    }
  }

  async getCustomersObjects(
    userId: number,
    params: GetCustomersObjectQueryDto,
  ): Promise<CustomerObjectDto[]> {
    const { users, id, search, filter, onlyMy } = params;
    let otherFilters: string[] = [];
    let queryParams: any[] = [];

    if (filter?.customerName) {
      otherFilters.push('co.customer_name LIKE ?');
      queryParams.push(`%${filter.customerName}%`);
    }
    if (filter?.customerPhone) {
      otherFilters.push('co.customer_phone = ?');
      queryParams.push(filter.customerPhone);
    }
    if (filter?.districtId) {
      otherFilters.push('co.id_district = ?');
      queryParams.push(filter.districtId);
    }
    if (filter?.categoryId) {
      otherFilters.push('co.category_id = ?');
      queryParams.push(filter.categoryId);
    }

    let searchFilter = '';
    // if (typeof search === 'string' && search.length > 0) {
    //   const textSearch = transformSearchText(search);
    //   searchFilter = `
    //       (co.id LIKE ? OR
    //        co.customer_name LIKE ? OR
    //        co.description LIKE ?
    //       )
    //     `;
    //   queryParams.push(`%${textSearch}%`, `%${textSearch}%`, `%${textSearch}%`);
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
    if (typeof id === 'number') {
      filters = filters ? `${filters} AND co.id = ?` : `WHERE co.id = ?`;
      queryParams.push(id);
    }
    if (onlyMy === 'true') {
      filters = filters
        ? `${filters} AND co.employee_id = ?`
        : `WHERE co.employee_id = ?`;
      queryParams.push(userId);
    }

    let sortColumn = 'co.created_at';
    const allowedSortColumns: { [key: string]: string } = {
      created: 'co.created_at',
      lastUpdated: 'co.updated_at',
    };
    if (searchFilter.length > 0) {
      sortColumn = `co.id, co.customer_name, co.description`;
    } else if (params.sortColumn && allowedSortColumns[params.sortColumn]) {
      sortColumn = allowedSortColumns[params.sortColumn];
    }

    const query = `
        SELECT 
            co.id, 
            JSON_OBJECT(
                'id', c.id,
                'label', c.label
            ) AS category,
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
            co.customer_phone AS customerPhone, 
            co.customer_name AS customerName, 
            co.id_status AS idStatus, 
            co.status_updated_at AS statusUpdatedAt, 
            co.created_at AS createdAt, 
            co.updated_at AS updatedAt, 
            co.description,
            (SELECT JSON_ARRAYAGG(
                JSON_OBJECT(
                    'id', op.id,
                    'startPrice', op.start_price,
                    'endPrice', op.end_price,
                    'currency', op.currency,
                    'createdAt', op.created_at,
                    'updatedAt', op.updated_at
                )
            ) FROM customer_obj_prices op
            WHERE op.id_customer_obj = co.id
            ) AS prices
        FROM customers_objects co
        INNER JOIN users u ON u.id = co.employee_id
        INNER JOIN categories c ON c.id = co.category_id
        LEFT JOIN districts d ON d.id = co.id_district
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
      console.log('Error in getCustomersObjects:', error);
    }
  }
}
