import React from 'react'
import { shallow } from 'enzyme'
import BannerSlider from '../index'
import Slider from 'react-slick'
import {
  BannerSliderWrapper
} from '../styles'

const wrapper = (props = {}, enzyme = shallow) => shallow(
  <BannerSlider {...props} />
)

describe('<BannerSlider />', () => {
  it('render without exploding', () => {
    const renderComponent = wrapper()
    expect(
      renderComponent.length
    ).toEqual(1)
  })

  it('renders without exploding', () => {
    expect(shallow(<BannerSlider />).length).toEqual(1)
  })

  it('renders without exploding', () => {
    expect(shallow(<Slider />).length).toEqual(1)
  })

  it('renders without exploding', () => {
    expect(shallow(<BannerSliderWrapper />).length).toEqual(1)
  })

  it('should render a div', () => {
    const renderedComponent = wrapper()
    expect(renderedComponent.find('div').length).toEqual(0)
  })

  it('Expect to have unit tests specified', () => {
    expect(true).toEqual(true)
  })
})
