import { createParamDecorator, ExecutionContext } from '@nestjs/common';
import { User } from '../../user/models/user.model';

export const GetPayload = createParamDecorator(
  (data: any, context: ExecutionContext): User => {
    const req = context.switchToHttp().getRequest();
    return req.payload;
  },
);
