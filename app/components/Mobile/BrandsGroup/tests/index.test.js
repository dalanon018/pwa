import React from 'react'
import { shallow } from 'enzyme'
import { fromJS } from 'immutable'

import BrandsGroup from '../index'

const wrapper = (Component = BrandsGroup, props = {}, enzyme = shallow) => enzyme(
  <Component {...props} />
)

describe('<BrandsGroup />', () => {
  const minProps = {
    brands: fromJS([]),
    bottomScroll: false,
    goToBrand: () => {}
  }

  it('render without exploding', () => {
    const renderComponent = wrapper(BrandsGroup, minProps)
    expect(
      renderComponent.length
    ).toEqual(1)
  })
})
