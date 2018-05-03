import { DataStore } from "../interfaces/DataStore";

export async function getUsers(dataStore: DataStore) {
  const users = await dataStore.getUsers();
  return users.map(user => ({ ...user, name: `${user.firstname} ${user.lastname}`, id: user._id }))
}
export async function getUser({ dataStore, id, email }: { dataStore: DataStore, id?: string, email?: string }) {
  if (id) {
    const user = await dataStore.getUserByID(id);
    return { ...user, name: `${user.firstname} ${user.lastname}`, id: user._id };
  } else if (email) {
    const user = await dataStore.getUserByEmail(email)
    return { ...user, name: `${user.firstname} ${user.lastname}`, id: user._id };;
  }
}
export function updateUser(dataStore: DataStore, id: string, name: string) {
  return dataStore.updateUser(id, name);
}
export function deleteUser(dataStore: DataStore, id: string) {
  return dataStore.deleteUser(id);
}