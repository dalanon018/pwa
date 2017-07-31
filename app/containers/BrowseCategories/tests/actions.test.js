
import {
  getCategoriesAction
} from '../actions'
import {
  GET_CATEGORIES
} from '../constants'

describe('BrowseCategories actions', () => {
  describe('Default Action', () => {
    it('has a type of GET_CATEGORIES', () => {
      const expected = {
        type: GET_CATEGORIES
      }
      expect(getCategoriesAction()).toEqual(expected)
    })
  })
})
