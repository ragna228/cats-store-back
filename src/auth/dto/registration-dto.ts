import { UserCreationAttributes } from '../../user/models/user.model';

export type RegistrationDto = Omit<UserCreationAttributes, 'id'>;
