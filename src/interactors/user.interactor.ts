import { DataStore } from "../interfaces/DataStore";

export async function getUsers(dataStore: DataStore) {
  const users = await dataStore.getUsers();
  return users.map(user => ({ ...user, name: `${user.firstname} ${user.lastname}`}))
}
export function getUser({ dataStore, id, email }: { dataStore: DataStore, id?: string, email?: string }) {
  if (id) {
    const user = dataStore.getUserByID(id);
    return { ...user, name: `${user.firstname} ${user.lastname}` };
  } else if (email) {
    const user = dataStore.getUserByEmail(email)
    return { ...user, name: `${user.firstname} ${user.lastname}` };;
  }
}
export function updateUser(dataStore: DataStore, id: string, name: string) {
  return dataStore.updateUser(id, name);
}
export function deleteUser(dataStore: DataStore, id: string) {
  return dataStore.deleteUser(id);
}