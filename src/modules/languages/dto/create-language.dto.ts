import { OmitType } from '@nestjs/swagger';
import { LanguagesCreationAttributes } from '../languages.model';

export class CreateLanguageDto extends OmitType(LanguagesCreationAttributes, [
  'id',
]) {}
