import React from 'react'

import { fromJS } from 'immutable'
import { shallow } from 'enzyme'
import { ReceiptPage } from '../index'

const children = (<h1>Test</h1>)
const wrapper = (props = {}, enzyme = shallow) => enzyme(
  <ReceiptPage {...props}>
    {children}
  </ReceiptPage>
)

describe('<ReceiptPage />', () => {
  const minProps = {
    loading: false,
    receipt: fromJS({}),
    getReceipt: () => {},
    dispatch: () => {}
  }

  it('render without exploding', () => {
    const renderComponent = wrapper(minProps)
    expect(
      renderComponent.length
    ).toEqual(1)
  })
})
