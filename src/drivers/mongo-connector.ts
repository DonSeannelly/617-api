import { DataStore } from "../interfaces/DataStore";
import { MongoClient, Db, ObjectID } from "mongodb";
import { BcryptDriver } from '../drivers';
import * as dotenv from 'dotenv';

const COLLECTIONS = {
  USERS: 'users',
  BYTES: 'bytes'
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
  async getBytes() {
    try {
      return await this.db.collection(COLLECTIONS.BYTES).find({}).toArray();
    } catch (e) {
      return Promise.reject(e);
    }
  }
  async getTable(id: string): Promise<{ hostId: string; members: any; invitations: any; bytes: string[] }> {
    try {
      const tableDoc = await this.db.collection('tables').findOne({ _id: id });
      return Promise.resolve(tableDoc);
    } catch(e) {
      return Promise.reject(e);
    }
  }
  async createTable(name: string, hostId: string): Promise<string> {
    try {
      const doc = { _id: (new ObjectID).toString(), name, hostId }
      const result = await this.db.collection("tables").insertOne(doc);
      
      // TODO: Check for success before resolve
      const id = result.ops[0]['_id'];
      return Promise.resolve(id);
    } catch(e) {
      return Promise.reject(e);
    }
  }
  async inviteUserToTable(tableId: string, email: string): Promise<void> {
    try {
      const result = await this.db.collection('tables')
        .updateOne({ _id: tableId }, { $push: { invites: { email, dateSent: Date.now() } } }, { upsert: true });
    } catch(e) {
      return Promise.reject(e);
    }
  }
  joinTable(tableId: string, userId: string) {
    throw new Error('Method not implemented.');
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
}

interface TableDocument {
  name: string;
  hostId: string;
  meals: any;
  members: any;
  invites: any;
}