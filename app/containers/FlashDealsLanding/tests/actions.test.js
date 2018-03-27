
import {
  getPromosAction,
  setPromosAction
} from '../actions'
import {
  GET_PROMOS,
  SET_PROMOS
} from '../constants'

describe('FlashDealsLanding actions', () => {
  describe('Default Action', () => {
    it('has a type of GET_PROMOS', () => {
      const expected = {
        type: GET_PROMOS
      }
      expect(getPromosAction()).toEqual(expected)
    })

    it('has a type of SET_PROMOS', () => {
      const expected = {
        type: SET_PROMOS
      }
      expect(setPromosAction()).toEqual(expected)
    })
  })
})
