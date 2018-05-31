import React from 'react'
import { shallow } from 'enzyme'
import { fromJS } from 'immutable'

import BrandSection from '../index'

const wrapper = (Component = BrandSection, props = {}, enzyme = shallow) => enzyme(
  <Component {...props} />
)

describe('<BrandSection />', () => {
  const minProps = {
    animateBanner: false,
    brandImages: fromJS({}),
    category: fromJS({}),
    filterCategories: fromJS({}),
    filterCategoriesLoading: true,
    // filtered: false,
    lazyload: false,
    loader: false,
    productsByBrands: fromJS({}),

    _displayEmptyLoadingIndicator: () => {},
    _displayFeaturedProducts: () => {},
    _displayHeaderFeaturesProduct: () => {},
    _displayHeaderRegularProduct: () => {},
    _displayRegularItems: () => {},
    // _handleBannerAnimation: () => {},
    _requestFromFilter: () => {}
    // _fetchFilteredCategories: () => {}
  }

  it('render without exploding', () => {
    const renderComponent = wrapper(BrandSection, minProps)
    expect(
      renderComponent.length
    ).toEqual(1)
  })

  it('should render two div\'s', () => {
    const renderedComponent = wrapper(BrandSection, minProps)
    expect(renderedComponent.find('div').length).toEqual(2)
  })
})
