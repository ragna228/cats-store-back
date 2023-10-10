import { ApiProperty } from '@nestjs/swagger';

export class SessionDto {
    @ApiProperty({
        example: 'asd',
        description: 'Имя сессии',
    })
    sessionName: string;
}