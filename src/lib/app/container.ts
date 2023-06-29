import { Rest } from 'ably/promises';
import { container, instanceCachingFactory } from 'tsyringe';
import DeepSquareClient from '@deepsquare/deepsquare-client';
import env from '@lib/app/env';

container.register(DeepSquareClient, {
  useFactory: instanceCachingFactory(() => {
    return new DeepSquareClient(env.WEB3_PRIVATE_KEY);
  }),
});

container.register(Rest, {
  useFactory: instanceCachingFactory(() => {
    return new Rest(env.ABLY_PUBLISH_KEY);
  }),
});
export default container;
