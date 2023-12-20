import {
  ApiProperty,
  ApiPropertyOptional,
  OmitType,
  PartialType,
} from '@nestjs/swagger';
import { CatCreationAttributes } from '../models/cat.model';

export class UpdateCatDto extends OmitType(PartialType(CatCreationAttributes), [
  'id',
  'images',
  'features',
  'status',
]) {
  @ApiProperty({
    example: 1,
    description: 'Id',
  })
  readonly id: number;

  @ApiPropertyOptional({
    type: [String],
    format: 'binary',
  })
  readonly images?: string | string[];

  @ApiPropertyOptional({
    example: [],
    type: [String],
    description: 'Особенности',
  })
  readonly features?: string | string[];
}
