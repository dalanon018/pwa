import { fromJS } from 'immutable'

import {
  selectOrderProduct,
  selectMobileNumber
} from '../selectors'

describe('ProductReview Selectors', () => {
  describe('selectOrderProduct', () => {
    const selectOrderProductSelectors = selectOrderProduct()

    it('should get product', () => {
      const orderProduct = fromJS({
        title: 'title1',
        description: 'lorem ipsum'
      })
      const mockedState = fromJS({
        productReview: {
          orderProduct
        }
      })
      expect(selectOrderProductSelectors(mockedState)).toEqual(orderProduct)
    })
  })

  describe('selectMobileNumber', () => {
    const selectMobileNumberSelectors = selectMobileNumber()

    it('should get success submission', () => {
      const mobileNumber = '99999999'
      const mockedState = fromJS({
        productReview: {
          mobileNumber
        }
      })
      expect(selectMobileNumberSelectors(mockedState)).toEqual(mobileNumber)
    })
  })
})
