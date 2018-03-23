import { GraphQLObjectType, GraphQLInt, GraphQLString, GraphQLList } from 'graphql'
import { MultipleChoiceOptionType } from './multiple-choice-option.type'

export const MultipleChoiceQuestionType = new GraphQLObjectType({
  name: 'MultipleChoiceQuestion',
  fields: () => ({
    text: { type: GraphQLString },
    options: { type: GraphQLList(MultipleChoiceOptionType) },
    answerId: { type: GraphQLInt }
  })
})