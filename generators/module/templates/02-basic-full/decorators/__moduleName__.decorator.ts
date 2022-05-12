import { createParamDecorator, ExecutionContext } from '@nestjs/common';

export const <%= kebabToPascal(config.name) %> = createParamDecorator(
  (data: unknown, ctx: ExecutionContext) => {
    // do your work here
    // return [your-data];
  },
);
