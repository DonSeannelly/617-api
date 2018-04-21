import { DataStore } from "../interfaces/DataStore";
const axios = require('axios');
// import * as axios from "axios"; Why doesn't this work?

export class JsonStore implements DataStore {
  joinTable(tableId: string, userId: string) {
    throw new Error("Method not implemented.");
  }
  getUsers() {
    return axios.get(`http://localhost:3000/users`)
      .then(res => res.data);
  }
  getUserByID(id: string) {
    return axios.get(`http://localhost:3000/users?id=${id}`)
      .then(res => res.data);
  }
  getUserByEmail(email: string) {
    return axios.get(`http://localhost:3000/users?email=${email}`)
      .then(res => res.data);
  }
  addUser(name: string) {
    return axios.post('http://localhost:3000/users', {
      name
    }).then(res => res.data);
  }
  updateUser(id: string, name: string) {
    return axios.patch('http://localhost:3000/users/' + id, { id, name })
      .then(res => res.data);
  }
  deleteUser(id: string) {
    return axios.delete('http://localhost:3000/users/' + id)
      .then(res => res.data);
  }
  getByte(id: string) {
    return axios.get(`http://localhost:3000/bytes/${id}`)
      .then(res => res.data);
  }
  getBytes() {
    return axios.get(`http://localhost:3000/bytes`)
      .then(res => res.data);
  }
  getTable(id: string) {
    return axios.get(`http://localhost:3000/tables/${id}`)
      .then(res => res.data);
  }
  inviteUserToTable(tableId: string, email: string): Promise<void> {
    return axios.post(`http://localhost:3000/tables/${tableId}/invites`, {
      // TODO: Add id generation
      email,
      dateSent: Date.now()
    })
      .then(res => res.data);
  }
  createTable(name: string, hostId: string): Promise<void> {
    return Promise.resolve();
  }
}