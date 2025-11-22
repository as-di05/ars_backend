import {
  BadRequestException,
  ForbiddenException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { DatabaseService } from '../db/database.service';
import {
  CreateUserDto,
  FullUserDto,
  UpdatePasswordDto,
  UpdateUserDto,
  UserBdDto,
  UserDto,
} from './users.dto';
import * as bcrypt from 'bcrypt';
import { ApiResponseDto } from 'src/common/common.dto';
import * as sharp from 'sharp';
import * as fs from 'fs';
import * as path from 'path';
import * as AWS from 'aws-sdk';

const s3 = new AWS.S3();

@Injectable()
export class UsersService {
  constructor(private readonly dbService: DatabaseService) {}

  async createUser(
    adminRoleId: number,
    createUserDto: CreateUserDto,
    avatarFile?: Express.Multer.File,
  ): Promise<ApiResponseDto> {
    if (adminRoleId !== 1) {
      throw new ForbiddenException(
        'Access denied. Only admins can create users.',
      );
    }

    if (!createUserDto || Object.keys(createUserDto).length === 0) {
      return {
        status: false,
        message: 'Invalid request. User data is required.',
      };
    }

    if (createUserDto.roleId === 1) {
      throw new ForbiddenException('Access denied!');
    }

    if (!createUserDto.password) {
      return {
        status: false,
        message: 'Password is required',
      };
    }

    let avatarUrl = null;
    if (avatarFile) {
      const fileExtension = avatarFile.mimetype.split('/')[1];
      const fileName = `${Date.now()}-${createUserDto.login}.${fileExtension}`;

      try {
        const compressedImage = await sharp(avatarFile.buffer)
          .resize({ width: 150, height: 150 })
          .jpeg({ quality: 80 })
          .toBuffer();

        const uploadResult = await s3
          .upload({
            Bucket: process.env.AWS_S3_BUCKET,
            Key: `avatars/${fileName}`,
            Body: compressedImage,
            ContentType: avatarFile.mimetype,
            // ACL: 'public-read',
          })
          .promise();

        avatarUrl = uploadResult.Location;
      } catch (error) {
        console.error('Error processing avatar:', error);
        return {
          status: false,
          message: 'Error processing avatar image',
        };
      }
    }

    const queryText = `
      INSERT INTO users (login, password_hash, role_id, first_name, last_name, phone_number, avatar_url) 
      VALUES (?, ?, ?, ?, ?, ?, ?)
    `;

    try {
      const hashedPassword = await bcrypt.hash(createUserDto.password, 10);
      await this.dbService.query(queryText, [
        createUserDto.login,
        hashedPassword,
        createUserDto.roleId ?? 3,
        createUserDto.firstName,
        createUserDto.lastName,
        createUserDto.phoneNumber,
        avatarUrl,
      ]);

      return { status: true, message: 'User created successfully' };
    } catch (err) {
      console.error('Error in createUser', err);
      return { status: false, message: 'Error creating user' };
    }
  }

  async updatePassword(
    userId: number,
    updatePasswordDto: UpdatePasswordDto,
  ): Promise<ApiResponseDto> {
    const { currentPassword, newPassword } = updatePasswordDto;
    let query_text = `
        SELECT password_hash
        FROM users
        WHERE id = ?
    `;
    try {
      const res = await this.dbService.query(query_text, [userId]);
      if (!Array.isArray(res) || !res.length) {
        return new ApiResponseDto(false, 'User not found', null, userId);
      }

      const passwordMatch = await bcrypt.compare(
        currentPassword,
        res[0].password_hash,
      );
      if (!passwordMatch) {
        return new ApiResponseDto(
          false,
          'Current password is incorrect',
          null,
          userId,
        );
      }
      const hashedPassword = await bcrypt.hash(newPassword, 10);

      query_text = `UPDATE users SET password_hash = ? WHERE id = ?`;
      await this.dbService.query(query_text, [hashedPassword, userId]);

      return new ApiResponseDto(
        true,
        'Password updated successfully',
        null,
        userId,
      );
    } catch (error) {
      return new ApiResponseDto(
        false,
        'Error is updatePassword:',
        error.response,
        userId,
      );
    }
  }

  async getAllUsers(): Promise<UserDto[]> {
    const query = `
      SELECT 
        u.id,
        login,
        first_name AS firstName,
        last_name AS lastName,
        phone_number AS phoneNumber,
        avatar_url AS avatarUrl,
        JSON_OBJECT(
          'id', r.id,
          'label', name
        ) AS role
      FROM users u
      INNER JOIN roles r ON r.id = u.role_id
      ORDER BY u.id ASC
    `;
    const res = await this.dbService.query(query);
    if (Array.isArray(res) && res.length) {
      // Парсим JSON строки role в объекты
      return res.map(user => {
        if (user.role && typeof user.role === 'string') {
          try {
            user.role = JSON.parse(user.role);
          } catch (e) {
            console.error('Error parsing role JSON:', e);
          }
        }
        return user;
      });
    }
    return [];
  }

  async getUser(userId: number, isFullView?: boolean): Promise<FullUserDto> {
    let extendFields = '';
    if (isFullView === true) {
      extendFields = 'login AS userName,';
    }
    const query = `
      SELECT 
        u.id,
        ${extendFields}
        first_name AS firstName,
        last_name AS lastName,
        phone_number AS phoneNumber,
        avatar_url AS avatarUrl,
        JSON_OBJECT(
          'id', r.id,
          'label', name
        ) AS role
      FROM users u
      INNER JOIN roles r ON r.id = u.role_id
      WHERE u.id = ?
    `;
    try {
      const res = await this.dbService.query(query, [userId]);
      if (Array.isArray(res) && res.length) {
        const user = res[0];
        // Парсим JSON строку role в объект, если она пришла как строка
        if (user.role && typeof user.role === 'string') {
          try {
            user.role = JSON.parse(user.role);
          } catch (e) {
            console.error('Error parsing role JSON:', e);
          }
        }
        return user;
      }
      return null;
    } catch (error) {
      console.log('Error is getUser:', error);
    }
  }

  async updateUser(
    userId: number,
    updateUserDto: UpdateUserDto,
  ): Promise<ApiResponseDto> {
    const { login, firstName, lastName, phoneNumber, roleId } = updateUserDto;
    let query_text = `SELECT id FROM users WHERE id = ?`;
    try {
      const res = await this.dbService.query(query_text, [userId]);
      if (!Array.isArray(res) || !res.length) {
        return new ApiResponseDto(false, 'User not found', null, userId);
      }

      query_text = `
        UPDATE users SET 
          login = ?,
          role_id = ?,
          first_name = ?,
          ${phoneNumber ? `phone_number = ${phoneNumber},` : ''}
          last_name = ?
        WHERE id = ?
      `;
      await this.dbService.query(query_text, [
        login,
        roleId,
        firstName,
        lastName,
        userId,
      ]);

      return new ApiResponseDto(true, '', null, userId);
    } catch (error) {
      return new ApiResponseDto(
        false,
        'Error is updateUser:',
        error.response,
        userId,
      );
    }
  }

  async getUserByLogin(login: string): Promise<UserBdDto> {
    const query = `SELECT * FROM users  WHERE login = ?`;
    try {
      const [user] = await this.dbService.query(query, [login]);
      if (!user || !user.id) {
        throw new Error('User is not found!');
      }
      return user;
    } catch (error) {
      throw new Error('User is not found!');
    }
  }

  async deleteUserById(userId: number): Promise<ApiResponseDto> {
    if (!userId) {
      return { status: false, message: 'User ID is required' };
    }
    const queryText = `DELETE FROM users WHERE id = ?`;
    try {
      const result = await this.dbService.query(queryText, [userId]);
      if (result.affectedRows === 0) {
        return { status: false, message: 'User not found' };
      }
      return { status: true, message: 'User deleted successfully' };
    } catch (error) {
      console.error('Error in deleteUserById:', error);
      return { status: false, message: 'Error deleting user' };
    }
  }
}
