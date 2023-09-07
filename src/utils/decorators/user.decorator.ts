import { createParamDecorator, ExecutionContext } from '@nestjs/common';
import { User } from '../../user/models/user.model';

export const GetUser = createParamDecorator(
  (data: any, context: ExecutionContext): User => {
    const req = context.switchToHttp().getRequest();
    return req.user;
  },
);
