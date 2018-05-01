import { DataStore } from "../interfaces/DataStore";
import { getUser } from "./user.interactor";

export async function getByte(dataStore: DataStore, id: string) {
  const byte = await dataStore.getByte(id);
  const user = await getUser({ dataStore, id: byte.creatorId });
  delete byte.creatorId;
  return { ...byte, creator: user };
}

export function getBytes(dataStore: DataStore) {
  return dataStore.getBytes();
}