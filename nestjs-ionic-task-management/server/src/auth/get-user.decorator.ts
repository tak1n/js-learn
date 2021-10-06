import { createParamDecorator, ExecutionContext } from '@nestjs/common';
import { User } from './user.entity';

export const GetUser = createParamDecorator(
  (data, context: ExecutionContext): User => {
    const httpContext = context.switchToHttp();
    const req = httpContext.getRequest();

    return req.user;
  },
);
