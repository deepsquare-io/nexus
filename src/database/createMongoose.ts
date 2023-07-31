import { connect } from 'mongoose';
import env from '@lib/app/env';

export default async function createMongoose() {
  return connect(env.MONGODB_URI);
}
