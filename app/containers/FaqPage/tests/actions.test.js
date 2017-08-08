
import {
  getMarkDownAction,
  setMarkDownAction
} from '../actions'
import {
  GET_MARKDOWN,
  SET_MARKDOWN
} from '../constants'

describe('FaqPage actions', () => {
  describe('Default Action', () => {
    it('has a type of GET_MARKDOWN', () => {
      const expected = {
        type: GET_MARKDOWN
      }
      expect(getMarkDownAction()).toEqual(expected)
    })
    it('has a type of SET_MARKDOWN', () => {
      const expected = {
        type: SET_MARKDOWN
      }
      expect(setMarkDownAction()).toEqual(expected)
    })
  })
})
