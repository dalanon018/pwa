import React from 'react'
import { shallow } from 'enzyme'

import PurchaseOrder from '../PurchaseOrder'

const children = (<h1>Test</h1>)
const wrapper = (props = {}, enzyme = shallow) => enzyme(
  <PurchaseOrder {...props}>
    {children}
  </PurchaseOrder>
)

describe('<Receipt PurchaseOrder/>', () => {
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
