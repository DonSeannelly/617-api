import { GraphQLObjectType, GraphQLInt, GraphQLString } from 'graphql'

export const MULTIPLE_CHOICE_OPTION_TYPE = new GraphQLObjectType({
  name: 'MultipleChoiceOption',
  fields: () => ({
    id: { type: GraphQLString },
    text: { type: GraphQLString },
  })
})