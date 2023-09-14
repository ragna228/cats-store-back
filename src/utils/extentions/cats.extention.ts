import { WhereOptions } from 'sequelize';
import { Cat, CatStatus } from '../../modules/cat/models/cat.model';

export const availableCats = (
  options: WhereOptions<Cat>,
): WhereOptions<Cat> => {
  return {
    ...options,
    status: CatStatus.SHOWED,
  };
};
