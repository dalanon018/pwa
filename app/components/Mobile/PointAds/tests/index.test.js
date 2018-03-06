import React from 'react'
import { shallow } from 'enzyme'

import { Wrapper, FlexContainer, ImageWrapper } from '../index'

describe('<PointAds />', () => {
  it('should render Wrapper without exploding', () => {
    expect(shallow(<Wrapper />).length).toEqual(1)
  })
  it('should render FlexContainer without exploding', () => {
    expect(shallow(<FlexContainer />).length).toEqual(1)
  })
  it('should render ImageWrapper without exploding', () => {
    expect(shallow(<ImageWrapper />).length).toEqual(1)
  })
})
