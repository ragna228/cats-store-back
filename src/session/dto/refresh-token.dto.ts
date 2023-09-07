import { ApiProperty } from '@nestjs/swagger';

export class RefreshTokenDto {
  @ApiProperty({
    example: 1,
    description: 'Refresh токен',
  })
  refreshToken: string;
}
