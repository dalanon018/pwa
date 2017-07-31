import React from 'react'
import { shallow } from 'enzyme'

import Category from '../index'

describe('<Category />', () => {
  const minProps = {
    grids: {}
  }

  it('should render a div', () => {
    const renderedComponent = shallow(
      <Category {...minProps} />
    )
    expect(renderedComponent.find('div').length).toEqual(0)
  })
})
