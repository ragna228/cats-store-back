import { Body, Controller, Get, Put, UseGuards } from '@nestjs/common';
import {
  ApiBearerAuth,
  ApiOperation,
  ApiResponse,
  ApiTags,
} from '@nestjs/swagger';
import { ErrorType } from '../../utils/error.type';
import { RolesGuard } from '../../utils/gurads/user.guard';
import { Cart } from './models/cart.model';
import { GetPayload } from '../../utils/decorators/user.decorator';
import { AccessTokenDto } from '../extra/jwt/access-token.dto';
import { SuccessOperationDto } from '../../utils/success-operation.dto';
import { CartOperationDto } from './dto/cart-operation.dto';
import { ICartService } from '../../interfaces/i-cart.service';

@Controller('cart')
@ApiTags('Корзина')
@ApiBearerAuth()
export class CartController {
  constructor(private cartService: ICartService) {}
  @ApiOperation({ summary: 'Список корзины' })
  @ApiResponse({ status: 201, type: [Cart] })
  @ApiResponse({ status: 400, type: ErrorType })
  @UseGuards(RolesGuard)
  @Get('/')
  async getAll(@GetPayload() payload: AccessTokenDto) {
    return this.cartService.getAll(payload.id);
  }

  @ApiOperation({ summary: 'Добавить в корзину' })
  @ApiResponse({ status: 201, type: SuccessOperationDto })
  @ApiResponse({ status: 400, type: ErrorType })
  @UseGuards(RolesGuard)
  @Put('/addToCart')
  async addToCart(
    @GetPayload() payload: AccessTokenDto,
    @Body() dto: CartOperationDto,
  ) {
    return this.cartService.addToCart(dto.catId, payload.id);
  }
  @ApiOperation({ summary: 'удалить из корзины' })
  @ApiResponse({ status: 201, type: SuccessOperationDto })
  @ApiResponse({ status: 400, type: ErrorType })
  @UseGuards(RolesGuard)
  @Put('/removeFromCart')
  async removeFromCart(
    @GetPayload() payload: AccessTokenDto,
    @Body() dto: CartOperationDto,
  ) {
    return this.cartService.removeFromCart(dto.catId, payload.id);
  }

  @ApiOperation({ summary: 'Очистить корзину' })
  @ApiResponse({ status: 201, type: SuccessOperationDto })
  @ApiResponse({ status: 400, type: ErrorType })
  @UseGuards(RolesGuard)
  @Put('/clear')
  async clear(@GetPayload() payload: AccessTokenDto) {
    return this.cartService.clear(payload.id);
  }
}
