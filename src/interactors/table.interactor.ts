import { DataStore } from "../interfaces/DataStore";
import { getUser, constructUser } from "./user.interactor";
import { getByte } from "./byte.interactor";
import { NotificationManager } from "../interfaces/NotificationManager";

export async function createTable(dataStore: DataStore, name: string, hostId: string) {
  const id = await dataStore.createTable(name, hostId);
  return { id } // return { name, hostId }
}

export async function getTable(dataStore: DataStore, id: string) {
  const table = await dataStore.getTable(id);
  
  return {
    ...table, 
    id: table._id
  }
}

export async function inviteUserToTable(dataStore: DataStore, notificationManager: NotificationManager, tableId: string, email: string) {
  await dataStore.inviteUserToTable(tableId, email);
  const invitee = await dataStore.getUserByEmail(email);

  const text =`You have been invited to a new table! Log in to SoftwareBytes to check it out!\n\nhttps://softwarebytes.herokuapp.com`;
  notificationManager.sendInvite(email,text);
  return constructUser(invitee);
}

export async function joinTable(dataStore: DataStore, tableId: string, userId: string) {
  return await dataStore.joinTable(tableId, userId);
}

export async function addByteToTable(dataStore: DataStore, tableId: string, byteId: string) {
  return await dataStore.addByteToTable(tableId, byteId);
}

export async function removeByteFromTable(dataStore: DataStore, tableId: string, byteId: string) {
  return await dataStore.removeByteFromTable(tableId, byteId);
}

export async function removeUserFromTable(dataStore: DataStore, tableId: string, byteId: string) {
  return await dataStore.removeUserFromTable(tableId, byteId);
}

export async function uninviteUserToTable(dataStore: DataStore, tableId: string, email: string) {
  await dataStore.uninviteUserToTable(tableId, email);
  const user = await dataStore.getUserByEmail(email);
  return constructUser(user);
}
