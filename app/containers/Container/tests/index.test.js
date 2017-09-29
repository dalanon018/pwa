import React from 'react'

import { fromJS } from 'immutable'
import { shallow } from 'enzyme'
import { Container } from '../index'

const children = (<h1>Test</h1>)
const wrapper = (props = {}, enzyme = shallow) => enzyme(
  <Container {...props}>
    {children}
  </Container>
)

describe('<Container />', () => {
  const minProps = {
    mobileNumbers: fromJS([]),
    receiptsUpdated: fromJS([]),
    toggleError: false,
    toggleMessage: null,
    getUpdatedReceipts: () => {},
    setUpdatedReceipts: () => {},
    setNetworkError: () => {},
    dispatch: () => {}
  }

  it('render without exploding', () => {
    const renderComponent = wrapper(minProps)
    expect(
      renderComponent.length
    ).toEqual(1)
  })
})
