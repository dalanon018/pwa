import React from 'react'
import { shallow } from 'enzyme'

import RangeSlider from '../index'

const wrapper = (props = {}, enzyme = shallow) => enzyme(
  <RangeSlider {...props} />
)

describe('<RangeSlider />', () => {
  const minProps = {
    usePoints: 0,
    currentPoints: 200,
    maxPoints: 130,
    pointsModifier: () => {}
  }

  it('render component without exploding', () => {
    const renderComponent = wrapper(minProps)
    expect(
      renderComponent.length
    ).toEqual(1)
  })
})
