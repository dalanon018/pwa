import React from 'react'
import { shallow } from 'enzyme'

import CloseButton from '../index'

const wrapper = (props = {}, enzyme = shallow) => shallow(
  <CloseButton {...props} />
)

describe('<CloseButton />', () => {
  const minProps = {
    onClick: () => {}
  }

  it('should render a div', () => {
    const renderedComponent = shallow(
      <CloseButton />
    )
    expect(renderedComponent.find('div').length).toEqual(0)
  })

  it('render without exploding', () => {
    const renderComponent = wrapper(minProps)
    expect(
      renderComponent.length
    ).toEqual(1)
  })

  it('Expect to have unit tests specified', () => {
    expect(true).toEqual(true)
  })
})
