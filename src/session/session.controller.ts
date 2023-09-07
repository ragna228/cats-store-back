import { Body, Controller, Post, UseGuards } from '@nestjs/common';
import { SessionService } from './session.service';
import { RolesGuard } from '../utils/gurads/user.guard';
import { GetUser } from '../utils/decorators/user.decorator';
import { User } from '../user/models/user.model';
import {
  ApiBearerAuth,
  ApiOperation,
  ApiResponse,
  ApiTags,
} from '@nestjs/swagger';
import { RefreshTokenDto } from './dto/refresh-token.dto';
import { ErrorType } from '../utils/errors/error.type';
import { SessionDto } from './dto/session.dto';

@ApiTags('Сессии')
@ApiBearerAuth()
@Controller('session')
export class SessionController {
  constructor(private sessionService: SessionService) {}

  @ApiOperation({ summary: 'Обновить токен' })
  @ApiResponse({ status: 201 })
  @ApiResponse({ status: 400, type: ErrorType })
  @Post('/refresh')
  async refreshToken(@Body() dto: RefreshTokenDto) {
    return this.sessionService.refreshToken(dto);
  }

  @ApiOperation({ summary: 'Удалить сессию' })
  @ApiResponse({ status: 201 })
  @ApiResponse({ status: 400, type: ErrorType })
  @UseGuards(RolesGuard)
  @Post('/remove')
  async remove(@Body() dto: SessionDto, @GetUser() user: User) {
    return this.sessionService.removeToken(dto, user);
  }
}
