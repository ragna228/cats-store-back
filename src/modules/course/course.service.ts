import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { Course } from './course.model';
import { CreateCourseDto } from './dto/create-course.dto';
import { FilterCourseDto } from './dto/filter-course.dto';
import { filteredFields } from '../../utils/filter';

@Injectable()
export class CourseService {
  constructor(@InjectModel(Course) private courseRepository: typeof Course) {}

  async create(dto: CreateCourseDto) {
    return this.courseRepository.create({
      ...dto,
    });
  }

  async filter(dto: FilterCourseDto) {
    return this.courseRepository.findAll({
      where: filteredFields<Course>(
        [
          'title',
          'description',
          'tag',
          'authorName',
          'courseDuration',
          'courseLevel',
        ],
        dto.q,
      ),
      order: [['id', 'desc']],
      offset: dto.page * 20,
      limit: 20,
    });
  }
}
