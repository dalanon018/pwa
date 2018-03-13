
import {
  getFeaturedProductsAction,
  setFeaturedProductsAction,
  setProductsCountsAction,

  getPromosAction,
  setPromosAction,
  setPromosCountAction,

  getBannersAction,
  setBannersAction
} from '../actions'
import {
  GET_FEATURED_PRODUCTS,
  SET_FEATURED_PRODUCTS,

  SET_PRODUCTS_COUNT,

  GET_PROMOS,
  SET_PROMOS,
  SET_PROMOS_COUNT,

  GET_BANNERS,
  SET_BANNERS
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

  it('should call getPromosAction', () => {
    const expected = {
      type: GET_PROMOS
    }
    expect(getPromosAction()).toEqual(expected)
  })

  it('should call setPromosAction', () => {
    const payload = { id: 1, promo: 'test1' }
    const expected = {
      type: SET_PROMOS,
      payload
    }
    expect(setPromosAction(payload)).toEqual(expected)
  })

  it('should call setPromosCountAction', () => {
    const payload = 1
    const expected = {
      type: SET_PROMOS_COUNT,
      payload
    }
    expect(setPromosCountAction(payload)).toEqual(expected)
  })

  describe('Banners Actions', () => {
    it('should call getBannersAction', () => {
      const expected = {
        type: GET_BANNERS
      }
      expect(getBannersAction()).toEqual(expected)
    })

    it('should call setBannersAction', () => {
      const payload = { id: 1, banner: 'test1' }
      const expected = {
        type: SET_BANNERS,
        payload
      }
      expect(setBannersAction(payload)).toEqual(expected)
    })
  })
})
