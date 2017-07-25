import React from 'react'
import { fromJS } from 'immutable'
import { shallow } from 'enzyme'

import Purchase from '../index'

const children = (<h1>Test</h1>)
const wrapper = (props = {}, enzyme = shallow) => enzyme(
  <Purchase {...props}>
    {children}
  </Purchase>
)

describe('<Purchase />', () => {
  const minProps = {
    order: fromJS({}),
    onClick: () => {}
  }

  it('render without exploding', () => {
    const renderComponent = wrapper(minProps)
    expect(
      renderComponent.length
    ).toEqual(1)
  })
})
