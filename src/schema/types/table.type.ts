import { USER_TYPE } from './../user.schema';
import { ByteType } from './byte.type';
import { GraphQLObjectType, GraphQLInt, GraphQLString, GraphQLList } from 'graphql'
import { MATERIALS_TYPE } from './materials.type'
import { SECTION_TYPE } from './section.type';
import { getUser } from '../../interactors/user.interactor';
import { DataStore } from '../../interfaces';
import { getByte } from '../../interactors/byte.interactor';


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
    id: { 
      type: GraphQLString,
      resolve(parentValue, args, context) {
        if (parentValue._id) return parentValue._id;
      }
    },
    name: {
      type: GraphQLString,
      resolve(parentValue, args, context) {
        if (parentValue.name) return parentValue.name;
      }
    },
    owner: { 
      type: USER_TYPE,
      resolve(parentValue, args, context) {
        if (parentValue.hostId) return getUser({ dataStore: context.dataStore, id: parentValue.hostId });
      }
    },
    bytes: {
      type: GraphQLList(ByteType),
      resolve(parentValue, args, context) {
        if (parentValue.bytes) {
          return parentValue.bytes.map(async byteId => await getByte(context.dataStore, byteId))
        }
      }
    },
    invitations: { 
      type: GraphQLList(USER_TYPE),
      resolve(parentValue, args, context) {
        const invitations = Promise.resolve<any[]>(parentValue.invitations);

        return invitations.then(invitations => {
          return invitations ? Promise.all(
            invitations.map(invite => {
              return getUser({ dataStore: context.dataStore, email: invite.email });
            })
          ) : null;
        }).catch(e => console.log(e));
        
      }
    },
    members: {
      type: GraphQLList(USER_TYPE),
      resolve(parentValue, args, context) {
        const members = Promise.resolve<any[]>(parentValue.members);

        return members.then(members => {
          return members ? Promise.all (
            members.map(member => getUser({ dataStore: context.dataStore, id: member }))
          ) : null;
        });
      }
    }
  })
});
