
import {
  getSearchProductAction,
  setSearchProductAction,
  setProductHandlersDefaultAction
} from '../actions'
import {
  GET_SEARCH_PRODUCT,
  SET_SEARCH_PRODUCT,
  SET_PRODUCT_HANDLER_DEFAULT
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

  describe('setProductHandlersDefaultAction', () => {
    it('should have handler default payload', () => {
      const expectedResult = {
        type: SET_PRODUCT_HANDLER_DEFAULT
      }

      expect(setProductHandlersDefaultAction()).toEqual(expectedResult)
    })
  })
})
