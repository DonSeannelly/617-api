const {
  GraphQLObjectType,
  GraphQLString,
  GraphQLInt,
  GraphQLSchema,
  GraphQLList,
  GraphQLNonNull
} = require('graphql');

import { UserSchema } from './user.schema';
// FIXME: get from index
import { DataStore } from '../interfaces/DataStore';
import { ByteSchema } from './byte.schema';
import { TableSchema } from './table.schema';

export class SchemaBuilder {

  public static buildSchema(dataStore: DataStore) {
    const userSchema = new UserSchema(dataStore);
    const byteSchema = new ByteSchema(dataStore);
    const tableSchema = new TableSchema(dataStore);

    const RootQuery = new GraphQLObjectType({
      name: 'RootQueryType',
      fields: {
        user: userSchema.user,
        users: userSchema.users,
        byte: byteSchema.byte,
        bytes: byteSchema.bytes,
        table: tableSchema.table
      }
    });

    const mutation = new GraphQLObjectType({
      name: 'Mutation',
      fields: {
        deleteUser: userSchema.deleteUser,
        updateUser: userSchema.updateUser,
        inviteUser: tableSchema.inviteUser,
        createTable: tableSchema.createTable,
        joinTable: tableSchema.joinTable,
        validateSection: byteSchema.validateSection,
        completeByte: byteSchema.completeByte,
        addByteToTable: tableSchema.addByte,
        removeByteFromTable: tableSchema.removeByte
      }
    });

    return new GraphQLSchema({
      query: RootQuery,
      mutation
    })
  }
}
