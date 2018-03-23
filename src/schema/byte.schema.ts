import {
  GraphQLObjectType,
  GraphQLString,
  GraphQLInt,
  GraphQLSchema,
  GraphQLList,
  GraphQLNonNull
} from 'graphql';
import { DataStore } from '../interfaces/DataStore';
import { ByteType } from './types/byte.type';
import { getByte, getBytes } from '../interactors/byte.interactor';

export class ByteSchema {
  bytes;
  byte;

  constructor(private dataStore: DataStore) {
    this.byte = {
      type: ByteType,
      args: {
        id: { type: GraphQLString }
      },
      resolve(parentValue, args) {
        return getByte(dataStore, args.id);
      }
    }

    this.bytes = {
      type: GraphQLList(ByteType),
      resolve(parentValue, args) {
        return getBytes(dataStore);
      }
    }
  }
}