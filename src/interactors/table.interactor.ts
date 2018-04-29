import { DataStore } from "../interfaces/DataStore";
import { getUser } from "./user.interactor";

export async function createTable(dataStore: DataStore, name: string, hostId: string) {
  const table = await dataStore.createTable(name, hostId);
  console.log(table);
  return { name, hostId }
}

export async function getTable(dataStore: DataStore, id: string) {
  const table = await dataStore.getTable(id);
  const owner = await getUser({dataStore, id: table.ownerId});
  delete table.ownerId;

  const resolvedMembers = table.members.map(async member => {
    let resolvedUser = await getUser({ dataStore, id: member.userId });
    delete member.userId;
    return { ...member, ...resolvedUser };
  });

  const resolvedInvited = table.invitations.map(async user => {
    let resolvedUser = await getUser({ dataStore, id: user.userId });
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

export async function inviteUserToTable(dataStore: DataStore, tableId: string, email: string) {
  await dataStore.inviteUserToTable(tableId, email);
  const invitee = await dataStore.getUserByEmail(email);
  return { invitee };
}

export async function joinTable(dataStore: DataStore, tableId: string, userId: string) {
  await dataStore.joinTable(tableId, userId);
}