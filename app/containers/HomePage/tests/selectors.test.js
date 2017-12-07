import { fromJS } from 'immutable'
import {
  selectFeaturedProducts,
  selectLoading,
  selectTotalCount
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
})
