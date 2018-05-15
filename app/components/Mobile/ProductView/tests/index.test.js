import React from 'react'
import { fromJS } from 'immutable'
import { shallow } from 'enzyme'
import ProductView from '../index'

// @TODO: we have to update test to hande full points and just price.
const mockData = {
  'quantity': '1',
  'brand': {
    'code': '037',
    'images': [
      {
        'imageType': 'SLIDER',
        'imageUrl': 'https://cliqqshop.imgix.net/PWA/brands/slider-037_1.jpg'
      }, {
        'imageType': 'SLIDER',
        'imageUrl': 'https://cliqqshop.imgix.net/PWA/brands/slider-037.jpg'
      }, {
        'imageType': 'DESKTOP_SLIDER',
        'imageUrl': 'https://cliqqshop.imgix.net/PWA/brands/desktop-slider-037_1.jpg'
      }, {
        'imageType': 'E3-BRAND_LOGO',
        'imageUrl': 'https://cliqqshop.imgix.net/PWA/test-brands/e3-brand-logo-037.jpg'
      }
    ],
    'isFeatured': true,
    'name': 'Healthy Tropics'
  },
  'cliqqCode': ['00520'],
  'deliveryPromiseMessage': '<p>Delivery for:</p>\n            <p>Mega Manila: 1-3 Days</p>\n            <p>Major Luzon Provinces: 3-5 Days</p>\n            <p>Vis-Min Provinces: 7-14 Days (Not available yet!)</p>',
  'barcode': '4806508788190',
  'image': 'https://cliqqshop.imgix.net/PWA/products/primary-00520.jpg',
  'isFeatured': true,
  'details': '100 grams',
  'title': 'HT Banana Chips',
  'priceList': [
      {'amount': 60, 'currency': 'PHP'},
      {'amount': 50, 'currency': 'LPTS'}
  ],
  'returnPolicy': 'Due to final clearance and hygienic purposes, returns, exchange and refunds may not be provided for Health & Beauty Products, Jewelries, Home Care Products and Lingerie. For any concerns, kindly send an email to our Customer Service Team at cliqqsupport@7-eleven.com.ph.',
  'returnable': false,
  'price': 60,
  'discountPrice': 0,
  'discountInfo': null,
  'pointsPrice': 50,
  'brandLogo': '',
  'sliders': ['https://cliqqshop.imgix.net/PWA/products/slider-00520_1.jpg'],
  'parentCliqqCode': '00520'
}

const Wrapper = (props = {}, enzyme = shallow) => enzyme(
  <ProductView {...props} />
)

describe('<ProductView />', () => {
  const minProps = {
    products: fromJS([mockData])
  }
  it('should render a div', () => {
    const renderedComponent = Wrapper(minProps)
    expect(renderedComponent.find('div').length).toEqual(1)
  })
})
