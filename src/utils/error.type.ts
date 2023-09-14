import { ApiProperty } from '@nestjs/swagger';

export class ErrorType {
  @ApiProperty({
    example: 'Ошибка',
    description: 'Ошибка',
  })
  message: string;
}
