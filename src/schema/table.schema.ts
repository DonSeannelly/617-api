import {
  GraphQLObjectType,
  GraphQLString,
  GraphQLInt,
  GraphQLSchema,
  GraphQLList,
  GraphQLNonNull,
  GraphQLBoolean
} from 'graphql';
import { DataStore } from '../interfaces/DataStore';
import { TABLE_TYPE } from './types/table.type';
import { createTable, getTable, inviteUserToTable, joinTable, addByteToTable, removeByteFromTable, removeUserFromTable, uninviteUserToTable } from '../interactors/table.interactor';
import { USER_TYPE } from './user.schema';

export class TableSchema {
  table;
  inviteUser;
  createTable;
  joinTable;
  addByte;
  removeByte;
  removeUser;
  uninviteUser;

  constructor(private dataStore: DataStore) {
    this.table = {
      type: TABLE_TYPE,
      description: 'Resolves a table by it\'s unique identifier',
      args: {
        id: { type: GraphQLString }
      },
      resolve(parentValue, args) {
        return getTable(dataStore, args.id);
      }
    }

    this.createTable = {
      type: new GraphQLObjectType({
        name: 'TableCreationEvent',
        fields: () => ({
          id: { 
            type: GraphQLString, 
            description: 'The unique identifier of the table created' 
          }
        })
      }),
      description: 'Creates a new table',
      args: {
        name: { type: GraphQLString },
        hostId: { type: GraphQLString }
      },
      resolve(parentValue, args) {
        return createTable(dataStore, args.name, args.hostId);
      }
    }

    this.inviteUser = {
      type: USER_TYPE,
      description: 'Sends a table invitation to a given email address. Resolves a user if the email is linked to an existing user account.',
      args: {
        tableId: { type: GraphQLString },
        email: { type: GraphQLString }
      },
      resolve(parentValue, args) {
        return inviteUserToTable(dataStore, args.tableId, args.email);
      }
    }

    this.joinTable = {
      type: GraphQLBoolean,
      description: 'Adds a user to a table if they have a pending invitation',
      args: {
        tableId: { type: GraphQLString },
        userId: { type: GraphQLString },
      },
      resolve(parentValue, args) {
        return joinTable(dataStore, args.tableId, args.userId);
      }
    }

    this.addByte = {
      type: GraphQLBoolean,
      description: 'Adds a byte to a table\'s offerings',
      args: {
        tableId: { type: GraphQLString },
        byteId: { type: GraphQLString },
      },
      resolve(parentValue, args, context) {
        return addByteToTable(context.dataStore, args.tableId, args.byteId);
      }
    }

    this.removeByte = {
      type: GraphQLBoolean,
      description: 'Removes a byte from a table\'s offerings',
      args: {
        tableId: { type: GraphQLString },
        byteId: { type: GraphQLString },
      },
      resolve(parentValue, args, context) {
        return removeByteFromTable(context.dataStore, args.tableId, args.byteId);
      }
    }

    this.removeUser = {
      type: GraphQLBoolean,
      description: 'Removes a user from a table\'s list of members',
      args: {
        tableId: { type: GraphQLString },
        userId: { type: GraphQLString },
      },
      resolve(parentValue, args, context) {
        return removeUserFromTable(context.dataStore, args.tableId, args.userId);
      }
    }

    this.uninviteUser = {
      type: USER_TYPE,
      description: 'Cancels the invitation to the user to join a table',
      args: {
        tableId: { type: GraphQLString },
        email: { type: GraphQLString }
      },
      resolve(parentValue, args) {
        return uninviteUserToTable(dataStore, args.tableId, args.email);
      }
    }
  }
}