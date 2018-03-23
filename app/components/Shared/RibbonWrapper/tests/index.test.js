import React from 'react'
import { shallow } from 'enzyme'

import RibbonWrapper from '../index'

const children = (<h1>Test</h1>)
const wrapper = (props = {}, enzyme = shallow) => enzyme(
  <RibbonWrapper {...props}>
    {children}
  </RibbonWrapper>
)

describe('<RibbonWrapper />', () => {
  const minProps = {
    rightSpace: true
  }

  it('render without exploding', () => {
    const renderComponent = wrapper(minProps)
    expect(
      renderComponent.length
    ).toEqual(1)
  })
})
