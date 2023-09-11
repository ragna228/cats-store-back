import { Body, Controller, Get, Post, UseGuards } from '@nestjs/common';
import { RolesGuard } from '../utils/gurads/user.guard';
import { GetPayload } from '../utils/decorators/user.decorator';
import {
  ApiBearerAuth,
  ApiOperation,
  ApiResponse,
  ApiTags,
} from '@nestjs/swagger';
import { RefreshTokenDto } from './dto/refresh-token.dto';
import { ErrorType } from '../utils/errors/error.type';
import { SessionDto } from './dto/session.dto';
import { ISessionService } from '../utils/serivces/i-session.service';
import { InfoTokenDto } from '../utils/info-token.dto';
import { Session } from './models/session.model';

@ApiTags('Сессии')
@ApiBearerAuth()
@Controller('session')
export class SessionController {
  constructor(private sessionService: ISessionService) {}

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
  async remove(@Body() dto: SessionDto, @GetPayload() payload: InfoTokenDto) {
    return this.sessionService.removeToken(payload.id, dto.sessionName);
  }

  @ApiOperation({ summary: 'Информация о сессиях' })
  @ApiResponse({ status: 201, type: [Session] })
  @ApiResponse({ status: 400, type: ErrorType })
  @UseGuards(RolesGuard)
  @Get('/')
  async list(@GetPayload() payload: InfoTokenDto) {
    return this.sessionService.getUserSessions(payload.id);
  }
}
