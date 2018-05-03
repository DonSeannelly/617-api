import { GraphQLObjectType, GraphQLInt, GraphQLString, GraphQLList } from 'graphql'
import { MULTIPLE_CHOICE_QUESTION_TYPE } from './multiple-choice-question.type';

export const SECTION_TYPE = new GraphQLObjectType({
  name: 'Section',
  fields: () => ({
    id: { type: GraphQLString },
    name: { type: GraphQLString },
    description: { type: GraphQLString },
    videoIn: { type: GraphQLString },
    videoOut: { type: GraphQLString },
    questions: { type: GraphQLList(MULTIPLE_CHOICE_QUESTION_TYPE) }
  })
})