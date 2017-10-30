import React from 'react'
import { shallow } from 'enzyme'
import { fromJS } from 'immutable'

import { ProductsByCategory } from '../index'

describe('<ProductsByCategory />', () => {
  const minProps = {
    changeRoute: () => {},
    getProductsByCategory: () => {},
    getProductCategories: () => {},
    getProductsViewed: () => {},
    resetProductsByCategory: () => {},
    setPageTitle: () => {},
    setShowSearchIcon: () => {},
    setShowActivityIcon: () => {},
    totalCount: 0,
    loader: false,
    lazyload: false,
    params: {
      id: 'CAT1'
    },
    productsByTags: fromJS([]),
    productsByCategory: fromJS([]),
    productsFeatured: fromJS([]),
    productsViewed: fromJS([]),
    categories: fromJS([])
  }

  it('should render a div', () => {
    const renderedComponent = shallow(
      <ProductsByCategory {...minProps} />
    )
    expect(renderedComponent.find('div').length).toEqual(1)
  })

  it('should render a ProductView', () => {
    const renderedComponent = shallow(
      <ProductsByCategory {...minProps} />
    )
    expect(renderedComponent.find('ProductView').length).toEqual(2)
  })
})
