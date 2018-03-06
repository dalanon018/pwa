import React from 'react'
import { shallow } from 'enzyme'
import { fromJS } from 'immutable'

import { ProductsByFeatured } from '../index'

describe('<ProductsByFeatured />', () => {
  const minProps = {
    changeRoute: () => {},
    setRouteName: () => {},
    getProducts: () => {},
    getProductsViewed: () => {},
    resetProductsByFeatured: () => {},
    setPageTitle: () => {},
    setShowSearchIcon: () => {},
    setShowActivityIcon: () => {},
    totalCount: 0,
    loader: false,
    lazyload: false,
    products: fromJS([]),
    productsViewed: fromJS([]),
    categories: fromJS([]),
    intl: {
      formatDate: () => {},
      formatTime: () => {},
      formatRelative: () => {},
      formatNumber: () => {},
      formatPlural: () => {},
      formatMessage: () => {},
      formatHTMLMessage: () => {},
      now: () => {}
    }
  }

  it('should render a div', () => {
    const renderedComponent = shallow(
      <ProductsByFeatured {...minProps} />
    )
    expect(renderedComponent.find('div').length).toEqual(1)
  })

  it('should render not render ProductView if not Items yet', () => {
    const renderedComponent = shallow(
      <ProductsByFeatured {...minProps} />
    )
    expect(renderedComponent.find('ProductView').length).toEqual(0)
  })
})
