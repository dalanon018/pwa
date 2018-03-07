import React from 'react'

import { shallow } from 'enzyme'
import { fromJS } from 'immutable'

import { BrandPage } from '../index'

describe('<BrandPage />', () => {
  const minProps = {
    changeRoute: () => {},
    getProductsByBrands: () => {},
    resetProductsByBrands: () => {},
    getFilterCategories: () => {},
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
    totalCount: 0,
    productsByBrands: fromJS([]),
    productsFeatured: fromJS([]),
    filterCategories: fromJS([]),
    filterCategoriesLoading: false,
    brands: fromJS([])
  }

  it('should render a div', () => {
    const renderedComponent = shallow(
      <BrandPage {...minProps} />
    )
    expect(renderedComponent.find('div').length).toEqual(3)
  })

  it('should render a Waypoint', () => {
    const renderedComponent = shallow(
      <BrandPage {...minProps} />
    )

    expect(renderedComponent.find('Waypoint').length).toEqual(1)
  })
})
