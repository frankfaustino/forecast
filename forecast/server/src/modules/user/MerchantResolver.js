import { Arg, Query, Resolver } from 'type-graphql'

import { Merchant } from '../../entity/Merchant'

@Resolver(Merchant)
// UserResolver class behaves like a controller from class REST framework
// https://19majkel94.github.io/type-graphql/docs/resolvers.html
export class MerchantResolver {
  @Query(_ => Merchant, { nullable: true })
  // Query decorator marks the subsequent method as a GraphQL query
  // its return type is User, which could also be null
  async me(@Arg('id', { nullable: true }) id?: string) {
    // Arg decorator defines the arguments
    console.log(id)
    return Merchant
  }
}
