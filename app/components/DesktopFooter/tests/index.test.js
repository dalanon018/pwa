import React from 'react'
import { shallow } from 'enzyme'

import { DesktopFooter } from '../index'

const children = (<h1>Test</h1>)
const wrapper = (props = {}, enzyme = shallow) => enzyme(
  <DesktopFooter {...props}>
    {children}
  </DesktopFooter>
)

describe('<DesktopFooter />', () => {
  const minProps = {
    dispatch: () => {},
    changeRoute: () => {}
  }

  it('render without exploding', () => {
    const renderComponent = wrapper(minProps)
    expect(
      renderComponent.length
    ).toEqual(1)
  })
})
