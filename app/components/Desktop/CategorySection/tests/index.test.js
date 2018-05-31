import React from 'react'
import { shallow } from 'enzyme'
import { fromJS } from 'immutable'

import CategorySection, { ContentWrapper } from '../index'

const wrapper = (Component = CategorySection, props = {}, enzyme = shallow) => enzyme(
  <Component {...props} />
)

describe('<CategorySection />', () => {
  const minProps = {
    filterBrands: fromJS({}),
    filterBrandsLoading: false,
    filterCategories: fromJS({}),
    filterCategoriesLoading: false,
    filtered: false,
    getFilterBrands: () => {},
    getFilterCategories: () => {},
    lazyload: false,
    loader: false,
    queryBrands: fromJS({}),
    queryCategory: 'lorem',
    requestFromFilter: () => {},

    _displayEmptyLoadingIndicator: () => {},
    _displayFeaturesProduct: () => {},
    _displayHeaderFeaturesProduct: () => {},
    _displayNumberProducts: () => {},
    _displayRecentlyViewedHeader: () => {},
    _displayRecentlyViewedItems: () => {},
    _displayRegularItems: () => {},
    _handlePageTitle: () => {}
  }

  it('render without exploding', () => {
    const renderComponent = wrapper(CategorySection, minProps)
    expect(
      renderComponent.length
    ).toEqual(1)
  })

  it('should render two div\'s', () => {
    const renderedComponent = wrapper(CategorySection, minProps)
    expect(renderedComponent.find('div').length).toEqual(2)
  })

  it('renders one <ContentWrapper/> styled component', () => {
    const ShallowedWrapper = shallow(<CategorySection {...minProps} />)
    expect(ShallowedWrapper.find(ContentWrapper)).toHaveLength(1)
  })
})
