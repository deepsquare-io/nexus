import { Arg, Query, Resolver } from 'type-graphql';

@Resolver()
export default class PingQuery {
  @Query(() => String)
  ping(@Arg('pong', { nullable: true }) pong: string | null): string {
    return pong ?? 'pong';
  }
}
