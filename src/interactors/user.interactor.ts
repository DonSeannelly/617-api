import { DataStore } from "../interfaces/DataStore";

export function getUsers(dataStore: DataStore) {
  return dataStore.getUsers();
}
export function getUser({ dataStore, id, email }: { dataStore: DataStore, id?: string, email?: string }) {
  if (id) {
    return dataStore.getUserByID(id);
  } else if (email) {
    return dataStore.getUserByEmail(email);
  }
}
export function addUser(dataStore: DataStore, user: UserRegistrationInfo) {
  return dataStore.addUser(name);
}
export function updateUser(dataStore: DataStore, id: string, name: string) {
  return dataStore.updateUser(id, name);
}
export function deleteUser(dataStore: DataStore, id: string) {
  return dataStore.deleteUser(id);
}

interface UserRegistrationInfo {
  auth0ID: string; // user._id
  name: string;
  given_name;
  family_name;
  profile_picture;
  social_connections: {
    provider: string; // context.connection
    id: string; // user.user_id
  }[];
}