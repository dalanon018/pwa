/**
 * Testing our Product View component
 */

import React from 'react'
import { shallow } from 'enzyme'
import { fromJS } from 'immutable'

import Product from '../index'

import ProductSlider from 'components/BannerSlider'
import {LoadingStateInfo} from 'components/LoadingBlock'

import {
  ButtonContainer,
  DetailsWrapper,
  ProductDetails,
  ProductMainContent,
  ProductPriceWrapper,
  ProductWrapper,
  SocialContainer,
  ShareWrapper,
  ProductImageSlider,
  CollapseContent
} from '../styled'

const children = 'Test'
const wrapper = (props = {}, enzyme = shallow) => enzyme(
  <Product {...props}>
    {children}
  </Product>
)

describe('<Product />', () => {
  const minProps = {
    product: fromJS({
      'cliqqCode': ['00001', '11111', '06525'],
      'image': null,
      'title': 'All Day Backpack | (wine)',
      'price': '600',
      'discount': {
        'percent': '25',
        'thru': '2015-04-06 12:00:00'
      },
      'details': 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Ut dictum eros nec sagittis pretium. Phasellus consectetur metus sed interdum fringilla. Aenean congue libero sed nisl euismod tristique. Integer finibus est orci, nec hendrerit turpis mollis id. Phasellus rhoncus mollis mauris sit amet euismod.',
      'deliveryPromiseMessage': 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Ut dictum eros nec sagittis pretium. Phasellus consectetur metus sed interdum fringilla.',
      'barcode': '718037806839'
    }),
    loading: false
  }

  it('render without exploding', () => {
    const renderComponent = wrapper(minProps)
    expect(
      renderComponent.length
    ).toEqual(1)
  })

  it('renders one <ProductImageSlider/> styled component', () => {
    const ShallowedWrapper = shallow(<Product {...minProps} />)
    expect(ShallowedWrapper.find(ProductImageSlider)).toHaveLength(1)
  })

  it('renders one <ProductSlider/> component', () => {
    const ShallowedWrapper = shallow(<Product {...minProps} />)
    expect(ShallowedWrapper.find(ProductSlider)).toHaveLength(1)
  })

  it('renders one <ProductMainContent/> styled component', () => {
    const ShallowedWrapper = shallow(<Product {...minProps} />)
    expect(ShallowedWrapper.find(ProductMainContent)).toHaveLength(1)
  })

  it('renders two <LoadingStateInfo/> components', () => {
    const ShallowedWrapper = shallow(<Product {...minProps} />)
    expect(ShallowedWrapper.find(LoadingStateInfo)).toHaveLength(2)
  })

  it('renders one <ProductPriceWrapper/> styled component', () => {
    const ShallowedWrapper = shallow(<Product {...minProps} />)
    expect(ShallowedWrapper.find(ProductPriceWrapper)).toHaveLength(1)
  })

  it('renders one <SocialContainer/> styled component', () => {
    const ShallowedWrapper = shallow(<Product {...minProps} />)
    expect(ShallowedWrapper.find(SocialContainer)).toHaveLength(1)
  })

  it('renders one <ShareWrapper/> styled component', () => {
    const ShallowedWrapper = shallow(<Product {...minProps} />)
    expect(ShallowedWrapper.find(ShareWrapper)).toHaveLength(1)
  })

  it('renders one <DetailsWrapper/> styled component', () => {
    const ShallowedWrapper = shallow(<Product {...minProps} />)
    expect(ShallowedWrapper.find(DetailsWrapper)).toHaveLength(1)
  })

  it('renders one <ProductDetails/> styled component', () => {
    const ShallowedWrapper = shallow(<Product {...minProps} />)
    expect(ShallowedWrapper.find(ProductDetails)).toHaveLength(1)
  })

  it('renders one <ButtonContainer/> styled component', () => {
    const ShallowedWrapper = shallow(<Product {...minProps} />)
    expect(ShallowedWrapper.find(ButtonContainer)).toHaveLength(1)
  })

  it('renders one <ProductWrapper/> styled component', () => {
    const ShallowedWrapper = shallow(<Product {...minProps} />)
    expect(ShallowedWrapper.find(ProductWrapper)).toHaveLength(1)
  })

  it('renders three <CollapseContent/> styled component', () => {
    const ShallowedWrapper = shallow(<Product {...minProps} />)
    expect(ShallowedWrapper.find(CollapseContent)).toHaveLength(1)
  })
})
