import React from 'react'
import { shallow } from 'enzyme'

import PackageStatus from '../index'

const children = (<h1>Test</h1>)
const wrapper = (props = {}, enzyme = shallow) => enzyme(
  <PackageStatus {...props}>
    {children}
  </PackageStatus>
)

describe('<PackageStatus />', () => {
  const minProps = {
    status: 'RESERVED'
  }

  it('render without exploding', () => {
    const renderComponent = wrapper(minProps)
    expect(
      renderComponent.length
    ).toEqual(1)
  })
})
