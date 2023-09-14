import { ApiProperty } from '@nestjs/swagger';

export class RefreshDto {
  @ApiProperty({
    example: 1,
    description: 'Refresh токен',
  })
  refreshToken: string;
}
