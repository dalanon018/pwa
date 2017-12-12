
import {
  getFeaturedProductsAction,
  setFeaturedProductsAction,
  setProductsCountsAction
} from '../actions'
import {
  GET_FEATURED_PRODUCTS,
  SET_FEATURED_PRODUCTS,

  SET_PRODUCTS_COUNT
} from '../constants'

describe('HomePage actions', () => {
  it('should call getFeaturedProductsAction', () => {
    const payload = { id: 1 }
    const expected = {
      type: GET_FEATURED_PRODUCTS,
      payload
    }
    expect(getFeaturedProductsAction(payload)).toEqual(expected)
  })

  it('should call setFeaturedProductsAction', () => {
    const payload = { id: 1, product: 'test1' }
    const expected = {
      type: SET_FEATURED_PRODUCTS,
      payload
    }
    expect(setFeaturedProductsAction(payload)).toEqual(expected)
  })

  it('should call setProductsCountsAction', () => {
    const payload = 1
    const expected = {
      type: SET_PRODUCTS_COUNT,
      payload
    }
    expect(setProductsCountsAction(payload)).toEqual(expected)
  })
})
