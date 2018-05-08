import { DataStore } from "../interfaces/DataStore";

export async function getUsers(dataStore: DataStore) {
  const users = await dataStore.getUsers();
  return users.map(user => (constructUser(user)))
}
export async function getUser({ dataStore, id, email }: { dataStore: DataStore, id?: string, email?: string }) {
  if (!(id || email)) {
    return null;
  }

  let user;

  if (id) {
    user = await dataStore.getUserByID(id);
  } else if (email) {
    user = await dataStore.getUserByEmail(email);
  }
  return constructUser(user);
}

export async function getUsersBytes({ dataStore, id }: { dataStore: DataStore, id: string }) {
  const bytes = await dataStore.getBytes(id);
  return bytes;
}

export function updateUser(dataStore: DataStore, id: string, name: string) {
  return dataStore.updateUser(id, name);
}
export function deleteUser(dataStore: DataStore, id: string) {
  return dataStore.deleteUser(id);
}

export async function getTablesByUser(dataStore: DataStore, id: string) {
  return await dataStore.getTablesByUser(id);
}

export async function getInvitedTables(dataStore: DataStore, id: string) {
  return await dataStore.getInvitedTables(id);
}

function constructUser(user) {
  return { ...user, name: `${user.firstname} ${user.lastname}`, id: user._id };
}