import {
  Body,
  Controller,
  Get,
  Param,
  Post,
  Put,
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
import { CatCreationAttributes, CatStatus } from './models/cat.model';
import { CreateCatDto } from './dto/create-cat.dto';
import { FilterCatDto } from './dto/filter-cat.dto';
import { FilesInterceptor } from '@nestjs/platform-express';
import { UpdateCatDto } from './dto/update-cat.dto';
import { ICatService } from '../../interfaces/i-cat.service';
import { ErrorType } from '../../utils/error.type';
import { RolesGuard } from '../../utils/gurads/user.guard';
import { Roles } from '../../utils/decorators/auth.decorator';
import { SuccessOperationDto } from '../../utils/success-operation.dto';

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

  @ApiOperation({ summary: 'Изменить кота' })
  @ApiResponse({ status: 200, type: [CatCreationAttributes] })
  @ApiResponse({ status: 400, type: ErrorType })
  @ApiConsumes('multipart/form-data')
  @UseGuards(RolesGuard)
  @Roles('ADMIN')
  @UseInterceptors(FilesInterceptor('images'))
  @Put('/update')
  async update(@Body() dto: UpdateCatDto) {
    return this.catService.update(dto);
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
