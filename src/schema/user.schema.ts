import { DataStore } from "../interfaces/DataStore";
import { getUser, getUsers, updateUser, deleteUser, getUsersBytes, getTablesByUser, getInvitedTables } from '../interactors/user.interactor';
import { ByteType } from "./types/byte.type";
import { TABLE_TYPE } from "./types/table.type";

const {
  GraphQLObjectType,
  GraphQLString,
  GraphQLInt,
  GraphQLSchema,
  GraphQLList,
  GraphQLNonNull
} = require('graphql');

export const USER_TYPE = new GraphQLObjectType({
  name: 'User',
  fields: () => ({
    id: { type: GraphQLString },
    name: { type: GraphQLString },
    firstname: { type: GraphQLString },
    lastname: { type: GraphQLString },
    email: { type: GraphQLString },
    profilePicture:{type: GraphQLString },
    bytesCompleted: {
      type: GraphQLList(ByteType),
      resolve(parentValue, args, ctx) {
        return getUsersBytes({ dataStore: ctx.dataStore, id: parentValue._id });
      }
    },
    tables: {
      type: GraphQLList(TABLE_TYPE),
      description: 'The tables that this user belongs to',
      resolve(parentValue, args, context) {
        return getTablesByUser(context.dataStore, parentValue.id);
      }
    },
    invitations: {
      type: GraphQLList(TABLE_TYPE),
      description: 'The tables that the user has been invited to',
      resolve(parentValue, args, context) {
        return getInvitedTables(context.dataStore, parentValue.id);
      }
    }
  })
});

export class UserSchema {
  user;
  users;
  deleteUser;
  updateUser;

  constructor(private dataStore: DataStore) {

    this.user = {
      type: USER_TYPE,
        args: {
        id: { type: GraphQLString }
      },
      resolve(parentValue, args) {
        return getUser({ dataStore, id: args.id });
      }
    };

    this.users = {
      type: new GraphQLList(USER_TYPE),
      resolve(parentValue, args) {
        return getUsers(dataStore);
      }
    };

    this.deleteUser = {
      type: USER_TYPE,
        args: {
        id: { type: new GraphQLNonNull(GraphQLString) }
      },
      resolve(parentValue, args) {
        // Call interactor here to handle business logic
        return deleteUser(dataStore, args.id);
      }
    };

    this.updateUser = {
      type: USER_TYPE,
        args: {
        id: { type: new GraphQLNonNull(GraphQLString) },
        name: { type: GraphQLString }
      },
      resolve(parentValue, args) {
        // Call interactor here to handle business logic
        return updateUser(dataStore, args.id, args.name);
      }
    };
  }
}
