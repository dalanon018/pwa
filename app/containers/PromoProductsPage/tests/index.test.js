import React from 'react'

import { shallow } from 'enzyme'
import { fromJS } from 'immutable'

import { PromoProductsPage } from '../index'

describe('<PromoProductsPage />', () => {
  const minProps = {
    changeRoute: () => {},
    getPromo: () => {},
    resetPromo: () => {},
    setPageTitle: () => {},
    setRouteName: () => {},
    setShowSearchIcon: () => {},
    setShowPointsIcon: () => {},
    setShowActivityIcon: () => {},
    productsLoading: false,
    lazyload: false,
    match: {
      params: {
        id: 'CAT1'
      }
    },
    productsCount: 0,
    allProducts: fromJS([]),
    productsRegular: fromJS([]),
    productsFeatured: fromJS([]),
    brands: fromJS([])
  }

  it('should render a div', () => {
    const renderedComponent = shallow(
      <PromoProductsPage {...minProps} />
    )
    expect(renderedComponent.find('div').length).toEqual(5)
  })

  it('should render a Waypoint', () => {
    const renderedComponent = shallow(
      <PromoProductsPage {...minProps} />
    )

    expect(renderedComponent.find('Waypoint').length).toEqual(1)
  })
})
