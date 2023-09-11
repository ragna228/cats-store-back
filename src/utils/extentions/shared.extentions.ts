import {
  Attributes,
  FindOptions,
  Op,
  Order,
  WhereAttributeHashValue,
  WhereOptions,
} from 'sequelize';
import { Model } from 'sequelize-typescript';

export const rowed = <T extends Model>(
  row = 0,
  options: FindOptions<Attributes<T>> = {},
  limit = 20,
  order: Order = [['id', 'desc']],
): FindOptions<Attributes<T>> => {
  return {
    order: order,
    ...options,
    limit: limit,
    offset: limit * row,
  };
};

export const filteredFields = <T extends Model>(
  keys: (keyof T)[],
  q: string,
  options: WhereOptions<T> = {},
): WhereOptions<T> => {
  const search = [];
  const query = `%${q ? q : ''}%`;

  for (const key of keys) {
    search.push({
      [key]: {
        [Op.iLike]: query,
      },
    });
  }

  return {
    ...options,
    [Op.or]: search,
  };
};

export const minMaxFilter = (
  min?: number,
  max?: number,
  defaultMin = 0,
  defaultMax = 100000,
): WhereAttributeHashValue<number> => {
  return {
    [Op.gte]: min ? min : defaultMin,
    [Op.lte]: max ? max : defaultMax,
  };
};

export const isValueOrDefault = <T extends Model>(
  key: keyof T,
  value: any | undefined,
): WhereAttributeHashValue<any> => {
  return value ? { [key]: value } : undefined;
};
