import React from 'react'
import { shallow } from 'enzyme'

import PointsBannerAds from '../index'

const wrapper = (Component = PointsBannerAds, props = {}, enzyme = shallow) => enzyme(
  <Component {...props} />
)

describe('<PointsBannerAds />', () => {
  const minProps = {
    changeRoute: () => {}
  }

  it('render without exploding', () => {
    const renderComponent = wrapper(PointsBannerAds, minProps)
    expect(
      renderComponent.length
    ).toEqual(1)
  })

  it('should render a div', () => {
    const renderedComponent = wrapper(PointsBannerAds, minProps)
    expect(renderedComponent.find('div').length).toEqual(1)
  })
})
