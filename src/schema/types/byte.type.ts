import { GraphQLObjectType, GraphQLInt, GraphQLString, GraphQLList } from 'graphql'
import { MATERIALS_TYPE } from './materials.type'
import { USER_TYPE } from '../user.schema'
import { SECTION_TYPE } from './section.type';
import { getUser } from '../../interactors/user.interactor';

export const ByteType = new GraphQLObjectType({
  name: 'Byte',
  fields: () => ({
    id: { 
      type: GraphQLString, 
      resolve(parentValue, args, context) { 
        if (parentValue._id) return parentValue._id; 
      } 
    },
    image: { type: GraphQLString },
    name: { type: GraphQLString },
    description: { type: GraphQLString },
    date: { type: GraphQLInt },
    creator: {
      type: USER_TYPE,
      resolve(parentValue, args, context) {
        if (parentValue.creatorID) {
          return getUser({ dataStore: context.dataStore, id: parentValue.creatorID })
        }
      }
    },
    materials: { type: MATERIALS_TYPE },
    sections: { type: GraphQLList(SECTION_TYPE) }
  })
})