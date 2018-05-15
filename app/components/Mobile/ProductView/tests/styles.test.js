import React from 'react'
import { shallow } from 'enzyme'

import {
  ImageWrapper,
  ProductInfo,
  ProductPriceWrapper,
  ProductWrapper
} from '../styles'

describe('<Styles />', () => {
  it('should render ImageWrapper', () => {
    const renderComponent = shallow(<ImageWrapper />)
    expect(
      renderComponent.length
    ).toEqual(1)
  })

  it('should render ProductInfo', () => {
    const renderComponent = shallow(<ProductInfo />)
    expect(
      renderComponent.length
    ).toEqual(1)
  })

  it('should render ProductPriceWrapper', () => {
    const renderComponent = shallow(<ProductPriceWrapper />)
    expect(
      renderComponent.length
    ).toEqual(1)
  })

  it('should render ProductWrapper', () => {
    const renderComponent = shallow(<ProductWrapper />)
    expect(
      renderComponent.length
    ).toEqual(1)
  })
})
