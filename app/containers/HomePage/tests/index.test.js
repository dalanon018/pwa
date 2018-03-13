import React from 'react'
import { shallow } from 'enzyme'
import { fromJS } from 'immutable'

import { HomePage } from '../index'

const wrapper = (props = {}, enzyme = shallow) => shallow(
  <HomePage {...props} />
)

describe('<HomePage />', () => {
  const minProps = {
    changeRoute: () => {},
    getProduct: () => {},
    getPromos: () => {},
    getBanners: () => {},
    setRouteName: () => {},
    getProductCategories: () => {},
    totalFeaturedProductCount: 0,
    promosCount: 0,
    featuredProductsLoader: false,
    lazyload: false,
    featuredProducts: fromJS([]),
    featuredCategories: fromJS([]),
    featuredBrands: fromJS([]),
    promos: fromJS([]),
    promosLoading: false,
    banners: fromJS([]),
    bannersLoading: false,
    categoryNavLoader: false,
    intl: {
      formatMessage: () => {}
    },
    setPageTitle: () => {},
    setShowSearchIcon: () => {},
    setShowActivityIcon: () => {}
  }

  it('render without exploding', () => {
    const renderComponent = wrapper(minProps)
    expect(
      renderComponent.length
    ).toEqual(1)
  })
})
