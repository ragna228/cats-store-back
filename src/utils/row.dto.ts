import { ApiProperty } from '@nestjs/swagger';

export class RowDto {
  @ApiProperty({
    example: 1,
    description: 'Пагинация',
  })
  row: number;
}
