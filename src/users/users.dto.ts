import { IsEmpty, IsNumber, IsString, MinLength } from 'class-validator';

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
  firstName: string;
  lastName: string;
  phoneNumber: string;
  avatarUrl?: string;
}

export interface FullUserDto extends UserDto {
  userName?: string;
}

export class CreateUserDto {
  login: string;
  password: string;
  firstName: string;
  lastName: string;
  phoneNumber?: string;
  roleId?: number;
}

export class UpdateUserDto {
  @IsString()
  @MinLength(3, {
    message: 'Login must be at least 3 characters long',
  })
  login: string;

  @IsString()
  @MinLength(3, {
    message: 'The user firstName must be at least 3 characters long',
  })
  firstName: string;

  @IsString()
  @MinLength(3, {
    message: 'The user lastName must be at least 3 characters long',
  })
  lastName: string;

  @IsString()
  @MinLength(13, {
    message:
      "The user's phoneNumber must be at least 13 characters long and must have a + sign",
  })
  phoneNumber: string | null;

  @IsNumber()
  roleId: number;
}
