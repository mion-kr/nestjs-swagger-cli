import { ExecutionContext, createParamDecorator } from '@nestjs/common';
import { SelectUser } from '../database';

const getCurrentUserByContext = (context: ExecutionContext): SelectUser => {
  return context.switchToHttp().getRequest().user;
};

export const CurrentUser = createParamDecorator(
  (_data: unknown, context: ExecutionContext) =>
    getCurrentUserByContext(context),
);
