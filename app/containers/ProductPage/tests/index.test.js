import React from 'react'

import { fromJS } from 'immutable'
import { shallow } from 'enzyme'
import { ProductPage } from '../index'

import Product from 'components/Product'

const children = (<h1>Test</h1>)
const wrapper = (props = {}, enzyme = shallow) => enzyme(
  <ProductPage {...props}>
    {children}
  </ProductPage>
)

describe('<Products />', () => {
  const minProps = {
    dispatch: () => {},
    getProduct: () => {},
    setProduct: () => {},
    setRouteName: () => {},
    changeRoute: () => {},
    setCurrentProduct: () => {},
    setHandlersDefault: () => {},
    setPageTitle: () => {},
    setShowSearchIcon: () => {},
    setShowActivityIcon: () => {},
    setHeaderMenuFullScreen: () => {},
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
    productSuccess: false,
    productError: false,
    intl: {
      formatDate: () => {},
      formatTime: () => {},
      formatRelative: () => {},
      formatNumber: () => {},
      formatPlural: () => {},
      formatMessage: () => {},
      formatHTMLMessage: () => {},
      now: () => {}
    }
  }

  it('render without exploding', () => {
    const renderComponent = wrapper(minProps)
    expect(
      renderComponent.length
    ).toEqual(1)
  })

  it('renders one <Product/> custom component', () => {
    const renderComponent = wrapper(minProps)
    expect(renderComponent.find(Product)).toHaveLength(1)
  })
})
