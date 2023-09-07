import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { Cat } from './models/cat.model';

@Injectable()
export class CatService {
  constructor(@InjectModel(Cat) private catRepository: typeof Cat) {}
}
