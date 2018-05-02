import { DataStore } from '../interfaces/DataStore';
import { MongoClient, Db } from 'mongodb';

export class MongoConnector implements DataStore {
  private db: Db;

  constructor() {
    const uri = process.env.APPTZR_DB_URI;

    this.connect(uri);
  }

  async connect(dbURI: string): Promise<void> {
    try {
      this.db = (await MongoClient.connect(dbURI)).db('test-db');
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
  async createTable(name: string, hostId: string): Promise<void> {
    try {
      const doc = { name, hostId }
      await this.db.collection('tables').insertOne(doc);
      // TODO: Check for success before resolve
      return Promise.resolve();
    } catch(e) {
      return Promise.reject(e);
    }
  }
  inviteUserToTable(tableId: string, email: string): Promise<void> {
    throw new Error('Method not implemented.');
  }
  joinTable(tableId: string, userId: string) {
    throw new Error('Method not implemented.');
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