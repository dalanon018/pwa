import React from 'react'

import { fromJS } from 'immutable'
import { shallow } from 'enzyme'
import ProductView from '../index'

const wrapper = (props = {}, enzyme = shallow) => enzyme(
  <ProductView {...props} />
)

describe('<ProductView />', () => {
  const minProps = {
    products: fromJS([])
  }

  it('render without exploding', () => {
    const renderComponent = wrapper(minProps)
    expect(
      renderComponent.length
    ).toEqual(1)
  })
})
