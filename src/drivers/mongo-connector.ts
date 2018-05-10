import { DataStore } from "../interfaces/DataStore";
import { MongoClient, Db, ObjectID } from "mongodb";
import { BcryptDriver } from '../drivers';
import * as dotenv from 'dotenv';

const COLLECTIONS = {
  USERS: 'users',
  BYTES: 'bytes',
  TABLES: 'tables'
}

export class MongoConnector implements DataStore {

  private db: Db;

  constructor() {
    dotenv.config();
    const uri = process.env.MONGO_URI;

    this.connect(uri);
  }

  async connect(dbURI: string): Promise<void> {
    try {
      this.db = (await MongoClient.connect(dbURI)).db("software-bytes");
      return Promise.resolve();
    } catch (e) {
      console.log(e);
      return Promise.reject('Error connecting to ' + dbURI);
    }
  }

  async getUsers() {
    try {
      return await this.db.collection(COLLECTIONS.USERS).find({}).toArray();
    } catch (e) {
      return Promise.reject(e);
    }
  }
  async getUserByID(id: string) {
    try {
      return await this.db.collection(COLLECTIONS.USERS).findOne({ _id: id });
    } catch (e) {
      return Promise.reject(e);
    }
  }
  async getUserByEmail(email: string) {
    try {
      return await this.db.collection(COLLECTIONS.USERS).findOne({ email });
    } catch (e) {
      return Promise.reject(e);
    }
  }

  async addUser(firstname: string, lastname: string, email: string, password: string) {
    const emailInUse = await this.isUser(email);
    if (!emailInUse) {
      try {
        const id = (new ObjectID).toString();
        const userDoc = { _id: id, firstname, lastname, email , password: await new BcryptDriver(10).hash(password) };
        const doc = await this.db.collection(COLLECTIONS.USERS).insertOne(userDoc);
        return Promise.resolve({ id, firstname, lastname, email });
      } catch (e) {
        return Promise.reject(e);
      }
    } else {
      return Promise.reject({ emailInUse });
    }
  }
  /**
   * Checks whether or not the email address is tied to an existing user.
   * 
   * @param email the email in question
   */
  private async isUser(email: string): Promise<boolean> {
    try {
      const doc = await this.db.collection(COLLECTIONS.USERS).findOne({ email })
      console.log(doc);
      return Promise.resolve(doc === null ? false : true);
    } catch (e) {
      return Promise.reject(e);
    }
  } 
  updateUser(id: string, name: string) {
    throw new Error('Method not implemented.');
  }
  deleteUser(id: string) {
    throw new Error('Method not implemented.');
  }
  async getByte(id: string) {
    try {
      return await this.db.collection(COLLECTIONS.BYTES).findOne({ _id: id });
    } catch (e) {
      return Promise.reject(e);
    }
  }
  async getBytes(userId?: string) {
    try {
      let byteQuery = {};
      if (userId) {
        const filter = userId ? { _id: userId } : { };
        const result = await this.db.collection(COLLECTIONS.USERS)
          .find(filter).project({ _id: 0, bytesCompleted: 1 }).toArray();
          
        if (result && result.length > 0) {
          const ids = result[0].bytesCompleted;
          if (ids == undefined) {
            return null;
          }
          byteQuery = { _id: { $in: ids } };
        } else return null;
      }
      
      const bytes = await this.db.collection(COLLECTIONS.BYTES)
        .find(byteQuery).toArray();

      return Promise.resolve(bytes);
      
    } catch (e) {
      return Promise.reject(e);
    }
  }
  async getTable(id: string): Promise<{ _id: string, hostId: string; members: any; invitations: any; bytes: string[] }> {
    try {
      const tableDoc = await this.db.collection('tables').findOne({ _id: id });
      return Promise.resolve(tableDoc);
    } catch(e) {
      return Promise.reject(e);
    }
  }
  async createTable(name: string, hostId: string): Promise<string> {
    try {
      const doc = { _id: (new ObjectID).toString(), name, hostId, members: [hostId] }
      const result = await this.db.collection("tables").insertOne(doc);
      
      const id = result.ops[0]['_id'];
      return Promise.resolve(id);
    } catch(e) {
      return Promise.reject(e);
    }
  }
  async inviteUserToTable(tableId: string, email: string): Promise<void> {
    try {
      const memberResult = await this.db.collection(COLLECTIONS.TABLES)
        .aggregate([
          { $match: { _id: tableId } },
          {
            $lookup: {
              from: COLLECTIONS.USERS,
              localField: 'members',
              foreignField: '_id',
              as: 'members_of_table'
            }
          },
          {
            $project: {
              members_of_table: {
                $filter: {
                  input: '$members_of_table',
                  as: 'table_member',
                  cond: { $eq: ['$$table_member.email', email] }
                }
              },
              _id: 0
            }
          },
          { $unwind: '$members_of_table' },
          { $project: { 'members_of_table._id': 1 } }
        ]).toArray();

      if (memberResult.length === 0) {
        const result = await this.db.collection(COLLECTIONS.TABLES)
          .updateOne({ _id: tableId }, { $push: { invitations: { email, dateSent: Date.now() } } }, { upsert: true });
      } else {
        return Promise.reject('This user is already a member of this table');
      }
      
    } catch(e) {
      return Promise.reject(e);
    }
  }
  async uninviteUserToTable(tableId: string, email: string): Promise<boolean> {
    try {
      const result = await this.db.collection('tables')
        .updateOne({ _id: tableId }, { $pull: { invitations: { email } } });
      
      if (result.modifiedCount > 0) {
        return Promise.resolve(true);
      } else {
        return Promise.resolve(false);
      }
    } catch (e) {
      return Promise.reject(e);
    }
  }
  async joinTable(tableId: string, userId: string) {
    try {
        const res = await this.db.collection(COLLECTIONS.TABLES)
          .aggregate([
            { $match: { _id: tableId } },
            {
              $lookup: {
                from: COLLECTIONS.USERS,
                localField: 'invitations.email',
                foreignField: 'email',
                as: 'user'
              }
            },
            { $project: { 
                user: {
                  $filter: {
                    input: '$user',
                    as: 'user',
                    cond: { $eq: [ '$$user._id', userId ]}
                  }
                }
              } 
            },
            { $unwind: '$user' }
          ]).toArray();
          
        if (res.length !== 1) {
          throw new Error(`${res.length} users linked to the invitation!`)
        } else {
          const user = res[0].user;
          const updateResult = await this.db.collection(COLLECTIONS.TABLES)
            .updateOne({ _id: tableId }, { $addToSet: { members: user._id } }, { upsert: true });
          if (updateResult.result.ok == 1) {
            const removalResult = await this.db.collection(COLLECTIONS.TABLES)
              .updateOne(
                { _id: tableId },
                { $pull: { invitations: { email: user.email } } }
              );
              return Promise.resolve(true);
          }
        }

    } catch (e) {
      return Promise.reject(e);
    }
  }
  async removeUserFromTable(tableId: string, userId: string) {
    try {
      const result = await this.db.collection(COLLECTIONS.TABLES)
        .updateOne({ _id: tableId }, { $pull: { members: userId }});

      if (result.result.nModified > 0) {
        return Promise.resolve(true);
      } else return Promise.resolve(false);
    } catch (e) {
      console.error(e);
      return Promise.reject(e);
    }
  }
  async getTablesByUser(userId: string) {
    try {
      const result = await this.db.collection(COLLECTIONS.TABLES)
        .aggregate([
          { $match: { 'members': userId } },
          { $project: { _id: 1 } }
        ]).toArray();
      if (result && result.length > 0) {
        const ids = result.map(record => record._id);
        const tables = await this.db.collection(COLLECTIONS.TABLES)
          .find({ _id: { $in: ids }})
          .toArray();
        return Promise.resolve(tables);
      }
    } catch (e) {
      return Promise.reject(e);
    }
  }
  async getInvitedTables(id: string) {
    try {
      const result = await this.db.collection(COLLECTIONS.USERS)
        .aggregate([
          { $match: { _id: id } },
          {
            $lookup: {
              from: COLLECTIONS.TABLES,
              localField: 'email',
              foreignField: 'invitations.email',
              as: 'tables_inviting_user'
            }
          },
          {
            $unwind: '$tables_inviting_user'
          },
          {
            $project: { _id: 0, tables_inviting_user: 1 }
          }
        ]).toArray();
      return Promise.resolve(result.map(doc => doc.tables_inviting_user));
    } catch (e) {
      console.error(e);
      return Promise.reject(e);
    }
  }
  async getByteSection(byteId, sectionId) {
    try {
      const result = await this.db.collection("bytes")
        .aggregate([
          { $match: { _id: byteId, 'sections.id': sectionId }},
          { $project: {
            sections: {
              $filter: {
                input: '$sections',
                as: 'section',
                cond: { $eq: [ '$$section.id', sectionId ]}
              }
            }
          }}
        ]).toArray();

      return Promise.resolve(result[0].sections[0]);
    } catch(e) {
      return Promise.reject(e);
    }
  }
  async completeByte(byteId: string, userId: string): Promise<boolean> {
    try {
      const result = await this.db.collection(COLLECTIONS.USERS)
        .updateOne({ _id: userId }, { $addToSet: { bytesCompleted: byteId } });
      if (result.modifiedCount > 0) {
        return Promise.resolve(true);
      } else {
        return Promise.resolve(false);
      }
    } catch (e) {
      return Promise.reject(e);
    }
  }
  async verifyUser(email: string, password: string): Promise<{ authenticated: boolean; firstname: string; lastname: string; email: string; id: string; }> {
    const user = await this.db.collection(COLLECTIONS.USERS).findOne({ email });
    if (user) {
      const authenticated = await new BcryptDriver(10).verify(password, user.password);
      if (authenticated) {
        return Promise.resolve({ authenticated, firstname: user.firstname, lastname: user.lastname, id: user._id, email });
      } else {
        return Promise.reject('Invalid credentials');
      }
    } else {
      return Promise.reject('Invalid credentials');
    }
  }
  async addByteToTable(tableId: string, byteId: string) {
    try {
      const result = await this.db.collection(COLLECTIONS.TABLES)
        .updateOne(
          { _id: tableId },
          { $addToSet: { bytes: byteId }},
          { upsert: true }
        );
      if (result.result.nModified > 0) {
        return Promise.resolve(true);
      } else return Promise.resolve(false);
    } catch (error) {
      console.error(error);
      return Promise.reject(error);
    }
  }
  async removeByteFromTable(tableId: string, byteId: string) {
    try {
      const result = await this.db.collection(COLLECTIONS.TABLES)
        .updateOne(
          { _id: tableId },
          { $pull: { bytes: byteId } }
        );
      if (result.result.nModified > 0) {
        return Promise.resolve(true);
      } else return Promise.resolve(false);
    } catch (error) {
      console.error(error);
      return Promise.reject(error);
    }
  }
}

interface TableDocument {
  name: string;
  hostId: string;
  meals: any;
  members: any;
  invitations: any;
}