import { createParamDecorator, ExecutionContext } from '@nestjs/common';

import { UserModel } from '../../users/db/user.model';

export const getCurrentUserByContext = (
  context: ExecutionContext,
): UserModel => {
  if (context.getType() === 'http')
    return context.switchToHttp().getRequest().user as UserModel;
};

export const CurrentUser = createParamDecorator(
  (_data: unknown, ctx: ExecutionContext) => getCurrentUserByContext(ctx),
);
