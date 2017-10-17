import React from 'react'
import Slider from 'react-slick'

import { shallow, mount } from 'enzyme'
import BannerSlider, { HandleBlock, DefaultState } from '../index'
import {
  BannerSliderWrapper
} from '../styles'

const wrapper = (Component = BannerSlider, props = {}, enzyme = shallow) => enzyme(
  <Component {...props} />
)

describe('<BannerSlider />', () => {
  const minProps = {
    loader: false,
    isInfinite: false,
    isAutoPlay: false,
    images: []
  }

  it('render without exploding', () => {
    const renderComponent = wrapper(BannerSlider, minProps)
    expect(
      renderComponent.length
    ).toEqual(1)
  })

  it('renders without exploding', () => {
    expect(shallow(<Slider />).length).toEqual(1)
  })

  it('renders without exploding', () => {
    expect(shallow(<BannerSliderWrapper />).length).toEqual(1)
  })

  it('should render a HandleBlock', () => {
    const renderComponent = wrapper(BannerSlider, minProps)
    expect(renderComponent.find(HandleBlock).length).toEqual(1)
  })

  it('should render a defaultStatus', () => {
    const renderComponent = wrapper(BannerSlider, {...minProps, loader: true}, mount)
    expect(renderComponent.find(DefaultState).length).toEqual(1)
  })
})
