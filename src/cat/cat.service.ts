import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { Cat, CatStatus } from './models/cat.model';
import { ICatService } from '../utils/serivces/i-cat.service';
import { CreateCatDto } from './dto/create-cat.dto';
import { FilterCatDto } from './dto/filter-cat.dto';
import { Includeable } from 'sequelize';
import { SuccessOperationDto } from '../utils/success-operation.dto';
import {
  filteredFields,
  isValueOrDefault,
  minMaxFilter,
  rowed,
} from '../utils/extentions/shared.extentions';
import { valueToArray } from '../utils/extentions/array.extentions';
import { availableCats } from '../utils/extentions/cats.extention';

@Injectable()
export class CatService extends ICatService {
  constructor(@InjectModel(Cat) private catRepository: typeof Cat) {
    super();
  }

  create(dto: CreateCatDto): Promise<Cat> {
    return this.catRepository.create({
      ...dto,
      images: valueToArray<string>(dto.images),
      features: dto.features.split(','),
      status: CatStatus.SHOWED,
    });
  }

  async getAll(dto: FilterCatDto): Promise<Cat[]> {
    return this.catRepository.findAll(
      rowed<Cat>(dto.row, {
        where: availableCats(
          filteredFields<Cat>(['name'], dto.q, {
            age: minMaxFilter(dto.minAge, dto.maxAge),
            price: minMaxFilter(dto.minPrice, dto.maxPrice),
            ...isValueOrDefault<Cat>('color', dto.color),
            ...isValueOrDefault<Cat>('isRecommended', dto.isRecommended),
            ...isValueOrDefault<Cat>('gender', dto.gender),
          }),
        ),
      }),
    );
  }

  async getById(id: number, include: Includeable[] = []): Promise<Cat> {
    const cat = await this.catRepository.findOne({
      where: availableCats({
        id: id,
      }),
      include: include,
    });

    if (!cat) {
      throw new BadRequestException({
        message: 'Такого кота нет',
      });
    }

    return cat;
  }

  async setStatus(id: number, status: CatStatus): Promise<SuccessOperationDto> {
    const [result] = await this.catRepository.update(
      {
        status: status,
      },
      {
        where: {
          status: CatStatus.SHOWED,
          id: id,
        },
      },
    );

    if (result != 1) {
      throw new BadRequestException({
        message: 'Такого кота нет или его статус уже изменен',
      });
    }

    return { success: true };
  }
}
