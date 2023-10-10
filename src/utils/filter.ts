import { Model } from 'sequelize-typescript';
import { Op, WhereOptions } from 'sequelize';

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
