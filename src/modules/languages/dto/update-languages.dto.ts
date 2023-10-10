import { ApiProperty, OmitType, PartialType } from '@nestjs/swagger';
import { LanguagesCreationAttributes } from '../languages.model';

export class UpdateLanguagesDto extends PartialType(
  OmitType(LanguagesCreationAttributes, ['id']),
) {
  @ApiProperty({
    example: 'key',
    description: 'Ключ',
  })
  key: string;
}
