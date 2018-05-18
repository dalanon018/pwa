import React from 'react'

import { shallow } from 'enzyme'
import { fromJS } from 'immutable'

import { BrandPage } from '../index'

describe('<BrandPage />', () => {
  const minProps = {
    changeRoute: () => {},
    replaceRoute: () => {},
    getProductsByBrands: () => {},
    resetProductsByBrands: () => {},
    getFilterCategories: () => {},
    setPageTitle: () => {},
    setRouteName: () => {},
    setShowSearchIcon: () => {},
    setShowPointsIcon: () => {},
    setShowActivityIcon: () => {},
    loader: false,
    lazyload: false,
    match: {
      params: {
        id: 'CAT1'
      }
    },
    location: {
      search: ''
    },
    totalCount: 0,
    productsByBrands: fromJS([]),
    productsFeatured: fromJS([]),
    filterCategories: fromJS([]),
    filtered: false,
    filterCategoriesLoading: false,
    brands: fromJS([])
  }

  it('should render a div', () => {
    const renderedComponent = shallow(
      <BrandPage {...minProps} />
    )
    expect(renderedComponent.find('div').length).toEqual(1)
  })

  it('should render a Waypoint', () => {
    const renderedComponent = shallow(
      <BrandPage {...minProps} />
    )

    expect(renderedComponent.find('Waypoint').length).toEqual(0)
  })
})
