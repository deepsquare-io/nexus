import type { JwtPayload } from 'jsonwebtoken';
import type { NextApiRequest, NextApiResponse } from 'next';
import type User from '../../../database/User/User';

/**
 * @see https://www.apollographql.com/docs/apollo-server/api/apollo-server/#middleware-specific-context-fields
 */
export default interface Context<T = any> {
  req: NextApiRequest;
  res: NextApiResponse<T>;
  jwt: JwtPayload | null;
  user: User | null;
}
