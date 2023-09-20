import type { NextRequest } from 'next/server';
import type { AuthMethod } from '@lib/types/AuthMethod';
import type { User } from '../../../database/User/User';

export default interface Context {
  req: NextRequest;
  jwt: AuthMethod;
  user: User | null;
}
