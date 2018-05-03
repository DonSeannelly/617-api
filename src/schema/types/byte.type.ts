import { GraphQLObjectType, GraphQLInt, GraphQLString, GraphQLList } from 'graphql'
import { MATERIALS_TYPE } from './materials.type'
import { USER_TYPE } from '../user.schema'
import { SECTION_TYPE } from './section.type';

export const ByteType = new GraphQLObjectType({
  name: 'Byte',
  fields: () => ({
    id: { type: GraphQLString },
    name: { type: GraphQLString },
    description: { type: GraphQLString },
    date: { type: GraphQLInt },
    creator: { type: USER_TYPE },
    materials: { type: MATERIALS_TYPE },
    sections: { type: GraphQLList(SECTION_TYPE) }
  })
})