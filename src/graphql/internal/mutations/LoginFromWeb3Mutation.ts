// Copyright 2023 Deepsquare Association
// This file is part of Foobar.
// Foobar is free software: you can redistribute it and/or modify it under the terms of the GNU General Public License as published by the Free Software Foundation, either version 3 of the License, or (at your option) any later version.
// Foobar is distributed in the hope that it will be useful, but WITHOUT ANY WARRANTY; without even the implied warranty of MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE. See the GNU General Public License for more details.
// You should have received a copy of the GNU General Public License along with Foobar. If not, see <https://www.gnu.org/licenses/>.
// Copyright 2023 Deepsquare Association
// This file is part of Foobar.
// Foobar is free software: you can redistribute it and/or modify it under the terms of the GNU General Public License as published by the Free Software Foundation, either version 3 of the License, or (at your option) any later version.
// Foobar is distributed in the hope that it will be useful, but WITHOUT ANY WARRANTY; without even the implied warranty of MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE. See the GNU General Public License for more details.
// You should have received a copy of the GNU General Public License along with Foobar. If not, see <https://www.gnu.org/licenses/>.
import { Args, ArgsType, Field, Mutation, Resolver } from 'type-graphql';
import { type Hex, verifyMessage } from 'viem';
import { AuthenticationError } from '@graphql/internal/errors/AuthenticationError';
import HexScalar from '@graphql/internal/scalars/HexScalar';
import { sign } from '@lib/auth/sign';

@ArgsType()
class LoginFromWeb3Args {
  @Field(() => HexScalar)
  address!: Hex;

  @Field(() => HexScalar)
  signature!: Hex;
}

@Resolver()
export default class LoginFromWeb3Mutation {
  @Mutation(() => String)
  async loginFromWeb3(@Args() { address, signature }: LoginFromWeb3Args) {
    if (
      !(await verifyMessage({
        address,
        message: address,
        signature,
      }))
    )
      throw new AuthenticationError('Invalid web3 signature');
    return sign({ type: 'web3', sub: address });
  }
}
