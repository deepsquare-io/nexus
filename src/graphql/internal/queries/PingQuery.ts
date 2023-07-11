import { Arg, Query, Resolver } from 'type-graphql';

@Resolver()
export default class PingQuery {
  @Query(() => String)
  async ping(@Arg('pong', { nullable: true }) pong: string | null): Promise<string> {
    return pong ?? 'pong';
  }
}
