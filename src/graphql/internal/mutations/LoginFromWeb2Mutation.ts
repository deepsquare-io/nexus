// Copyright 2023 Deepsquare Association
// This file is part of Foobar.
// Foobar is free software: you can redistribute it and/or modify it under the terms of the GNU General Public License as published by the Free Software Foundation, either version 3 of the License, or (at your option) any later version.
// Foobar is distributed in the hope that it will be useful, but WITHOUT ANY WARRANTY; without even the implied warranty of MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE. See the GNU General Public License for more details.
// You should have received a copy of the GNU General Public License along with Foobar. If not, see <https://www.gnu.org/licenses/>.
import { app } from 'firebase-admin';
import { inject, injectable } from 'tsyringe';
import { Args, ArgsType, Field, Mutation, Resolver } from 'type-graphql';
import { FirebaseAdmin } from '@lib/app/tokens';
import { sign } from '@lib/auth/sign';

@ArgsType()
class LoginFromWeb2Args {
  @Field(() => String)
  firebaseToken!: string;
}

@injectable()
@Resolver()
export default class LoginFromWeb2Mutation {
  constructor(@inject(FirebaseAdmin) private readonly firebase: app.App) {}

  @Mutation(() => String)
  async loginFromWeb2(@Args() { firebaseToken }: LoginFromWeb2Args) {
    return sign(
      {},
      {
        expiresIn: '1 week',
        subject: (await this.firebase.auth().verifyIdToken(firebaseToken, true)).uid,
      },
    );
  }
}
