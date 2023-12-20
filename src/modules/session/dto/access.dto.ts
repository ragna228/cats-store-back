import { ApiProperty } from '@nestjs/swagger';

export class AccessDto {
  @ApiProperty({
    example: 'token',
    description: 'Access token',
  })
  accessToken: string;
}
