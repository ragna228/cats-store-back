import { Controller } from '@nestjs/common';
import { ApiBearerAuth } from '@nestjs/swagger';
import { CatService } from './cat.service';

@ApiBearerAuth()
@Controller('cat')
export class CatController {
  constructor(private catService: CatService) {}
}
