import { Controller } from '@nestjs/common';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';

@Controller('cart')
@ApiTags('Корзина')
@ApiBearerAuth()
export class CartController {}
