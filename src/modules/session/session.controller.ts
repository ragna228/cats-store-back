import { Body, Controller, Get, Post, UseGuards } from '@nestjs/common';

import { RefreshDto } from './dto/refresh.dto';
import { SessionDto } from './dto/session.dto';
import { Session } from './models/session.model';
import {
  ApiBearerAuth,
  ApiOperation,
  ApiResponse,
  ApiTags,
} from '@nestjs/swagger';
import { ISessionService } from '../../interfaces/i-session.service';
import { ErrorType } from '../../utils/error.type';
import { RolesGuard } from '../../utils/gurads/user.guard';
import { GetPayload } from '../../utils/decorators/user.decorator';
import { AccessTokenDto } from '../extra/jwt/access-token.dto';

@ApiTags('Сессии')
@ApiBearerAuth()
@Controller('session')
export class SessionController {
  constructor(private sessionService: ISessionService) {}

  @ApiOperation({ summary: 'Обновить токен' })
  @ApiResponse({ status: 201 })
  @ApiResponse({ status: 400, type: ErrorType })
  @Post('/refresh')
  async refreshToken(@Body() dto: RefreshDto) {
    return this.sessionService.refreshToken(dto);
  }

  @ApiOperation({ summary: 'Удалить сессию' })
  @ApiResponse({ status: 201 })
  @ApiResponse({ status: 400, type: ErrorType })
  @UseGuards(RolesGuard)
  @Post('/remove')
  async remove(@Body() dto: SessionDto, @GetPayload() payload: AccessTokenDto) {
    return this.sessionService.removeToken(payload.id, dto.sessionName);
  }

  @ApiOperation({ summary: 'Информация о сессиях' })
  @ApiResponse({ status: 201, type: [Session] })
  @ApiResponse({ status: 400, type: ErrorType })
  @UseGuards(RolesGuard)
  @Get('/')
  async list(@GetPayload() payload: AccessTokenDto) {
    return this.sessionService.getUserSessions(payload.id);
  }
}
