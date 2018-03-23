import { GraphQLObjectType, GraphQLInt, GraphQLString } from 'graphql'

export const MultipleChoiceOptionType = new GraphQLObjectType({
  name: 'MultipleChoiceOption',
  fields: () => ({
    id: { type: GraphQLInt },
    text: { type: GraphQLString },
  })
})