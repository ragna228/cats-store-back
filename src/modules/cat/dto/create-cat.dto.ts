import { CatCreationAttributes } from '../models/cat.model';
import { ApiProperty, OmitType } from '@nestjs/swagger';

export class CreateCatDto extends OmitType(CatCreationAttributes, [
  'id',
  'images',
  'features',
  'status',
]) {
  @ApiProperty({
    type: [String],
    format: 'binary',
  })
  readonly images: string | string[];

  @ApiProperty({
    example: [],
    type: [String],
    description: 'Особенности',
  })
  readonly features: string | string[];
}
