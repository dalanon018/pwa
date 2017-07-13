import React from 'react'
import { shallow } from 'enzyme'
import BannerSlider from '../index'

describe('<BannerSlider />', () => {
  it('should render a div', () => {
    const renderedComponent = shallow(
      <BannerSlider />
    )
    expect(renderedComponent.find('div').length).toEqual(2)
  })
  it('Expect to have unit tests specified', () => {
    expect(true).toEqual(true)
  })
})
