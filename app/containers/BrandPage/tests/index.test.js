import React from 'react'
import { shallow } from 'enzyme'
import { fromJS } from 'immutable'

import { BrandPage } from '../index'

describe('<BrandPage />', () => {
  const minProps = {
    changeRoute: () => {},
    getProductsByBrands: () => {},
    resetProductsByBrands: () => {},
    getProductFeatured: () => {},
    setPageTitle: () => {},
    setShowSearchIcon: () => {},
    setShowActivityIcon: () => {},
    loader: false,
    lazyload: false,
    params: {
      id: 'CAT1'
    },
    productsByBrands: fromJS([]),
    productsFeatured: fromJS([]),
    brands: fromJS([])
  }

  it('should render a div', () => {
    const renderedComponent = shallow(
      <BrandPage {...minProps} />
    )
    expect(renderedComponent.find('div').length).toEqual(1)
  })

  it('should render a ProductView', () => {
    const renderedComponent = shallow(
      <BrandPage {...minProps} />
    )
    expect(renderedComponent.find('ProductView').length).toEqual(1)
  })
})
