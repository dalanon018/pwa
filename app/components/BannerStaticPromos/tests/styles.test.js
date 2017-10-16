import React from 'react'
import { shallow } from 'enzyme'
import {
  BannerWrapper
} from '../styles'

const wrapper = (Component, props = {}, enzyme = shallow) => shallow(
  <Component {...props} />
)

describe('BannerStaticPromos Styles', () => {
  it('BannerSliderWrapper should render without exploding', () => {
    const renderComponent = wrapper(BannerWrapper)
    expect(
      renderComponent.length
    ).toEqual(1)
  })
})
