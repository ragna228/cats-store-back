import { ApiProperty } from '@nestjs/swagger';

export class ErrorType {
  @ApiProperty({})
  message: string;
}
