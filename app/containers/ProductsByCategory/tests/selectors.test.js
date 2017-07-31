import { fromJS } from 'immutable'
import {
  selectProductsByCategory
} from '../selectors'

describe('makeSelectProductsByCategoryDomain', () => {
  describe('selectProductsByCategory', () => {
    const selector = selectProductsByCategory()

    it('should get products', () => {
      const productsByCategory = fromJS([1, 2, 3, 4])
      const mockedState = fromJS({
        productsByCategory: {
          productsByCategory
        }
      })
      expect(selector(mockedState)).toEqual(productsByCategory)
    })
  })
})
