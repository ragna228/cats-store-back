import { SuccessOperationDto } from '../utils/success-operation.dto';
import { Cat } from '../modules/cat/models/cat.model';

export abstract class ICartService {
  abstract addToCart(
    catId: number,
    userId: number,
  ): Promise<SuccessOperationDto>;
  abstract removeFromCart(
    catId: number,
    userId: number,
  ): Promise<SuccessOperationDto>;
  abstract getAll(userId: number): Promise<Cat[]>;
  abstract clear(userId: number): Promise<SuccessOperationDto>;
}
