import { GraphQLObjectType, GraphQLInt, GraphQLString, GraphQLList } from 'graphql'
import { MULTIPLE_CHOICE_OPTION_TYPE } from './multiple-choice-option.type'

export const MULTIPLE_CHOICE_QUESTION_TYPE = new GraphQLObjectType({
  name: 'MultipleChoiceQuestion',
  fields: () => ({
    index: { type: GraphQLInt },
    text: { type: GraphQLString },
    options: { type: GraphQLList(MULTIPLE_CHOICE_OPTION_TYPE) },
    answerId: { type: GraphQLString }
  })
})