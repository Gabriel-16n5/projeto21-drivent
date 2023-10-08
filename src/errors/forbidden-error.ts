import { ApplicationError } from '@/protocols';

export function forbiddenError(a:string): ApplicationError {
  return {
    name: 'ForbiddenError',
    message: a,
  };
}
