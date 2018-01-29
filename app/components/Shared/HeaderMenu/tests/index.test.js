import React from 'react'

import { shallow } from 'enzyme'
import HeaderMenu from '../index'

const children = (<h1>Test</h1>)
const wrapper = (props = {}, enzyme = shallow) => enzyme(
  <HeaderMenu {...props}>
    {children}
  </HeaderMenu>
)

describe('<HeaderMenu />', () => {
  const minProps = {
    showBack: true,
    hideSearch: true,
    hideBarcode: false
  }

  it('render without exploding', () => {
    const renderComponent = wrapper(minProps)
    expect(
      renderComponent.length
    ).toEqual(1)
  })
})
