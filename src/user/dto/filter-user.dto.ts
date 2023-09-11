import { ApiPropertyOptional } from '@nestjs/swagger';
import { RowDto } from '../../utils/row.dto';

export class FilterUserDto extends RowDto {
  @ApiPropertyOptional({
    example: '',
    description: 'Запрос',
  })
  q?: string;

  @ApiPropertyOptional({
    example: [],
    description: 'Roles Id',
  })
  roleIds: number[];
}
