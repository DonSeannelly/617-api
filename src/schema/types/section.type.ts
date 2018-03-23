import { GraphQLObjectType, GraphQLInt, GraphQLString, GraphQLList } from 'graphql'
import { MultipleChoiceQuestionType } from './multiple-choice-question.type';

export const SectionType = new GraphQLObjectType({
  name: 'Section',
  fields: () => ({
    id: { type: GraphQLString },
    name: { type: GraphQLString },
    description: { type: GraphQLString },
    videoIn: { type: GraphQLString },
    videoOut: { type: GraphQLString },
    questions: { type: GraphQLList(MultipleChoiceQuestionType) }
  })
})