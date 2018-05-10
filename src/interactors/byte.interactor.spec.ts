import { getByte, getBytes } from './byte.interactor'
import { MockDataStore } from '../test/MockDataStore'

const testDataStore = new MockDataStore()

describe('ByteInteractor#getByte', () => {
  it('Removes creator id', () => {
    return getByte(testDataStore, "1").then(data => {
      expect(data.creatorId).toBeUndefined()
    })
  })

  it('Contains the creator', () => {
    const id = '1';
    return getByte(testDataStore, id).then(data => {
      expect(data.creator.id).toEqual(testDataStore.users[0]._id);
    })
  })

  it('Returns null for an unknown id', () => {
    const id = 'notanid';
    return getByte(testDataStore, id).then(data => {
      expect(data).toBeNull();
    })
  })
})


describe('ByteInteractor#getBytes', () => {
  it('Maps _id to id', () => {
    return getBytes(testDataStore).then(data => {
      data.forEach(byte => {
        expect(byte.id).toEqual(byte._id);
      });
    })
  })
})
