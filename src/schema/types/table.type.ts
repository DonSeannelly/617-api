import { USER_TYPE } from './../user.schema';
import { ByteType } from './byte.type';
import { GraphQLObjectType, GraphQLInt, GraphQLString, GraphQLList } from 'graphql'
import { MATERIALS_TYPE } from './materials.type'
import { SECTION_TYPE } from './section.type';
import { getUser } from '../../interactors/user.interactor';
import { DataStore } from '../../interfaces';


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
    invitations: { 
      type: GraphQLList(USER_TYPE),
      resolve(parentValue, args, context) {
        return Promise.all(
          parentValue.invitations.map(invite => {
            return invite
              .then(i => getUser({ dataStore: context.dataStore, email: i.email }))
              .catch(e => console.log(e));
          })
        )
      }
    },
    members: { type: GraphQLList(USER_TYPE) }
  })
});
