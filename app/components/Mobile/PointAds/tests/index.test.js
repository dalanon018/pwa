import React from 'react'
import { shallow } from 'enzyme'

import PointAds, { Wrapper, FlexContainer, ImageWrapper } from '../index'

const wrapper = (Component = PointAds, props = {}, enzyme = shallow) => enzyme(
  <Component {...props} />
)

describe('<PointAds />', () => {
  const minProps = {
    changeRoute: () => {}
  }

  it('render without exploding', () => {
    const renderComponent = wrapper(PointAds, minProps)
    expect(
      renderComponent.length
    ).toEqual(1)
  })

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
