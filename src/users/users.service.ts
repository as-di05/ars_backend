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

@Injectable()
export class UsersService {
  constructor(private readonly dbService: DatabaseService) {}

  async createUser(adminRoleId: number, createUserDto: CreateUserDto) {
    if (adminRoleId !== 1) {
      throw new ForbiddenException(
        'Access denied. Only admins can create users.',
      );
    }
    if (createUserDto.roleId === 1) {
      throw new ForbiddenException('Access denied!');
    }
    const query_text = `
        INSERT INTO users (login, password_hash, role_id, first_name, last_name, phone_number) 
        VALUES (?, ?, ?, ?, ?, ?)
    `;
    try {
      const hashedPassword = await bcrypt.hash(createUserDto.password, 10);
      await this.dbService.query(query_text, [
        createUserDto.login,
        hashedPassword,
        createUserDto.roleId ?? 3,
        createUserDto.firstName,
        createUserDto.lastName,
        createUserDto.phoneNumber,
      ]);
      return { message: 'User created successfully' };
    } catch (err) {
      console.log('Error in createUser', err);
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
        first_name AS firstName,
        last_name AS lastName,
        phone_number AS phoneNumber,
        JSON_OBJECT(
          'id', r.id,
          'label', name
        ) AS role
      FROM users u
      INNER JOIN roles r ON r.id = u.role_id
    `;
    const res = await this.dbService.query(query);
    if (Array.isArray(res) && res.length) {
      return res;
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
        return res[0];
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
      if (user && user.id) {
        return user;
      }
      return null;
    } catch (error) {
      throw new Error('User is not found!');
    }
  }
}
