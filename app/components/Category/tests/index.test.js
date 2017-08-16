import React from 'react'
import { fromJS } from 'immutable'
import { shallow } from 'enzyme'

import Category from '../index'

describe('<Category />', () => {
  const minProps = {
    grids: {},
    categories: fromJS({}),
    changeRoute: () => {}
  }

  it('should render a div', () => {
    const renderedComponent = shallow(
      <Category {...minProps} />
    )
    expect(renderedComponent.find('div').length).toEqual(0)
  })
})
