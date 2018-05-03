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
import { createTable, getTable, inviteUserToTable, joinTable } from '../interactors/table.interactor';
import { USER_TYPE } from './user.schema';

export class TableSchema {
  table;
  inviteUser;
  createTable;
  joinTable;

  constructor(private dataStore: DataStore) {
    this.table = {
      type: TABLE_TYPE,
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
          id: { type: GraphQLString }
        })
      }),
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
      args: {
        tableId: { type: GraphQLString },
        userId: { type: GraphQLString },
      },
      resolve(parentValue, args) {
        return joinTable(dataStore, args.tableId, args.userId);
      }
    }
  }
}