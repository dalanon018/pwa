import React from 'react'
import { shallow } from 'enzyme'

import { Wrapper, FlexContainer } from '../index'

describe('<OrderTip />', () => {
  it('renders without exploding', () => {
    expect(shallow(<Wrapper />).length).toEqual(1)
  })
  it('renders without exploding', () => {
    expect(shallow(<FlexContainer />).length).toEqual(1)
  })
})
