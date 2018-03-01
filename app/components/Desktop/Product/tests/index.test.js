/**
 * Testing our Product View component
 */

import React from 'react'
import { shallow } from 'enzyme'
import { fromJS } from 'immutable'

import Product from '../index'
import SizeSelector from '../SizeSelector'

// import ProductSlider from 'components/Shared/BannerSlider'
import {LoadingStateInfo} from 'components/Shared/LoadingBlock'

import {
  ButtonContainer,
  DetailsWrapper,
  ProductDetails,
  ProductMainContent,
  ProductPriceWrapper,
  ProductWrapper,
  SocialContainer,
  ShareWrapper,
  ProductImageSlider
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
      'title': 'Penshoppe All Day Sling Bag (Blue)',
      'details': '<p>Men&rsquo;s all day sling bag in 100% polyester coated polycanvas with color blocking pattern, and 2 compartments</p>',
      'barcode': '31005231',
      'additionalDetails': 'This is a sample text for the additional details field for this product. Thank you',
      'isFeatured': true,
      'returnable': true,
      'returnPolicy': 'Not satisfied with your purchase? Depending on our CLiQQ Care Policy, you can return your item anytime of the day within 7 days from claim date. Just go to the 7-Eleven store where the item was purchased and get your Return Slip from the CLiQQ Kiosk and bring it to the cashier.',
      'brand': {
        'code': '01',
        'name': 'Penshoppe',
        'isFeatured': true,
        'images': [{
          'imageUrl': 'https://cliqq.imgix.net/test/category/product-assets/brand-logo.png', 'imageType': 'BRAND_LOGO'},
          {'imageUrl': 'http://i.dailymail.co.uk/i/pix/2015/05/07/16/286A073200000578-0-image-a-2_1431013568311.jpg', 'imageType': 'BACKGROUND'},
          {'imageUrl': 'http://ph-live-01.slatic.net/cms/category_banner/02152016/kendall.jpg', 'imageType': 'SLIDER'},
          {'imageUrl': 'http://ph-live-02.slatic.net/cms/category_banner/02152016/lucky.jpg', 'imageType': 'SLIDER'}
        ]
      },
      'uom': {
        'name': 'M',
        'type': 'Size'
      },
      'association': [
        {
          'title': 'Penshoppe All Day Sling Bag (Blue)',
          'details': '<p>Men&rsquo;s all day sling bag in 100% polyester coated polycanvas with color blocking pattern, and 2 compartments</p>',
          'quantity': '1',
          'cliqqCode': ['000A4'],
          'size': 'M',
          'uom': {
            'name': 'M',
            'type': 'Size'
          }
        },
        {
          'title': 'Penshoppe All Day Sling Bag (Green)',
          'details': '<p>Men&rsquo;s green all day sling bag in 100% polyester pu coated polycanvas with color blocking pattern, penshoppe logo, and 2 compartments</p>',
          'quantity': '1',
          'cliqqCode': ['000CB'],
          'size': 'S',
          'uom': {
            'name': 'S',
            'type': 'Size'
          }
        }
      ],
      'priceList': [
        {
          'amount': 139,
          'currency': 'PHP'
        },
        {
          'amount': 99,
          'currency': 'DPHP'
        }
      ],
      'cliqqCode': ['000A4'],
      'quantity': '1',
      'deliveryPromiseMessage': '<p>Delivery for:</p>\n            <p>Mega Manila: 1-3 Days</p>\n            <p>Major Luzon Provinces: 3-5 Days</p>\n            <p>Vis-Min Provinces: 7-14 Days (Not available yet!)</p>',
      'price': 139,
      'discountPrice': 99,
      'image': 'https://cliqq.imgix.net/000A4.png',
      'brandLogo': 'https://cliqq.imgix.net/test/category/product-assets/brand-logo.png',
      'sliders': [],
      'size': 'M'
    }),
    loading: false,
    onSubmit: () => {},
    origPrice: () => {},
    intl: {
      formatMessage: () => {}
    },
    onSizeChange: () => {},
    changeRoute: () => {}
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

  // TODO: TEST
  // it('renders one <ProductSlider/> component', () => {
  //   const ShallowedWrapper = shallow(<Product {...minProps} />)
  //   expect(ShallowedWrapper.find(ProductSlider).length).toHaveLength(1)
  // })

  it('renders one <ProductMainContent/> styled component', () => {
    const ShallowedWrapper = shallow(<Product {...minProps} />)
    expect(ShallowedWrapper.find(ProductMainContent)).toHaveLength(1)
  })

  it('renders three <LoadingStateInfo/> components', () => {
    const ShallowedWrapper = shallow(<Product {...minProps} />)
    expect(ShallowedWrapper.find(LoadingStateInfo)).toHaveLength(3)
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

  it('should render SizeSelector Component since Association Exist', () => {
    const ShallowedWrapper = shallow(<Product {...minProps} />)
    expect(ShallowedWrapper.find(SizeSelector)).toHaveLength(1)
  })

  it('should NOT render SizeSelector Component since Association DOESNT Exist', () => {
    const props = {
      ...minProps,
      product: fromJS({
        'title': 'Penshoppe All Day Sling Bag (Blue)',
        'details': '<p>Men&rsquo;s all day sling bag in 100% polyester coated polycanvas with color blocking pattern, and 2 compartments</p>',
        'barcode': '31005231',
        'additionalDetails': 'This is a sample text for the additional details field for this product. Thank you',
        'isFeatured': true,
        'returnable': true,
        'returnPolicy': 'Not satisfied with your purchase? Depending on our CLiQQ Care Policy, you can return your item anytime of the day within 7 days from claim date. Just go to the 7-Eleven store where the item was purchased and get your Return Slip from the CLiQQ Kiosk and bring it to the cashier.',
        'brand': {
          'code': '01',
          'name': 'Penshoppe',
          'isFeatured': true,
          'images': [{
            'imageUrl': 'https://cliqq.imgix.net/test/category/product-assets/brand-logo.png', 'imageType': 'BRAND_LOGO'},
            {'imageUrl': 'http://i.dailymail.co.uk/i/pix/2015/05/07/16/286A073200000578-0-image-a-2_1431013568311.jpg', 'imageType': 'BACKGROUND'},
            {'imageUrl': 'http://ph-live-01.slatic.net/cms/category_banner/02152016/kendall.jpg', 'imageType': 'SLIDER'},
            {'imageUrl': 'http://ph-live-02.slatic.net/cms/category_banner/02152016/lucky.jpg', 'imageType': 'SLIDER'}
          ]
        },
        'priceList': [
          {
            'amount': 139,
            'currency': 'PHP'
          },
          {
            'amount': 99,
            'currency': 'DPHP'
          }
        ],
        'cliqqCode': ['000A4'],
        'quantity': '1',
        'deliveryPromiseMessage': '<p>Delivery for:</p>\n            <p>Mega Manila: 1-3 Days</p>\n            <p>Major Luzon Provinces: 3-5 Days</p>\n            <p>Vis-Min Provinces: 7-14 Days (Not available yet!)</p>',
        'price': 139,
        'discountPrice': 99,
        'image': 'https://cliqq.imgix.net/000A4.png',
        'brandLogo': 'https://cliqq.imgix.net/test/category/product-assets/brand-logo.png',
        'sliders': [],
        'size': 'M'
      })
    }
    const ShallowedWrapper = shallow(<Product {...props} />)
    expect(ShallowedWrapper.find(SizeSelector)).toHaveLength(0)
  })
})
