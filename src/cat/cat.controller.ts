import { Controller } from '@nestjs/common';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { CatService } from './cat.service';

@Controller('cat')
@ApiTags('Коты')
@ApiBearerAuth()
export class CatController {
  constructor(private catService: CatService) {}
}
