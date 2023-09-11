import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { Cat } from './models/cat.model';
import { ICatService } from '../utils/serivces/i-cat.service';
import { CreateCatDto } from './dto/create-cat.dto';
import { FilterCatDto } from './dto/filter-cat.dto';
import { Includeable } from 'sequelize';
import { SuccessOperationDto } from '../utils/success-operation.dto';

@Injectable()
export class CatService extends ICatService {
  constructor(@InjectModel(Cat) private catRepository: typeof Cat) {
    super();
  }

  create(dto: CreateCatDto): Promise<Cat> {
    return Promise.resolve(undefined);
  }

  getAll(dto: FilterCatDto): Promise<Cat> {
    return Promise.resolve(undefined);
  }

  getById(id: number, include: Includeable[] = []): Promise<Cat> {
    return Promise.resolve(undefined);
  }

  remove(id: number): Promise<SuccessOperationDto> {
    return Promise.resolve(undefined);
  }
}
