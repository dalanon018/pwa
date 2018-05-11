import React from 'react'
import { fromJS } from 'immutable'
import { shallow } from 'enzyme'
import ProductView from '../index'

import {
  ImageWrapper,
  ProductInfo,
  ProductPriceWrapper,
  ProductWrapper
} from '../styles'

describe('<ProductView />', () => {
  const minProps = {
    products: fromJS([])
  }
  it('should render a div', () => {
    const renderedComponent = shallow(
      <ProductView {...minProps} />
    )
    expect(renderedComponent.find('div').length).toEqual(1)
  })

  it('Expect to have unit tests specified', () => {
    expect(true).toEqual(true)
  })

  it('should render ImageWrapper', () => {
    const renderComponent = shallow(<ImageWrapper {...minProps} />)
    expect(
      renderComponent.length
    ).toEqual(1)
  })

  it('should render ProductInfo', () => {
    const renderComponent = shallow(<ProductInfo {...minProps} />)
    expect(
      renderComponent.length
    ).toEqual(1)
  })

  it('should render ProductPriceWrapper', () => {
    const renderComponent = shallow(<ProductPriceWrapper {...minProps} />)
    expect(
      renderComponent.length
    ).toEqual(1)
  })

  it('should render ProductWrapper', () => {
    const renderComponent = shallow(<ProductWrapper {...minProps} />)
    expect(
      renderComponent.length
    ).toEqual(1)
  })
})
