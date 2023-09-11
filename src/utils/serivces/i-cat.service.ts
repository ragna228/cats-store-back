import { Cat, CatStatus } from '../../cat/models/cat.model';
import { FilterCatDto } from '../../cat/dto/filter-cat.dto';
import { Includeable } from 'sequelize';
import { SuccessOperationDto } from '../success-operation.dto';
import { CreateCatDto } from '../../cat/dto/create-cat.dto';

export abstract class ICatService {
  abstract getAll(dto: FilterCatDto): Promise<Cat[]>;
  abstract getById(id: number, include?: Includeable[]): Promise<Cat>;
  abstract setStatus(
    id: number,
    status: CatStatus,
  ): Promise<SuccessOperationDto>;
  abstract create(dto: CreateCatDto): Promise<Cat>;
}
