import React from 'react'
import { fromJS } from 'immutable'
import { shallow } from 'enzyme'

import Countdown from '../index'

const TestInnerComponent = (props) => <div {...props} />

const wrapper = (Component, props = {}, enzyme = shallow) => enzyme(
  <Component {...props} />
)

describe('<Countdown />', () => {
  const minProps = {
    statuses: {},
    receipt: fromJS({})
  }

  it('render inner component without exploding', () => {
    const renderComponent = wrapper(TestInnerComponent)
    expect(
      renderComponent.length
    ).toEqual(1)
  })

  it('should render the HOC without exploding', () => {
    const HOC = Countdown(TestInnerComponent)
    const renderComponent = wrapper(HOC, minProps)

    expect(
      renderComponent.length
    ).toEqual(1)
  })
})
