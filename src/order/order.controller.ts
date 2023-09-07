import { Controller } from '@nestjs/common';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';

@Controller('order')
@ApiTags('Заказы')
@ApiBearerAuth()
export class OrderController {}
