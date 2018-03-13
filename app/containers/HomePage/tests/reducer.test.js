
import { fromJS } from 'immutable'
import homePageReducer from '../reducer'
import { GET_FEATURED_PRODUCTS } from './../constants'

describe('homePageReducer', () => {
  let state
  beforeEach(() => {
    state = fromJS({
      product: [],
      loading: false,
      totalCount: 0,
      lazyload: false,

      promos: [],
      promosCount: 0,
      promosLoading: false,

      banners: [],
      bannersCount: 0,
      bannersLoading: false
    })
  })

  it('returns the initial state', () => {
    const expectedResult = state.set('loading', true)
    expect(homePageReducer(undefined, {
      type: GET_FEATURED_PRODUCTS
    })).toEqual(expectedResult)
  })
})
