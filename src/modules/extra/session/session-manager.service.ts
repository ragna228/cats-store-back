
import { Injectable } from '@nestjs/common';
import { JwtService } from '../jwt/jwt.service';
import { User } from '../../user/models/user.model';
import { TokensDto } from '../jwt/tokens.dto';

@Injectable()
export class SessionManagerService {
    constructor(
        private jwtService: JwtService,
    ) {}
    async create(
        user: User,
    ): Promise<TokensDto> {

        const accessToken = this.jwtService.generate(
            {
                id: user.id,
                email: user.email,
                userName: user.userName,
            },
            'access',
        );

        const refreshToken = this.jwtService.generate(
            {
                id: user.id,
            },
            'refresh',
        );

        return {
            refreshToken: refreshToken,
            accessToken: accessToken,
        };
    }
}