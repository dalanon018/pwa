import { fromJS } from 'immutable'
import {
  selectFeaturedProducts,
  selectLoading,
  selectTotalCount,

  selectPromos,
  selectPromosLoading,
  selectPromosCount,

  selectLazyload
} from '../selectors'

describe('HomePage Selectors', () => {
  it('should get product', () => {
    const selector = selectFeaturedProducts()
    const product = fromJS([{ id: 1 }, { id: 3 }, { id: 3 }, { id: 4 }])
    const mockedState = fromJS({
      home: {
        product
      }
    })
    expect(selector(mockedState)).toEqual(product)
  })

  it('should get loading', () => {
    const selector = selectLoading()
    const loading = false
    const mockedState = fromJS({
      home: {
        loading
      }
    })
    expect(selector(mockedState)).toEqual(loading)
  })

  it('should get totalCount', () => {
    const selector = selectTotalCount()
    const totalCount = 0
    const mockedState = fromJS({
      home: {
        totalCount
      }
    })
    expect(selector(mockedState)).toEqual(totalCount)
  })

  it('should get selectPromos', () => {
    const selector = selectPromos()
    const promos = fromJS([{ id: 1 }, { id: 3 }, { id: 3 }, { id: 4 }])
    const mockedState = fromJS({
      home: {
        promos
      }
    })
    expect(selector(mockedState)).toEqual(promos)
  })

  it('should get selectPromosLoading', () => {
    const selector = selectPromosLoading()
    const promosLoading = false
    const mockedState = fromJS({
      home: {
        promosLoading
      }
    })
    expect(selector(mockedState)).toEqual(promosLoading)
  })

  it('should get selectPromosCount', () => {
    const selector = selectPromosCount()
    const promosCount = 0
    const mockedState = fromJS({
      home: {
        promosCount
      }
    })
    expect(selector(mockedState)).toEqual(promosCount)
  })

  it('should get selectLazyload', () => {
    const selector = selectLazyload()
    const lazyload = 0
    const mockedState = fromJS({
      home: {
        lazyload
      }
    })
    expect(selector(mockedState)).toEqual(lazyload)
  })
})
