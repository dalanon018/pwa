import React from 'react'
import { shallow } from 'enzyme'
import { fromJS } from 'immutable'

import { ProductsByCategory } from '../index'

describe('<ProductsByCategory />', () => {
  const minProps = {
    changeRoute: () => {},
    setRouteName: () => {},
    getProductsByCategory: () => {},
    getFilterCategories: () => {},
    getFilterBrands: () => {},
    getProductsViewed: () => {},
    resetProductsByCategory: () => {},
    setPageTitle: () => {},
    setShowSearchIcon: () => {},
    setShowPointsIcon: () => {},
    setShowActivityIcon: () => {},
    submitOver18: () => {},
    getOver18: () => {},
    totalCount: 0,
    loader: false,
    lazyload: false,
    products: fromJS([]),
    productsByCategory: fromJS([]),
    productsFeatured: fromJS([]),
    productsViewed: fromJS([]),
    categories: fromJS([]),
    filterCategories: fromJS([]),
    filterCategoriesLoading: false,
    filterBrands: fromJS([]),
    filterBrandsLoading: false,
    match: {
      params: {
        id: '01'
      }
    },
    location: {
      search: ''
    }
  }

  it('should render a div', () => {
    const renderedComponent = shallow(
      <ProductsByCategory {...minProps} />
    )
    expect(renderedComponent.find('div').length).toEqual(1)
  })

  it('should render not render ProductView if not Items yet', () => {
    const renderedComponent = shallow(
      <ProductsByCategory {...minProps} />
    )
    expect(renderedComponent.find('ProductView').length).toEqual(0)
  })
})
