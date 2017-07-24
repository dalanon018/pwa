
import {
  getSearchProductAction,
  setSearchProductAction
} from '../actions'
import {
  GET_SEARCH_PRODUCT,
  SET_SEARCH_PRODUCT
} from '../constants'

describe('SearchPage actions', () => {
  describe('getSearchProduct', () => {
    it('Shout be fetching', () => {
      const payload = {
        id: 1
      }
      const expectedResult = {
        type: GET_SEARCH_PRODUCT,
        payload
      }
      expect(getSearchProductAction(payload)).toEqual(expectedResult)
    })
  })

  describe('setSearchProduct', () => {
    it('was able to get product', () => {
      const payload = {
        id: 1
      }
      const expectedResult = {
        type: SET_SEARCH_PRODUCT,
        payload
      }

      expect(setSearchProductAction(payload)).toEqual(expectedResult)
    })
  })
})
