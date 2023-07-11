import { Db, MongoClient } from 'mongodb';
import { container, instanceCachingFactory } from 'tsyringe';
import DeepSquareClient from '@deepsquare/deepsquare-client';
import env from '@lib/app/env';
import { addressMetaScheduler } from '@lib/web3/constants/contracts';

container.register(DeepSquareClient, {
  useFactory: instanceCachingFactory(() => {
    return new DeepSquareClient(
      env.WEB3_PRIVATE_KEY,
      undefined,
      addressMetaScheduler,
      `${env.NEXT_PUBLIC_API_URL}/graphql`,
    );
  }),
});

container.register(MongoClient, {
  useFactory: instanceCachingFactory(() => {
    return new MongoClient(env.MONGODB_URI);
  }),
});

container.register(Db, {
  useFactory: (container) => {
    return container.resolve(MongoClient).db();
  },
});
export default container;
