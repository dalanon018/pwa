import React from 'react'

import { shallow } from 'enzyme'
import { fromJS } from 'immutable'

import { BrandPage } from '../index'

describe('<BrandPage />', () => {
  const minProps = {
    changeRoute: () => {},
    getProductsByBrands: () => {},
    resetProductsByBrands: () => {},
    setPageTitle: () => {},
    setRouteName: () => {},
    setShowSearchIcon: () => {},
    setShowActivityIcon: () => {},
    loader: false,
    lazyload: false,
    match: {
      params: {
        id: 'CAT1'
      }
    },
    productsByBrands: fromJS([]),
    productsFeatured: fromJS([]),
    brands: fromJS([])
  }

  it('should render a div', () => {
    const renderedComponent = shallow(
      <BrandPage {...minProps} />
    )
    expect(renderedComponent.find('div').length).toEqual(4)
  })

  it('should render a Waypoint', () => {
    const renderedComponent = shallow(
      <BrandPage {...minProps} />
    )

    expect(renderedComponent.find('Waypoint').length).toEqual(1)
  })
})
