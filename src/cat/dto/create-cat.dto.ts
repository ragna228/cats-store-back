import { CatCreationAttributes } from '../models/cat.model';
import { OmitType } from '@nestjs/swagger';

export class CreateCatDto extends OmitType(CatCreationAttributes, ['id']) {}
