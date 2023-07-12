// Copyright 2023 Deepsquare Association
// This file is part of Nexus.
// Nexus is free software: you can redistribute it and/or modify it under the terms of the GNU General Public License as published by the Free Software Foundation, either version 3 of the License, or (at your option) any later version.
// Nexus is distributed in the hope that it will be useful, but WITHOUT ANY WARRANTY; without even the implied warranty of MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE. See the GNU General Public License for more details.
// You should have received a copy of the GNU General Public License along with Nexus. If not, see <https://www.gnu.org/licenses/>.
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
export default container;
