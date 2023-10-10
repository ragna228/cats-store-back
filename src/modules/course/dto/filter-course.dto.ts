import { ApiProperty } from '@nestjs/swagger';

export class FilterCourseDto {
  @ApiProperty({
    example: 0,
  })
  page: number;

  @ApiProperty({
    example: 'asd',
  })
  q: string;
}
