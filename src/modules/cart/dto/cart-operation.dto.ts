import { ApiProperty } from '@nestjs/swagger';

export class CartOperationDto {
  @ApiProperty({
    example: 1,
    description: 'Id кота',
  })
  catId: number;
}
