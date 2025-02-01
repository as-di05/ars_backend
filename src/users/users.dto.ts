import { IsEmpty, IsInt, IsNumber, IsString, MinLength } from 'class-validator';

export class UpdatePasswordDto {
  @IsEmpty()
  @IsNumber()
  userId?: number;

  @IsString()
  @MinLength(6, {
    message: 'Current password must be at least 6 characters long',
  })
  currentPassword: string;

  @IsString()
  @MinLength(6, { message: 'New password must be at least 6 characters long' })
  newPassword: string;
}

export interface UserBdDto {
  id: number;
  login: string;
  password_hash: string;
  role_id: number;
  first_name: string;
  last_name: string;
  phone_number: string;
}

export interface UserDto {
  id: number;
  roleId: number;
  login: string;
  firstName: string;
  lastName: string;
  phoneNumber: string;
  avatarUrl?: string;
}

export interface FullUserDto extends UserDto {
  userName?: string;
}
export class CreateUserDto {
  @IsString()
  login: string;

  @IsString()
  password: string;

  @IsString()
  firstName: string;

  @IsString()
  lastName: string;

  @IsString()
  phoneNumber: string;

  @IsInt()
  roleId: number;
}

export class UpdateUserDto {
  @IsString()
  login: string;

  @IsString()
  firstName: string;

  @IsString()
  lastName: string;

  @IsString()
  phoneNumber: string | null;

  @IsNumber()
  roleId: number;
}
