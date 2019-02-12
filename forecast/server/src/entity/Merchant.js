import { Field, ID, ObjectType } from 'type-graphql'

@ObjectType()
// decorator that marks the subsequent class as the type known from GraphQL SDL
// or GraphQLObjectType from graphql-js
// https://19majkel94.github.io/type-graphql/docs/types-and-fields.html
export class Merchant {
  @Field(_ => ID, { nullable: true })
  // decorator that marks a class property that should be mapped to GraphQL fields
  // https://19majkel94.github.io/type-graphql/docs/scalars.html
  id: string

  @Field({ nullable: true })
  authCode: string

  @Field({ nullable: true })
  accessToken: string
}
