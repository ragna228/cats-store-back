import { Body, Controller, Get, Post, Put, UseGuards } from '@nestjs/common';
import {
  ApiBearerAuth,
  ApiOperation,
  ApiResponse,
  ApiTags,
} from '@nestjs/swagger';
import { IOrderService } from '../../interfaces/i-order.service';
import { ErrorType } from '../../utils/error.type';
import { RolesGuard } from '../../utils/gurads/user.guard';
import { Roles } from '../../utils/decorators/auth.decorator';
import { RowDto } from '../../utils/row.dto';
import { Order } from './models/order.model';
import { GetPayload } from '../../utils/decorators/user.decorator';
import { AccessTokenDto } from '../extra/jwt/access-token.dto';

@Controller('order')
@ApiTags('Заказы')
@ApiBearerAuth()
export class OrderController {
  constructor(private orderService: IOrderService) {}

  @ApiOperation({ summary: 'Список всех заказов' })
  @ApiResponse({ status: 200, type: [Order] })
  @ApiResponse({ status: 400, type: ErrorType })
  @UseGuards(RolesGuard)
  @Roles('ADMIN')
  @Post('/')
  async list(@Body() dto: RowDto) {
    return this.orderService.getAll(dto);
  }

  @ApiOperation({ summary: 'История' })
  @ApiResponse({ status: 200, type: [Order] })
  @ApiResponse({ status: 400, type: ErrorType })
  @UseGuards(RolesGuard)
  @Get('/history')
  async history(@GetPayload() payload: AccessTokenDto) {
    return this.orderService.history(payload.id);
  }

  @ApiOperation({ summary: 'Купить корзину' })
  @ApiResponse({ status: 200, type: Order })
  @ApiResponse({ status: 400, type: ErrorType })
  @UseGuards(RolesGuard)
  @Put('/buy')
  async buyCart(@GetPayload() payload: AccessTokenDto) {
    return this.orderService.buyCart(payload.id);
  }
}
