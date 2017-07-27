import React from 'react'
import { shallow } from 'enzyme'
import { fromJS } from 'immutable'

import { ProductReview } from '../index'

describe('<ProductReview />', () => {
  const minProps = {
    getOrderProduct: () => {},
    getProductCategories: () => {},
    loader: false,
    featuredProducts: fromJS([]),
    orderedProduct: fromJS({})
  }

  it('should render a div', () => {
    const renderedComponent = shallow(
      <ProductReview {...minProps} />
    )
    expect(renderedComponent.find('div').length).toEqual(0)
  })
})
