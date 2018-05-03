import { GraphQLObjectType, GraphQLInt, GraphQLString } from 'graphql'

export const MULTIPLE_CHOICE_OPTION_TYPE = new GraphQLObjectType({
  name: 'MultipleChoiceOption',
  fields: () => ({
    id: { type: GraphQLInt },
    text: { type: GraphQLString },
  })
})