import React from 'react'
import { shallow } from 'enzyme'

import { HomePage } from '../index'

describe('<HomePage />', () => {
  it('should render a div', () => {
    const renderedComponent = shallow(
      <HomePage />
    )
    expect(renderedComponent.find('div').length).toEqual(3)
  })
  it('Expect to have unit tests specified', () => {
    expect(true).toEqual(true)
  })
})
