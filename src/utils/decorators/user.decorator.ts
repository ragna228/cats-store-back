import { createParamDecorator, ExecutionContext } from '@nestjs/common';
import { AccessTokenDto } from '../../modules/extra/jwt/access-token.dto';

export const GetPayload = createParamDecorator(
  (data: any, context: ExecutionContext): AccessTokenDto => {
    const req = context.switchToHttp().getRequest();
    return req.payload;
  },
);
