import { DataStore } from "../interfaces/DataStore";
import { getUser } from "./user.interactor";

export async function getByte(dataStore: DataStore, id: string) {
  const byte = await dataStore.getByte(id);
  const user = await getUser(dataStore, byte.creatorId);
  delete byte.creatorId;
  return { ...byte, creator: user };
}

export function getBytes(dataStore: DataStore) {
  return dataStore.getBytes();
}

export async function validateSection({ dataStore, byteId, sectionId, answers }) {
  const section = await dataStore.getByteSection(byteId, sectionId);
  const isCorrect = [];
  for (let i = 0; i < section.questions.length; i++) {
    isCorrect.push(
      section.questions[i].answerId === answers[i]
    );
  }

  return isCorrect;
}