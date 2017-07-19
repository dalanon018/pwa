import React from 'react'
import { shallow } from 'enzyme'
import { fromJS } from 'immutable'

import { HomePage } from '../index'

describe('<HomePage />', () => {
  const minProps = {
    changeRoute: () => {},
    getProduct: () => {},
    getProductCategories: () => {},
    loader: false,
    featuredProducts: fromJS([]),
    productCategories: fromJS([])
  }

  it('should render a div', () => {
    const renderedComponent = shallow(
      <HomePage {...minProps} />
    )
    expect(renderedComponent.find('div').length).toEqual(2)
  })
})
