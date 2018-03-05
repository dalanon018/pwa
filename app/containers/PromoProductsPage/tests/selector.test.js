import { fromJS } from 'immutable'
import {
  selectPromo,
  selectProducts,
  selectProductsRegular,
  selectProductsFeatured,
  selectProductsCount,
  selectProductsLoading,
  selectLazyload
} from '../selectors'

describe('selectPromoProductsPageDomain', () => {
  describe('selectPromo', () => {
    const selector = selectPromo()

    it('should select Promo', () => {
      const promo = fromJS({ id: 1, name: 'Promo1' })
      const mockedState = fromJS({
        promoProductsPage: {
          promo
        }
      })
      expect(selector(mockedState)).toEqual(promo)
    })
  })

  describe('selectProducts', () => {
    const selector = selectProducts()

    it('should get products', () => {
      const products = fromJS([{ name: 1 }, { name: 2 }])
      const mockedState = fromJS({
        promoProductsPage: {
          products
        }
      })
      expect(selector(mockedState)).toEqual(products)
    })
  })

  describe('selectProductsRegular', () => {
    const selector = selectProductsRegular()

    it('should get products regular', () => {
      const products = fromJS([{isFeatured: false}])
      const mockedState = fromJS({
        promoProductsPage: {
          products
        }
      })
      expect(selector(mockedState)).toEqual(products)
    })
  })

  describe('selectProductsFeatured', () => {
    const selector = selectProductsFeatured()

    it('should get products featured', () => {
      const products = fromJS([{isFeatured: true}])
      const mockedState = fromJS({
        promoProductsPage: {
          products
        }
      })
      expect(selector(mockedState)).toEqual(products)
    })
  })

  describe('selectLazyload', () => {
    const selector = selectLazyload()

    it('should get lazyload', () => {
      const lazyload = false
      const mockedState = fromJS({
        promoProductsPage: {
          lazyload
        }
      })
      expect(selector(mockedState)).toEqual(lazyload)
    })
  })

  describe('selectProductsCount', () => {
    const selector = selectProductsCount()

    it('should get productCount', () => {
      const productsCount = 0
      const mockedState = fromJS({
        promoProductsPage: {
          productsCount
        }
      })
      expect(selector(mockedState)).toEqual(productsCount)
    })
  })

  describe('selectProductsLoading', () => {
    const selector = selectProductsLoading()

    it('should get productLoading', () => {
      const productsLoading = false
      const mockedState = fromJS({
        promoProductsPage: {
          productsLoading
        }
      })
      expect(selector(mockedState)).toEqual(productsLoading)
    })
  })
})
