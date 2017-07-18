import React from 'react'
import { shallow } from 'enzyme'

import Barcode from '../index'

const children = (<h1>Test</h1>)
const wrapper = (props = {}, enzyme = shallow) => enzyme(
  <Barcode {...props}>
    {children}
  </Barcode>
)

describe('<Barcode />', () => {
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
