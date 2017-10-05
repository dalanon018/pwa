import React from 'react'
import { shallow } from 'enzyme'
import BannerSlider from '../index'
import Slider from 'react-slick'

const wrapper = (props = {}, enzyme = shallow) => shallow(
  <BannerSlider {...props} />
)

describe('<BannerSlider />', () => {
  const minProps = {
    loader: false,
    images: []
  }

  it('render without exploding', () => {
    const renderComponent = wrapper(minProps)
    expect(
      renderComponent.length
    ).toEqual(1)
  })

  it('renders without exploding', () => {
    expect(shallow(<Slider />).length).toEqual(1)
  })
})
