import { Module } from '@nestjs/common';
import { SequelizeModule } from '@nestjs/sequelize';
import { Course } from './course.model';
import { CourseService } from './course.service';
import { CourseController } from './course.controller';
import { MulterModule } from '@nestjs/platform-express';

@Module({
  imports: [SequelizeModule.forFeature([Course]), MulterModule],
  providers: [CourseService],
  controllers: [CourseController],
})
export class CourseModule {}
