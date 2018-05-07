import { DataStore } from "../interfaces/DataStore";
import { getUser } from "./user.interactor";

export async function getByte(dataStore: DataStore, id: string) {
  const byte = await dataStore.getByte(id);
  if (byte) {
    const user = await getUser({ dataStore, id: byte.creatorID });
    delete byte.creatorID;
    return { ...byte, id: byte._id, creator: user };
  } else {
    return null;
  }
}

export async function getBytes(dataStore: DataStore) {
  const bytes = await dataStore.getBytes();
  return await bytes.map(async byte => ({ ...byte, id: byte._id, creator: getUser({ dataStore, id: byte.creatorID }) }))
}

export async function validateSection({ dataStore, byteId, sectionId, answers }) {
  const section = await dataStore.getByteSection(byteId, sectionId);
  const isCorrect = [];
  for (let i = 0; i < section.questions.length; i++) {
    isCorrect.push(
      section.questions[i].answerId == answers[i]
    );
  }
  return isCorrect;
}