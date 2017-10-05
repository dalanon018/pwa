import React from 'react'
import { shallow } from 'enzyme'

import EmptyProducts, { EmptyWrapper, EmptyWrapperText } from '../EmptyProducts'

const children = (<h1>Test</h1>)
const MainEnzymeWrapper = (props = {}, enzyme = shallow) => enzyme(
  <EmptyProducts {...props}>
    {children}
  </EmptyProducts>
)

const EmptyWrapperEnzymeWrapper = (props = {}, enzyme = shallow) => enzyme(
  <EmptyWrapper {...props}>
    {children}
  </EmptyWrapper>
)

const EmptyWrapperTextEnzymeWrapper = (props = {}, enzyme = shallow) => enzyme(
  <EmptyWrapperText {...props}>
    {children}
  </EmptyWrapperText>
)

describe('ProductsByCategory <EmptyProducts>', () => {
  const minProps = {
  }

  it('should render without exploding', () => {
    const renderComponent = MainEnzymeWrapper(minProps)
    expect(
      renderComponent.length
    ).toEqual(1)
  })

  it('should render  EmptyWrapper without exploding', () => {
    const renderComponent = EmptyWrapperEnzymeWrapper(minProps)
    expect(
      renderComponent.length
    ).toEqual(1)
  })

  it('should render EmptyWrapperText without exploding', () => {
    const renderComponent = EmptyWrapperTextEnzymeWrapper(minProps)
    expect(
      renderComponent.length
    ).toEqual(1)
  })
})
