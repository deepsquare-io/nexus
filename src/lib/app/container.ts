// Copyright 2023 Deepsquare Association
// This file is part of Nexus.
// Nexus is free software: you can redistribute it and/or modify it under the terms of the GNU General Public License as published by the Free Software Foundation, either version 3 of the License, or (at your option) any later version.
// Nexus is distributed in the hope that it will be useful, but WITHOUT ANY WARRANTY; without even the implied warranty of MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE. See the GNU General Public License for more details.
// You should have received a copy of the GNU General Public License along with Nexus. If not, see <https://www.gnu.org/licenses/>.
import * as admin from 'firebase-admin';
import { Db, MongoClient } from 'mongodb';
import { container, instanceCachingFactory } from 'tsyringe';
import DeepSquareClient from '@deepsquare/deepsquare-client';
import env from '@lib/app/env';
import { FirebaseAdmin } from '@lib/app/tokens';
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

container.register(FirebaseAdmin, {
  useFactory: instanceCachingFactory(() => {
    return admin.initializeApp(
      {
        credential: admin.credential.cert({
          projectId: 'the-grid-8afc2',
          privateKey:
            '-----BEGIN PRIVATE KEY-----\nMIIEvAIBADANBgkqhkiG9w0BAQEFAASCBKYwggSiAgEAAoIBAQCrz0Medx5mdtQ+\nkqcm+lGmbo2Ggi2u7sIumuasWQT+kAOJTiS68LzVqBwcPt6tyunBcvOIYZUdPWrX\nZ4OlUzxrYXch+4L/C5RRmqzmUiUgyK089E2ylfcobNdpcHfd6t13bCoGSu30AYKy\nNLjwaHpOrb4lmqdFg+tbomIoSNZ2HtCdnK6c/8asEvICUzt0yfTo5ciuJj/javmv\nEb8/CDVOsW/SAU5pktefTKr4WpkG8b/AQkfE9sLvy06aQe4Mv5qeU9brwsMVqGCw\nDaq1Vpg6UoQnSf1BocHM1ZSvB/wb73WK4tTpjCz6HXXTw3QIk4sb0k3NAiS2Q/R0\niqVopF3PAgMBAAECggEAC2xo/I4UBeERxKVQmt1a73N7Un22VuLGI34mJ0B1/g0K\nRydcdteJ3rTiRZiCitCqkTO48JD4bqzGPVNDJAtwQX2GA8rqz1VwQ6rCoz/D+zWM\nmzhtMBobiGMQQZD6T1WN6yJUev2ha69sBrhNsaJou3F+6pYpWAxo6jtWRnJtXAYd\nelsngBo/xfSTs6zmE6RiXDE9cG1uSqKTlUoOrGy1QDYFzLujatZPpZIU/fQzvBWO\no+EghVSxSbrfp+m3sDJJlOSJLc+1mnBR4wYxQN2c/tYUmDEMnFVfWJsX79cc2hvr\nK/Sno9b+lu+0mSpZMzaEhQrSYE372AbFnWyq/AXH9QKBgQDmg4vlqhjaHQ/0OVqz\nXl4aCW+Z3T8e7fhXHwRymx23U+my0C76pkreX/vtXgdZA+XY+F3mkfdXbiXr1vXS\nLHEo54iMYMplUxMv3Tyz4gmeRzYPSRtOt2eG/5MX7CU006cRa0BwS+Feeq9kksHM\n11oNpqLcogm3kZT3Q+Ix/n0NKwKBgQC+zidaZZ/uzvgViMgE7WqmhdVv5oA3bS/D\n+DTH9MMPn7Po6D1rFnTq8uYE1Y/8WGRdXrcXAFfjrsGIjRvIGtJ3hQbMzIp7ETkk\nDgBjTXLCo+IfXyhvxfJ09wEvXOxucL7BIY3LuKAPRd4hLr0SOti+5qO2MNqDpMeR\nOgqRRwkH7QKBgEBu/tjYng/B1ebPbWH7+9PNVWut42ny3NsFaYnbgAfxpb584NTh\nTMYyEEp+YRFpvILUkfLUVE4VFPaCZL41+/+SEKIkoA6IlTFo5wHlKgkbIKpPJhnv\nvDmJEQW71X6ZtvZwg1egbkOpiYNUXmWywJJWROnlRVARmpEvYXfWCgB3AoGAds5Y\nlKHolsMKmCYGHYNTQALfZoDI3zo+XrCi9MqD1qujU2egLpjaDh1WejYcJI1JWRYL\nvOe60gtTeFocrVl+KWuMU2Mc6wpLYRbSyQJFbcqrlssim45OrOPMOhiLIy1SqWDi\nMLJx/3CKonC+y6YWpa9oyp3awdONa/EO+WyYw/UCgYAN3Vt7F4A3k5GbceIwXv9Z\nCkGMa+/bHOo/TC4+V9RSMRavlMVguhxwUxzPSvk2BG+upj0zkTcWKNp2DRhu04Jc\ns2w/CFzq8WOivjGNRhnIg0rJ/QiawSrq280ruKOmTwFm6glVqfxIgh0je+I/GPzd\n06tmSEYZ1evyebn1RjBM3A==\n-----END PRIVATE KEY-----\n',
          clientEmail: 'firebase-adminsdk-u42i2@the-grid-8afc2.iam.gserviceaccount.com',
        }),
      },
      'admin',
    );
  }),
});
export default container;
