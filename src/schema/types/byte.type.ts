import { GraphQLObjectType, GraphQLInt, GraphQLString, GraphQLList } from 'graphql'
import { MaterialsType } from './materials.type'
import { UserType } from '../user.schema'
import { SectionType } from './section.type';

export const ByteType = new GraphQLObjectType({
  name: 'Byte',
  fields: () => ({
    id: { type: GraphQLString },
    name: { type: GraphQLString },
    description: { type: GraphQLString },
    date: { type: GraphQLInt },
    creator: { type: UserType },
    materials: { type: MaterialsType },
    sections: { type: GraphQLList(SectionType) }
  })
})