import React from 'react'
import { shallow } from 'enzyme'

import Countdown from '../index'

const wrapper = (props = {}, enzyme = shallow) => enzyme(
  <Countdown {...props} />
)

describe('<Countdown />', () => {
  const minProps = {
    endDate: 100000000
  }

  it('render without exploding', () => {
    const renderComponent = wrapper(minProps)
    expect(
      renderComponent.length
    ).toEqual(1)
  })
})
