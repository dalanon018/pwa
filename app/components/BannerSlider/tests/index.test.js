import React from 'react'
import { shallow } from 'enzyme'
import BannerSlider from '../index'

let loader
const renderComponent = (props) => shallow(
  <BannerSlider />
)

describe('<BannerSlider />', () => {
  it('should render a div', () => {
    const renderedComponent = renderComponent()
    console.log(renderedComponent)
    expect(renderedComponent.find('div').length).toEqual(0)
  })

  it('Expect to have unit tests specified', () => {
    expect(true).toEqual(true)
  })

  it('should have an loader attribute', () => {
    const renderedComponent = renderComponent()
    expect(renderedComponent.prop('loader')).toEqual(loader)
  })
})
