import { DataStore } from "../interfaces/DataStore";
import { MongoClient, Db, ObjectID } from "mongodb";
import * as dotenv from 'dotenv';

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

  getUsers() {
    throw new Error('Method not implemented.');
  }
  getUserByID(id: string) {
    throw new Error('Method not implemented.');
  }
  getUserByEmail(email: string) {
    throw new Error('Method not implemented.');
  }
  addUser(name: string) {
    throw new Error('Method not implemented.');
  }
  updateUser(id: string, name: string) {
    throw new Error('Method not implemented.');
  }
  deleteUser(id: string) {
    throw new Error('Method not implemented.');
  }
  getByte(id: string) {
    throw new Error('Method not implemented.');
  }
  getBytes() {
    throw new Error('Method not implemented.');
  }
  async getTable(id: string): Promise<{ hostId: string; members: any; invitations: any; }> {
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
        .find({ _id: byteId, sections: { $elemMatch: { _id: sectionId } } });
      console.log(result);
      return Promise.resolve(result);
    } catch(e) {
      return Promise.reject(e);
    }
  }
}

interface TableDocument {
  name: string;
  hostId: string;
  // TODO: 
  meals: any;
  members: any;
  invites: any;
}