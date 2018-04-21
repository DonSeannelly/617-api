export interface DataStore {
  getUsers();
  getUserByID(id: string);
  getUserByEmail(email: string);
  addUser(name: string);
  updateUser(id: string, name: string);
  deleteUser(id: string);
  getByte(id: string);
  getBytes();
  getTable(id: string): Promise<{ hostId: string; members: any; invitations: any; }>;
  createTable(name: string, hostId: string): Promise<void>;
  inviteUserToTable(tableId: string, email: string): Promise<void>;
  joinTable(tableId: string, userId: string);
}