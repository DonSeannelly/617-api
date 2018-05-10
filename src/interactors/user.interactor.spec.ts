import { MockDataStore } from "../test/MockDataStore";
import { getUser } from "./user.interactor";


const testDataStore = new MockDataStore()

describe('UserInteractor#getUser', () => {
  it('Returns null when no email or id is provided', () => {
    return getUser({ dataStore: testDataStore })
      .then(data => {
        expect(data).toBeNull();
      })
  })
  it('Return a user given their id', () => {
    const id = testDataStore.users[0]._id;
    return getUser({ dataStore: testDataStore, id })
      .then(data => {
        expect(data.id).toEqual(id);
      })
  })
  it('Return a user given their email', () => {
    const email = testDataStore.users[0].email;
    return getUser({ dataStore: testDataStore, email })
      .then(data => {
        expect(data.email).toEqual(email);
      })
  })
})