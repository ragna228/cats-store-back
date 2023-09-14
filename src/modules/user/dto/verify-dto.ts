import { ApiProperty } from '@nestjs/swagger';

export class VerifyDto {
  @ApiProperty({
    example: 1000,
    description: 'Код',
  })
  code: number;
}
