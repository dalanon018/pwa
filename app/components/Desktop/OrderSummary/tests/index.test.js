import React from 'react'
import { shallow } from 'enzyme'
import { fromJS } from 'immutable'

import OrderSummary from '../index'

// import {
//   ProductReviewWrapper,
//   DetailsWrapper,
//   ButtonContainer,
//   SelectMethodWrapper,
//   ProductItem,
//   MethodTitle,
//   StepWrapper,
//   StepHead,
//   LocationButton
// } from '../styles'

const children = 'Test'
const wrapper = (props = {}, enzyme = shallow) => enzyme(
  <OrderSummary {...props}>
    {children}
  </OrderSummary>
)

describe('<OrderSummary />', () => {
  const minProps = {
    _updateParamsImages: () => null,
    _handleModalClose: () => {},
    _handleProceed: () => {},
    _handleStoreLocator: () => {},
    _stepWrapperRef: () => {},
    _handleToBottom: () => {},
    _handleChange: () => {},
    ShowCodComponent: () => <div />,
    modePayment: 'cod',
    modalToggle: false,
    labelOne: '',
    labelTwo: '',
    storeLocatorVisibility: true,
    isBlackListed: false,
    loader: false,
    orderedProduct: fromJS({
      'product_id': '0001',
      'image': null,
      'title': 'All Day Backpack | (wine)',
      'price': '600',
      'discountprice': 0,
      'discount': {
        'percent': '25',
        'thru': '2015-04-06 12:00:00'
      },
      'details': 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Ut dictum eros nec sagittis pretium. Phasellus consectetur metus sed interdum fringilla. Aenean congue libero sed nisl euismod tristique. Integer finibus est orci, nec hendrerit turpis mollis id. Phasellus rhoncus mollis mauris sit amet euismod.',
      'shipping': 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Ut dictum eros nec sagittis pretium. Phasellus consectetur metus sed interdum fringilla.',
      'barcode': '718037806839'
    }),
    brandLogo: null,
    productLoader: false,
    mobileLoader: false,
    orderSuccess: fromJS({}),
    orderFail: fromJS({}),
    mobileNumber: '999999999',
    errorMessage: '',
    orderRequesting: false,
    store: { name: 'Quezon City', id: 1 },
    intl: {
      formatMessage: () => {}
    },
    mobileNumbers: fromJS([])
  }

  it('Expect to have unit tests specified', () => {
    expect(true).toEqual(true)
  })

  it('render without exploding', () => {
    const renderComponent = wrapper(minProps)
    expect(
      renderComponent.length
    ).toEqual(1)
  })
})
