import { FilterCatDto } from '../modules/cat/dto/filter-cat.dto';
import { Cat, CatStatus } from '../modules/cat/models/cat.model';
import { SuccessOperationDto } from '../utils/success-operation.dto';
import { CreateCatDto } from '../modules/cat/dto/create-cat.dto';
import { UpdateCatDto } from '../modules/cat/dto/update-cat.dto';

export abstract class ICatService {
  abstract getAll(dto: FilterCatDto): Promise<Cat[]>;
  abstract getById(id: number): Promise<Cat>;
  abstract setStatus(
    id: number,
    status: CatStatus,
  ): Promise<SuccessOperationDto>;
  abstract create(dto: CreateCatDto): Promise<Cat>;
  abstract update(dto: UpdateCatDto): Promise<Cat>;
}
