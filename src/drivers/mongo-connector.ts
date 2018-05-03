<<<<<<< HEAD
import { DataStore } from "../interfaces/DataStore";
import { MongoClient, Db, ObjectID } from "mongodb";
import * as dotenv from 'dotenv';
=======
import { DataStore } from '../interfaces/DataStore';
import { MongoClient, Db } from 'mongodb';
>>>>>>> bfa9e37328a903bfc1d34d8c56b1cb3fec3cf621

export class MongoConnector implements DataStore {
  private db: Db;

  constructor() {
    dotenv.config();
    const uri = process.env.MONGO_URI;

    this.connect(uri);
  }

  async connect(dbURI: string): Promise<void> {
    try {
<<<<<<< HEAD
      this.db = (await MongoClient.connect(dbURI)).db("software-bytes");
=======
      this.db = (await MongoClient.connect(dbURI)).db('test-db');
>>>>>>> bfa9e37328a903bfc1d34d8c56b1cb3fec3cf621
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
<<<<<<< HEAD
      const doc = { _id: (new ObjectID).toString(), name, hostId }
      const result = await this.db.collection("tables").insertOne(doc);
      
=======
      const doc = { name, hostId }
      await this.db.collection('tables').insertOne(doc);
>>>>>>> bfa9e37328a903bfc1d34d8c56b1cb3fec3cf621
      // TODO: Check for success before resolve
      const id = result.ops[0]['_id'];
      return Promise.resolve(id);
    } catch(e) {
      return Promise.reject(e);
    }
  }
<<<<<<< HEAD
  async inviteUserToTable(tableId: string, email: string): Promise<void> {
    try {
      const result = await this.db.collection('tables')
        .updateOne({ _id: tableId }, { $push: { invites: { email, dateSent: Date.now() } } }, { upsert: true });
    } catch(e) {
      return Promise.reject(e);
    }
=======
  inviteUserToTable(tableId: string, email: string): Promise<void> {
    throw new Error('Method not implemented.');
>>>>>>> bfa9e37328a903bfc1d34d8c56b1cb3fec3cf621
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