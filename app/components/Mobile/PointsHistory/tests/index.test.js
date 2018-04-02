import React from 'react'

import { shallow } from 'enzyme'

import PointsHistory from '../index'

describe('<PointsHistory />', () => {
  it('should render a div', () => {
    const renderedComponent = shallow(
      <PointsHistory />
    )
    expect(renderedComponent.find('div').length).toEqual(0)
  })
})
