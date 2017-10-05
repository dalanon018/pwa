import React from 'react'
import { shallow } from 'enzyme'
import { fromJS } from 'immutable'

import { HomePage } from '../index'

const wrapper = (props = {}, enzyme = shallow) => shallow(
  <HomePage {...props} />
)

describe('<HomePage />', () => {
  const minProps = {
    changeRoute: () => {},
    getProduct: () => {},
    getProductCategories: () => {},
    loader: false,
    featuredProducts: fromJS([]),
    productCategories: fromJS([]),
    featuredBrands: fromJS([]),
    intl: {
      formatMessage: () => {}
    },
    setPageTitle: () => {},
    setShowSearchIcon: () => {},
    setShowActivityIcon: () => {}
  }

  it('render without exploding', () => {
    const renderComponent = wrapper(minProps)
    expect(
      renderComponent.length
    ).toEqual(1)
  })
})
