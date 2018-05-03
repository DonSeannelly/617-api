import { USER_TYPE } from './../user.schema';
import { ByteType } from './byte.type';
import { GraphQLObjectType, GraphQLInt, GraphQLString, GraphQLList } from 'graphql'
import { MATERIALS_TYPE } from './materials.type'
import { SECTION_TYPE } from './section.type';


const INVITATION_TYPE = new GraphQLObjectType({
  name: 'Invitation',
  fields: () => ({
    // User props
    id: { type: GraphQLString },
    email: { type: GraphQLString },
    // Additional Props
    dateSent: { type: GraphQLString }
  })
})

export const TABLE_TYPE = new GraphQLObjectType({
  name: 'Table',
  fields: () => ({
    id: { type: GraphQLString },
    owner: { type: USER_TYPE },
    bytes: { type: GraphQLList(ByteType) },
    invitations: { type: GraphQLList(INVITATION_TYPE) },
    members: { type: GraphQLList(USER_TYPE) }
  })
});
