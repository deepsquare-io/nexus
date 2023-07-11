import { injectable } from 'tsyringe';
import { Args, ArgsType, Field, Mutation, Resolver } from 'type-graphql';
import UserModel from '../../../database/User/UserModel';

@ArgsType()
class CreateUserArgs {
  @Field(() => String)
  userId!: string;
}

@injectable()
@Resolver()
export default class CreateUserMutation {
  @Mutation(() => Boolean)
  async createUser(@Args() { userId }: CreateUserArgs) {
    if (!(await UserModel.exists({ _id: userId }).exec())) {
      await UserModel.create({ _id: userId });
    }
    return true;
  }
}
