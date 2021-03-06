import React from 'react'
import { shallow } from 'enzyme'

import PlainCard, { Wrapper } from '../index'

const wrapper = (Component = PlainCard, props = {}, enzyme = shallow) => enzyme(
  <Component {...props} />
)

describe('<PlainCard />', () => {
  const minProps = {
    children: {},
    borderRadius: false
  }

  it('render without exploding', () => {
    const renderComponent = wrapper(PlainCard, minProps)
    expect(
      renderComponent.length
    ).toEqual(1)
  })

  it('should render Wrapper', () => {
    const renderComponent = shallow(<Wrapper />)
    expect(
      renderComponent.length
    ).toEqual(1)
  })
})
