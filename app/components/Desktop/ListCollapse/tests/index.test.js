import React from 'react'
import { shallow } from 'enzyme'

import ListCollapse from '../index'

const wrapper = (props = {}, enzyme = shallow) => shallow(
  <ListCollapse {...props} />
)

describe('<ListCollapse />', () => {
  const minProps = {
    height: 0
  }

  it('render without exploding', () => {
    const renderComponent = wrapper(minProps)
    expect(
      renderComponent.length
    ).toEqual(1)
  })
})
