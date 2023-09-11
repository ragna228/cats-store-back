import { ApiProperty } from '@nestjs/swagger';

export class ChangeRoleUserState {
  @ApiProperty({
    example: 1,
    description: 'Id пользователя',
  })
  userId: number;

  @ApiProperty({
    example: 'ADMIN',
    description: 'Имя роли',
  })
  roleName: string;
}
