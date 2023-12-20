import { RowDto } from '../utils/row.dto';
import { Order } from '../modules/order/models/order.model';

export abstract class IOrderService {
  abstract buyCart(userId: number): Promise<Order>;
  abstract getAll(dto: RowDto): Promise<Order[]>;
  abstract history(userId: number): Promise<Order[]>;
}
