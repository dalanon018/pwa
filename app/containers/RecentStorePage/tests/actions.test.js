
import {
  getVisitedStoresAction,
  setVisitedStoresAction
} from '../actions'

import {
  GET_VISITED_STORES,
  SET_VISITED_STORES
} from '../constants'

describe('Recent Store Page  actions', () => {
  describe('Recently Visited Actions', () => {
    it('should get visited store', () => {
      const expectedResult = {
        type: GET_VISITED_STORES
      }
      expect(getVisitedStoresAction()).toEqual(expectedResult)
    })

    it('should set visited store', () => {
      const payload = [1, 2, 3]
      const expectedResult = {
        type: SET_VISITED_STORES,
        payload
      }
      expect(setVisitedStoresAction(payload)).toEqual(expectedResult)
    })
  })
})
