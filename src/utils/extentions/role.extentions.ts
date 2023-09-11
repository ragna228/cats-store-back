import { IncludeOptions } from 'sequelize';
import { Role } from '../../role/models/role.model';

export const roleWithoutMany = (): IncludeOptions => ({
  model: Role,
  through: {
    attributes: [],
  },
});
