import {
  Body,
  Controller,
  Post,
  UploadedFiles,
  UseInterceptors,
} from '@nestjs/common';
import {
  ApiBearerAuth,
  ApiConsumes,
  ApiOperation,
  ApiResponse,
  ApiTags,
} from '@nestjs/swagger';
import { CourseService } from './course.service';
import { ErrorType } from '../../utils/error.type';
import { CourseCreationAttributes } from './course.model';
import { CreateCourseDto } from './dto/create-course.dto';
import { FilterCourseDto } from './dto/filter-course.dto';
import { FileFieldsInterceptor } from '@nestjs/platform-express';

@Controller('course')
@ApiBearerAuth()
@ApiTags('Курсы')
export class CourseController {
  constructor(private courseService: CourseService) {}

  @ApiOperation({ summary: 'Создать запись' })
  @ApiResponse({ status: 201, type: CourseCreationAttributes })
  @ApiResponse({ status: 400, type: ErrorType })
  @ApiConsumes('multipart/form-data')
  @Post('/create')
  @UseInterceptors(
    FileFieldsInterceptor([
      {
        name: 'image',
      },
      {
        name: 'authorImage',
      },
    ]),
  )
  async create(
    @Body() dto: CreateCourseDto,
    @UploadedFiles()
    files: {
      image: Express.Multer.File[];
      authorImage: Express.Multer.File[];
    },
  ) {
    return this.courseService.create({
      ...dto,
      image: files.image[0].filename,
      authorImage: files.authorImage[0].filename,
    });
  }

  @ApiOperation({ summary: 'Поиск записей' })
  @ApiResponse({ status: 201, type: [CourseCreationAttributes] })
  @ApiResponse({ status: 400, type: ErrorType })
  @Post('/filter')
  async getAll(@Body() dto: FilterCourseDto) {
    return this.courseService.filter(dto);
  }
}
