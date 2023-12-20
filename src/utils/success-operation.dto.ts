import { ApiProperty } from '@nestjs/swagger';

export class SuccessOperationDto {
  @ApiProperty({
    example: true,
    description: 'Успешность операции',
  })
  success: boolean;
}
