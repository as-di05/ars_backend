import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  UseGuards,
  Req,
  Put,
  ForbiddenException,
  UploadedFiles,
  UseInterceptors,
  UploadedFile,
  BadRequestException,
  Delete,
} from '@nestjs/common';
import { UsersService } from './users.service';
import { JwtAuthGuard } from 'src/auth/jwt.auth.quard';
import {
  CreateUserDto,
  UpdatePasswordDto,
  UpdateUserDto,
  UserDto,
} from './users.dto';
import { ApiResponseDto } from 'src/common/common.dto';
import { FileInterceptor } from '@nestjs/platform-express';

@Controller('users')
// @UseGuards(JwtAuthGuard)
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Post('register')
  @UseInterceptors(FileInterceptor('avatar'))
  async registerUser(
    @Req() req: any,
    @UploadedFile() avatar?: Express.Multer.File,
    @Body('userData') userData?: string,
  ) {
    if (!userData) {
      throw new BadRequestException('User data is required');
    }
    const createUserDto: CreateUserDto = JSON.parse(userData);
    const { roleId } = req.user;
    return this.usersService.createUser(roleId, createUserDto, avatar);
  }

  @Get()
  async getAllUsers(): Promise<UserDto[]> {
    return this.usersService.getAllUsers();
  }

  @Put(':id')
  async updateUser(
    @Req() req: any,
    @Param('id') id: number,
    @Body() updateUserDto: UpdateUserDto,
  ): Promise<ApiResponseDto> {
    const { userId, roleId } = req.user;

    if (!Number(id) || (roleId > 1 && Number(id) !== userId)) {
      throw new ForbiddenException('Access denied!');
    }
    return this.usersService.updateUser(Number(id), updateUserDto);
  }

  @Put('update-password')
  async updatePassword(
    @Req() req: any,
    @Body() updatePasswordDto: UpdatePasswordDto,
  ): Promise<ApiResponseDto> {
    console.log(updatePasswordDto, '-------------')
    // const { userId, roleId } = req.user;

    // if (
    //   updatePasswordDto.userId &&
    //   roleId > 1 &&
    //   updatePasswordDto.userId !== userId
    // ) {
    //   throw new ForbiddenException('Access denied!');
    // }
    return this.usersService.updatePassword(
      updatePasswordDto.userId ?? 1,
      updatePasswordDto,
    );
  }

  @Delete(':id')
  async deleteUser(
    @Req() req: any,
    @Param('id') id: string,
  ): Promise<ApiResponseDto> {
    const { userId, roleId } = req.user;
    if (roleId !== 1 || userId === +id) {
      throw new ForbiddenException('Access denied!');
    }
    const employeeId = parseInt(id, 10);
    if (isNaN(employeeId)) {
      return { status: false, message: 'Invalid User ID' };
    }
    return this.usersService.deleteUserById(employeeId);
  }

  @Get('/me')
  async getMe(@Req() req: any): Promise<UserDto> {
    const { userId, roleId } = req.user;
    return this.usersService.getUser(+userId, roleId === 1);
  }

  @Get(':id')
  async getUser(@Req() req: any, @Param('id') id: number): Promise<UserDto> {
    const { userId, roleId } = req.user;
    if (id && roleId > 1 && userId !== +id) {
      throw new ForbiddenException('Access denied!');
    }
    return this.usersService.getUser(+id, roleId === 1);
  }
}
