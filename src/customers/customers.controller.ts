import {
  Body,
  Controller,
  Get,
  Post,
  Query,
  Req,
  UseGuards,
} from '@nestjs/common';
import { CustomersService } from './customers.service';
import { JwtAuthGuard } from 'src/auth/jwt.auth.quard';
import { ApiResponseDto } from 'src/common/common.dto';
import {
  CustomerObjectDto,
  GetCustomersObjectQueryDto,
  InputCustomerDto,
  InputStatusCustomerDto,
} from './customers.dto';

@Controller('customers')
@UseGuards(JwtAuthGuard)
export class CustomersController {
  constructor(private readonly customersService: CustomersService) {}

  @Post('create')
  async createCustomersObject(
    @Req() req: any,
    @Body() input: InputCustomerDto,
  ): Promise<ApiResponseDto> {
    const { userId } = req.user;
    return this.customersService.createCustomersObject(userId, input);
  }

  @Post('update-status')
  async updateStatusCustomerObject(
    @Req() req: any,
    @Body() input: InputStatusCustomerDto,
  ): Promise<ApiResponseDto> {
    const { userId } = req.user;
    return this.customersService.updateStatusCustomerObject(userId, input);
  }

  @Get()
  async getCustomersObjects(
    @Req() req: any,
    @Query() query: GetCustomersObjectQueryDto,
  ): Promise<CustomerObjectDto[]> {
    const { userId, roleId } = req.user;
    return this.customersService.getCustomersObjects(userId, query);
  }
}
