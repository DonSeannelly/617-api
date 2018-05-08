import { DataStore } from "../interfaces/DataStore";
import { getUser } from "./user.interactor";
import { getByte } from "./byte.interactor";

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

function mapMembers({ dataStore, members }) {
  return members.map(async member => {
    let resolvedUser = await getUser({ dataStore, id: member });
    return { ...resolvedUser };
  });
}

export async function inviteUserToTable(dataStore: DataStore, tableId: string, email: string) {
  await dataStore.inviteUserToTable(tableId, email);
  // const invitee = await dataStore.getUserByEmail(email);
  return { name: "Sean" }
  // return { invitee };
}

export async function joinTable(dataStore: DataStore, tableId: string, userId: string) {
  await dataStore.joinTable(tableId, userId);
}

export async function addByteToTable(dataStore: DataStore, tableId: string, byteId: string) {
  return await dataStore.addByteToTable(tableId, byteId);
}

export async function removeByteFromTable(dataStore: DataStore, tableId: string, byteId: string) {
  return await dataStore.removeByteFromTable(tableId, byteId);
}