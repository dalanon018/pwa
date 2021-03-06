import { fromJS } from 'immutable'
import productsByCategoryReducer from '../reducer'

import {
  setProductsByCategoryAction,
  setProductsCountsAction
} from '../actions'

describe('productsByCategoryReducer', () => {
  let state
  beforeEach(() => {
    state = fromJS({
      productsByCategory: [],
      productsViewed: [],
      filterCategories: [],
      filterCategoriesLoading: false,
      filterBrands: [],
      filterBrandsLoading: false,
      totalCount: 0,
      loading: true,
      lazyload: false,
      isOver18: true
    })
  })

  it('returns the initial state', () => {
    const expectedResult = state
    expect(productsByCategoryReducer(undefined, {})).toEqual(expectedResult)
  })

  it('should update productsByCategory', () => {
    const payload = ['cat1', 'cat2']
    const currentState = state.get('productsByCategory').toJS()
    const mergeState = currentState.concat(payload)
    const expectedResult = state
      .set('productsByCategory', fromJS(mergeState))
      .set('loading', false)
      .set('lazyload', false)

    expect(productsByCategoryReducer(state, setProductsByCategoryAction(payload))).toEqual(expectedResult)
  })

  it('should update totalCount', () => {
    const payload = 10
    const expectedResult = state
      .set('totalCount', payload)
    expect(productsByCategoryReducer(state, setProductsCountsAction(payload))).toEqual(expectedResult)
  })
})
