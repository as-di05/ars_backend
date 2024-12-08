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

@Controller('users')
@UseGuards(JwtAuthGuard)
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Post('register')
  async registerUser(@Req() req: any, @Body() createUserDto: CreateUserDto) {
    const { roleId } = req.user;
    return this.usersService.createUser(roleId, createUserDto);
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
    const { userId, roleId } = req.user;

    if (
      updatePasswordDto.userId &&
      roleId > 1 &&
      updatePasswordDto.userId !== userId
    ) {
      throw new ForbiddenException('Access denied!');
    }
    return this.usersService.updatePassword(
      updatePasswordDto.userId ?? userId,
      updatePasswordDto,
    );
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
