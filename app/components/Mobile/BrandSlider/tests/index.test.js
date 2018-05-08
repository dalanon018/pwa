import React from 'react'
import { shallow } from 'enzyme'
import { fromJS } from 'immutable'

import BrandSlider, { SliderItem } from '../index'

const wrapper = (Component = BrandSlider, props = {}, enzyme = shallow) => enzyme(
  <Component {...props} />
)

describe('<BrandSlider />', () => {
  const minProps = {
    brands: fromJS([
      {
        background: 'https://cliqqshop.imgix.net/PWA/brands/slider-001_1.jpg',
        id: '001',
        isFeatured: true,
        logo: 'https://cliqqshop.imgix.net/PWA/test-brands/e3-brand-logo-001.jpg',
        name: '7-Eleven',
        sliders: ['https://cliqqshop.imgix.net/PWA/brands/slider-001_1.jpg']
      }
    ]),
    changeRoute: () => {},
    loader: false
  }

  it('render without exploding', () => {
    const renderComponent = wrapper(BrandSlider, minProps)
    expect(
      renderComponent.length
    ).toEqual(1)
  })

  it('SliderItem should render', () => {
    const renderComponent = shallow(<SliderItem />)
    expect(
      renderComponent.length
    ).toEqual(1)
  })
})
