import { ApiProperty, OmitType } from '@nestjs/swagger';
import { CourseCreationAttributes } from '../course.model';

export class CreateCourseDto extends OmitType(CourseCreationAttributes, [
  'id',
  'image',
  'authorImage',
]) {
  @ApiProperty({
    type: String,
    format: 'binary',
  })
  readonly image: string;

  @ApiProperty({
    type: String,
    format: 'binary',
  })
  readonly authorImage: string;
}
