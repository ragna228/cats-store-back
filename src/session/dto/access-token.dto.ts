import { ApiProperty } from '@nestjs/swagger';

export class AccessTokenDto {
  @ApiProperty({
    example: 'token',
    description: 'Access token',
  })
  accessToken: string;
}
