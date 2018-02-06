import React from 'react'
import { shallow } from 'enzyme'
import {
  BannerSliderWrapper,
  ImageWrapper
} from '../styles'

const wrapper = (Component, props = {}, enzyme = shallow) => shallow(
  <Component {...props} />
)

describe('BannerSlider Styles', () => {
  it('BannerSliderWrapper should render without exploding', () => {
    const renderComponent = wrapper(BannerSliderWrapper)
    expect(
      renderComponent.length
    ).toEqual(1)
  })

  it('ImageWrapper should render without exploding', () => {
    const renderComponent = wrapper(ImageWrapper)
    expect(
      renderComponent.length
    ).toEqual(1)
  })
})
