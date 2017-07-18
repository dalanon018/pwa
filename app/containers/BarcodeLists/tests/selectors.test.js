import { fromJS } from 'immutable'

import {
  selectBarcodes
} from '../selectors'

describe('BarcodesList Selectors', () => {
  describe('selectBarcodes', () => {
    const selectBarcodesSelectors = selectBarcodes()

    it('should get sector', () => {
      const barcodes = fromJS([1, 2, 3])
      const mockedState = fromJS({
        barcodeLists: {
          barcodes
        }
      })
      expect(selectBarcodesSelectors(mockedState)).toEqual(barcodes)
    })
  })
})
