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

  it('renders zero <ImageWrapper/> styled component', () => {
    const ShallowedWrapper = shallow(<ProductView {...minProps} />)
    expect(ShallowedWrapper.find(ImageWrapper)).toHaveLength(0)
  })

  it('renders zero <ProductInfo/> styled component', () => {
    const ShallowedWrapper = shallow(<ProductView {...minProps} />)
    expect(ShallowedWrapper.find(ProductInfo)).toHaveLength(0)
  })

  it('renders zero <ProductWrapper/> styled component', () => {
    const ShallowedWrapper = shallow(<ProductView {...minProps} />)
    expect(ShallowedWrapper.find(ProductWrapper)).toHaveLength(0)
  })

  it('renders zero <ProductPriceWrapper/> styled component', () => {
    const ShallowedWrapper = shallow(<ProductView {...minProps} />)
    expect(ShallowedWrapper.find(ProductPriceWrapper)).toHaveLength(0)
  })
})
