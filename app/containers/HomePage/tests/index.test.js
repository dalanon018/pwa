import React from 'react'
import { shallow } from 'enzyme'

import { HomePage } from '../index'

describe('<HomePage />', () => {
  it('should render a div', () => {
    const renderedComponent = shallow(
      <HomePage />
    )
    expect(renderedComponent.find('div').length).toEqual(1)
  })
})
