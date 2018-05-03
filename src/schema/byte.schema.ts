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
import { ByteType } from './types/byte.type';
import { getByte, getBytes, validateSection } from '../interactors/byte.interactor';

export class ByteSchema {
  bytes;
  byte;
  validateSection;

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

    this.validateSection = {
      type: GraphQLList(GraphQLBoolean),
      args: {
        byteId: { type: GraphQLString },
        sectionId: { type: GraphQLString },
        answers: { type: GraphQLList(GraphQLInt) }
      },
      resolve(parentValue, args) {
        return validateSection({ dataStore, ...args });
      }
    }
  }
}