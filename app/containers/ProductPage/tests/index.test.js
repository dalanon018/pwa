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
    changeRoute: () => {},
    setCurrentProduct: () => {},
    setHandlersDefault: () => {},
    setPageTitle: () => {},
    setShowSearchIcon: () => {},
    setShowActivityIcon: () => {},
    setHeaderMenuFullScreen: () => {},
    product: fromJS({
      'product_id': '0001',
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
