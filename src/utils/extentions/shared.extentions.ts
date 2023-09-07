import { Attributes, FindOptions, Order } from 'sequelize';
import { Model } from 'sequelize-typescript';

export const rowed = <T extends Model>(
  row = 0,
  options: FindOptions<Attributes<T>> = {},
  limit = 20,
  order: Order = [['id', 'desc']],
): FindOptions<Attributes<T>> => {
  return {
    ...options,
    order: order,
    limit: limit,
    offset: limit * row,
  };
};
