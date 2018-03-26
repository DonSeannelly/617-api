import {
  GraphQLObjectType,
  GraphQLString,
  GraphQLInt,
  GraphQLSchema,
  GraphQLList,
  GraphQLNonNull
} from 'graphql';
import { DataStore } from '../interfaces/DataStore';
import { TableType } from './types/table.type';
import { getTable } from '../interactors/table.interactor';

export class TableSchema {
  table;

  constructor(private dataStore: DataStore) {
    this.table = {
      type: TableType,
      args: {
        id: { type: GraphQLString }
      },
      resolve(parentValue, args) {
        return getTable(dataStore, args.id);
      }
    }
  }
}