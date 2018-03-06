
import {
  getPromoAction,
  setPromoAction,
  setPromoProductsAction,
  resetPromoProductsAction,
  setPromoProductsCountsAction
} from '../actions'

import {
  GET_PROMO,
  SET_PROMO,
  SET_PROMO_PRODUCTS,
  SET_PROMO_PRODUCTS_COUNT,
  RESET_PROMO_PRODUCTS
} from '../constants'

describe('PromoProductsPage actions', () => {
  it('has a type of GET_PROMO', () => {
    const payload = { id: 1 }
    const expected = {
      type: GET_PROMO,
      payload
    }
    expect(getPromoAction(payload)).toEqual(expected)
  })

  it('has a type of SET_PROMO', () => {
    const payload = [ 1, 2, 3 ]
    const expected = {
      type: SET_PROMO,
      payload
    }
    expect(setPromoAction(payload)).toEqual(expected)
  })

  it('has a type of SET_PROMO_PRODUCTS', () => {
    const payload = [ 1, 2, 3 ]
    const expected = {
      type: SET_PROMO_PRODUCTS,
      payload
    }
    expect(setPromoProductsAction(payload)).toEqual(expected)
  })

  it('has a type of RESET_PROMO_PRODUCTS', () => {
    const payload = []
    const expected = {
      type: RESET_PROMO_PRODUCTS,
      payload
    }
    expect(resetPromoProductsAction(payload)).toEqual(expected)
  })

  it('has a type of SET_PROMO_PRODUCTS_COUNT', () => {
    const payload = 0
    const expected = {
      type: SET_PROMO_PRODUCTS_COUNT,
      payload
    }
    expect(setPromoProductsCountsAction(payload)).toEqual(expected)
  })
})
