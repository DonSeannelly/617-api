export interface DataStore {
  getUsers();
  getUserByID(id: string);
  getUserByEmail(email: string);
  addUser(firstname: string, lastname: string, email: string, password: string);
  updateUser(id: string, name: string);
  deleteUser(id: string);
  getByte(id: string);
  getBytes();
  getTable(id: string): Promise<{ hostId: string; members: any; invitations: any; bytes: string[] }>;
  createTable(name: string, hostId: string): Promise<string>;
  inviteUserToTable(tableId: string, email: string): Promise<void>;
  joinTable(tableId: string, userId: string);
  getByteSection(byteId, sectionId);
  verifyUser(email: string, password: string): Promise<{ authenticated: boolean, firstname: string, lastname: string }>;
}