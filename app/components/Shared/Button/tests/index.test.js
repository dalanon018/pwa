/**
 * Testing our Button component
 */

import React from 'react'
import { shallow } from 'enzyme'

import Button from '../index'

const children = 'Test'
const wrapper = (props = {}, enzyme = shallow) => enzyme(
  <Button {...props}>
    {children}
  </Button>
)

describe('<Button />', () => {
  const minProps = {
    onClick: () => {}
  }

  it('render without exploding', () => {
    const renderComponent = wrapper(minProps)
    expect(
      renderComponent.length
    ).toEqual(1)
  })
})
