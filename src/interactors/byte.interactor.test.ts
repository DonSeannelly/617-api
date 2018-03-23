import { getByte } from './byte.interactor'
import { MockDataStore } from '../../test/MockDataStore'

const mockStore = new MockDataStore()

describe('ByteInteractor#getByte', () => {
  it('Removes creator id', () => {
    return getByte(mockStore, "1").then(data => {
      expect(data.creatorId).toBeUndefined()
    })
  })

  it('Contains the creator', () => {
    const id = '1';
    return getByte(mockStore, id).then(data => {
      expect(data.creator.id).toEqual(id);
    })
  })
})
