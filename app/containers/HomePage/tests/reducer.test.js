
import containerReducer from '../reducer'
import { fromJS } from 'immutable'

import {
  setFeaturedProductsAction,
  setFeaturedCategoriesAction,
  setFeaturedBrandsAction
} from '../actions'

describe('Home Reducer', () => {
  let state
  beforeEach(() => {
    state = fromJS({
      featuredProducts: [],
      productsLoading: false,

      featuredCategories: [],
      categoriesLoading: false,

      featuredBrands: [],
      brandsLoading: false
    })
  })

  it('returns the initial state', () => {
    const expectedResult = state
    expect(containerReducer(undefined, {})).toEqual(expectedResult)
  })

  it('should update products', () => {
    const payload = fromJS(['product1', 'product2', 'product3'])

    const expectedResult = state.set('featuredProducts', payload)

    expect(containerReducer(state, setFeaturedProductsAction(payload))).toEqual(expectedResult)
  })

  it('should update categories', () => {
    const payload = fromJS(['categories1', 'categories2', 'categories3'])

    const expectedResult = state.set('featuredCategories', payload)

    expect(containerReducer(state, setFeaturedCategoriesAction(payload))).toEqual(expectedResult)
  })

  it('should update brands', () => {
    const payload = fromJS(['brands1', 'brands2', 'brands3'])

    const expectedResult = state.set('featuredBrands', payload)

    expect(containerReducer(state, setFeaturedBrandsAction(payload))).toEqual(expectedResult)
  })
})
