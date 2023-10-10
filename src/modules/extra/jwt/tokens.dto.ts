import { ApiProperty } from '@nestjs/swagger';

export class TokensDto {
    @ApiProperty({
        example: 'test',
        description: 'Access токен',
    })
    accessToken: string;

    @ApiProperty({
        example: 'test',
        description: 'Refresh токен',
    })
    refreshToken: string;
}