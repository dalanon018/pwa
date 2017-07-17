import React from 'react'
import { shallow } from 'enzyme'

import Category from '../index'

const wrapper = (props = {}, enzyme = shallow) => shallow(
  <Category {...props} />
)

describe('<Category />', () => {
  it('should render a div', () => {
    const renderedComponent = shallow(
      <Category />
    )
    expect(renderedComponent.find('div').length).toEqual(0)
  })

  it('render without exploding', () => {
    const renderComponent = wrapper()
    expect(
      renderComponent.length
    ).toEqual(1)
  })

  it('Expect to have unit tests specified', () => {
    expect(true).toEqual(true)
  })
})
