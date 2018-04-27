import React from 'react'
import { shallow } from 'enzyme'

import BrandCarousel from '../index'

const wrapper = (Component = BrandCarousel, props = {}, enzyme = shallow) => enzyme(
  <Component {...props} />
)

describe('<BrandCarousel />', () => {
  const minProps = {
    loader: false,
    isInfinite: false,
    images: []
  }

  it('render without exploding', () => {
    const renderComponent = wrapper(BrandCarousel, minProps)
    expect(
      renderComponent.length
    ).toEqual(1)
  })
})
