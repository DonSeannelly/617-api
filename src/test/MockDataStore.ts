import { DataStore } from "../interfaces/DataStore";

export class MockDataStore implements DataStore {


  getTable(id: string): Promise<{ hostId: string; members: any; invitations: any; bytes: string[]; }> {
    throw new Error("Method not implemented.");
  }
  verifyUser(email: string, password: string): Promise<{ authenticated: boolean; firstname: string; lastname: string; }> {
    throw new Error("Method not implemented.");
  }
  createTable(name: string, hostId: string): Promise<string> {
    throw new Error("Method not implemented.");
  }
  getByteSection(byteId: any, sectionId: any) {
    throw new Error("Method not implemented.");
  }
  getUserByEmail(email: string) {
    throw new Error("Method not implemented.");
  }
  inviteUserToTable(tableId: string, email: string): Promise<void> {
    throw new Error("Method not implemented.");
  }
  joinTable(tableId: string, userId: string) {
    throw new Error("Method not implemented.");
  }
  getUsers() {
    throw new Error("Method not implemented.");
  }
  getUserByID(id: string) {
    return {
      "_id": "1",
      "firstname": "John",
      "lastname": "Doe"
    }
  }
  addUser(name: string) {
    throw new Error("Method not implemented.");
  }
  updateUser(id: string, name: string) {
    throw new Error("Method not implemented.");
  }
  deleteUser(id: string) {
    throw new Error("Method not implemented.");
  }
  getByte(id: string) {
    return {
      "id": "1",
      "name": "JohnDoeByte",
      "description": "Learn how to John Doe.",
      "date": "654344662",
      "creatorID": "1",
      "sections": [
        {
          "id": "0",
          "name": "Section Uno",
          "description": "This is the first section",
          "videoIn": "01:22:03",
          "vidoOut": "01:23:50",
          "questions": [
            {
              "text": "Q1",
              "answerId": 0,
              "options": [
                {
                  "id": 0,
                  "text": "Option 1"
                },
                {
                  "id": 1,
                  "text": "Option 2"
                },
                {
                  "id": 2,
                  "text": "Option 3"
                },
                {
                  "id": 3,
                  "text": "Option 4"
                }
              ]
            },
            {
              "text": "Q2",
              "answerId": 3,
              "options": [
                {
                  "id": 0,
                  "text": "Option 1"
                },
                {
                  "id": 1,
                  "text": "Option 2"
                },
                {
                  "id": 2,
                  "text": "Option 3"
                },
                {
                  "id": 3,
                  "text": "Option 4"
                }
              ]
            }
          ]
        },
        {
          "id": "0",
          "name": "Section Zwei",
          "description": "This is the second section",
          "videoIn": "01:22:03",
          "vidoOut": "01:23:50",
          "questions": [
            {
              "text": "Q1",
              "answerId": 2,
              "options": [
                {
                  "id": 0,
                  "text": "Option 1"
                },
                {
                  "id": 1,
                  "text": "Option 2"
                },
                {
                  "id": 2,
                  "text": "Option 3"
                },
                {
                  "id": 3,
                  "text": "Option 4"
                }
              ]
            }
          ]
        }
      ]
    }
  }
  getBytes() {
    throw new Error("Method not implemented.");
  }
}