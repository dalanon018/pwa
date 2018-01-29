import React from 'react'
import { shallow } from 'enzyme'

import PurchaseUsecase from '../PurchaseUsecase'

const children = (<h1>Test</h1>)
const wrapper = (props = {}, enzyme = shallow) => enzyme(
  <PurchaseUsecase {...props}>
    {children}
  </PurchaseUsecase>
)

describe('<Receipt PurchaseUsecase/>', () => {
  const minProps = {
    status: 'CLAIMED',
    modePayment: 'CASH',
    storeName: 'Kamias'
  }

  it('render without exploding', () => {
    const renderComponent = wrapper(minProps)
    expect(
      renderComponent.length
    ).toEqual(1)
  })
})
