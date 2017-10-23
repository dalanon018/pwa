import React from 'react'

import { fromJS } from 'immutable'
import { shallow } from 'enzyme'
import { ProductPage } from '../index'

import Product from 'components/Product'
import PopupSlide from 'components/PopupSlide'
import PopupVerification from 'components/PopupVerification'

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
    toggle: false,
    productSuccess: false,
    productError: false,
    mobileNumbers: fromJS([1, 2, 3]),
    loyaltyToken: null
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

  it('renders one <PopupSlide/> custom component', () => {
    const renderComponent = wrapper(minProps)
    expect(renderComponent.find(PopupSlide)).toHaveLength(1)
  })

  it('renders one <PopupVerification/> custom component', () => {
    const renderComponent = wrapper(minProps)
    expect(renderComponent.find(PopupVerification)).toHaveLength(1)
  })
})
