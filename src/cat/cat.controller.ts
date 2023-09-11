import {
  Body,
  Controller,
  Get,
  Param,
  Post,
  UseGuards,
  UseInterceptors,
} from '@nestjs/common';
import {
  ApiBearerAuth,
  ApiConsumes,
  ApiOperation,
  ApiResponse,
  ApiTags,
} from '@nestjs/swagger';
import { ICatService } from '../utils/serivces/i-cat.service';
import { ErrorType } from '../utils/errors/error.type';
import { CatCreationAttributes, CatStatus } from './models/cat.model';
import { CreateCatDto } from './dto/create-cat.dto';
import { FilterCatDto } from './dto/filter-cat.dto';
import { SuccessOperationDto } from '../utils/success-operation.dto';
import { FilesInterceptor } from '@nestjs/platform-express';
import { RolesGuard } from '../utils/gurads/user.guard';
import { Roles } from '../utils/decorators/auth.decorator';

@Controller('cat')
@ApiTags('Коты')
@ApiBearerAuth()
export class CatController {
  constructor(private catService: ICatService) {}

  @ApiOperation({ summary: 'Создать кота' })
  @ApiConsumes('multipart/form-data')
  @ApiResponse({ status: 201, type: CatCreationAttributes })
  @ApiResponse({ status: 400, type: ErrorType })
  @Post('/create')
  @UseGuards(RolesGuard)
  @Roles('ADMIN')
  @UseInterceptors(FilesInterceptor('images'))
  async create(@Body() dto: CreateCatDto) {
    return this.catService.create(dto);
  }

  @ApiOperation({ summary: 'Поиск кота' })
  @ApiResponse({ status: 200, type: [CatCreationAttributes] })
  @ApiResponse({ status: 400, type: ErrorType })
  @Post('/')
  async list(@Body() dto: FilterCatDto) {
    return this.catService.getAll(dto);
  }

  @ApiOperation({ summary: 'Получить кота по id' })
  @ApiResponse({ status: 200, type: CatCreationAttributes })
  @ApiResponse({ status: 400, type: ErrorType })
  @Get('/:id')
  async getById(@Param('id') id: number) {
    return this.catService.getById(id);
  }

  @ApiOperation({ summary: 'Удалить кота' })
  @ApiResponse({ status: 200, type: SuccessOperationDto })
  @ApiResponse({ status: 400, type: ErrorType })
  @Get('/remove/:id')
  @UseGuards(RolesGuard)
  @Roles('ADMIN')
  async remove(@Param('id') id: number) {
    return this.catService.setStatus(id, CatStatus.DELETED);
  }
}
