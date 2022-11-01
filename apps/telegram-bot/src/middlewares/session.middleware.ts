import { MiddlewareFn, session } from 'telegraf';
import { SessionContext } from 'telegraf/typings/session';

export const sessionMiddleware: MiddlewareFn<SessionContext<object>> =
  session();
