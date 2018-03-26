import { DataStore } from "../interfaces/DataStore";
import { getUser } from "./user.interactor";

export async function getTable(dataStore: DataStore, id: string) {
  const table = await dataStore.getTable(id);
  const owner = await getUser(dataStore, table.ownerId);
  delete table.ownerId;

  const resolvedMembers = table.members.map(async member => {
    let resolvedUser = await getUser(dataStore, member.userId);
    delete member.userId;
    return { ...member, ...resolvedUser };
  });

  const resolvedInvited = table.invitations.map(async user => {
    let resolvedUser = await getUser(dataStore, user.userId);
    delete user.userId;
    return { ...user, ...resolvedUser };
  });

  return {
    ...table, 
    owner, 
    members: resolvedMembers,
    invitations: resolvedInvited
  }
}