import { Body, Controller, Get, Post, UseGuards } from '@nestjs/common';
import {
  ApiBearerAuth,
  ApiOperation,
  ApiResponse,
  ApiTags,
} from '@nestjs/swagger';
import { LanguagesService } from './languages.service';
import { ErrorType } from '../../utils/error.type';
import { CreateLanguageDto } from './dto/create-language.dto';
import { LanguagesCreationAttributes } from './languages.model';
import { UpdateLanguagesDto } from './dto/update-languages.dto';
import { RolesGuard } from '../../utils/gurads/user.guard';

@Controller('languages')
@ApiBearerAuth()
@ApiTags('Локализация')
export class LanguagesController {
  constructor(private languagesService: LanguagesService) {}

  @ApiOperation({ summary: 'Создать запись' })
  @ApiResponse({ status: 201, type: LanguagesCreationAttributes })
  @ApiResponse({ status: 400, type: ErrorType })
  @Post('/create')
  @UseGuards(RolesGuard)
  async create(@Body() dto: CreateLanguageDto) {
    return this.languagesService.create(dto);
  }

  @ApiOperation({ summary: 'Обновить запись' })
  @ApiResponse({ status: 201, type: LanguagesCreationAttributes })
  @ApiResponse({ status: 400, type: ErrorType })
  @Post('/update')
  @UseGuards(RolesGuard)
  async update(@Body() dto: UpdateLanguagesDto) {
    return this.languagesService.update(dto);
  }
  @ApiOperation({ summary: 'Получить все записи' })
  @ApiResponse({ status: 201, type: [LanguagesCreationAttributes] })
  @ApiResponse({ status: 400, type: ErrorType })
  @Get('/')
  @UseGuards(RolesGuard)
  async getAll() {
    return this.languagesService.getAll();
  }
}
