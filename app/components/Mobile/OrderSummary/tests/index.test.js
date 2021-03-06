import React from 'react'
import { shallow } from 'enzyme'
import { fromJS } from 'immutable'

import OrderSummary from '../index'

import {
  ProductReviewWrapper,
  DetailsWrapper,
  ButtonContainer,
  SelectMethodWrapper,
  ProductItem,
  MethodTitle,
  StepWrapper,
  LocationButton,
  CustomGrid
} from '../styles'

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
    _handleRecentStore: () => {},
    _stepWrapperRef: () => {},
    _handleToBottom: () => {},
    _handleChange: () => {},
    _updateUsePoints: () => {},
    _handleNotEnoughFullPointsProceed: () => {},
    _handleNotEnoughFullPointsCloseModal: () => {},
    ShowCodComponent: () => <div />,
    currentPoints: 0,
    usePoints: 0,
    modePayment: 'cod',
    modalToggle: false,
    labelOne: '',
    labelTwo: '',
    storeLocatorVisibility: true,
    pointsModifierVisibility: false,
    isDisabledPointsOptions: false,
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
    couponCode: '',
    couponApplied: false,
    couponLoader: false,
    modalIcon: '',
    modalMessage: '',
    modalContent: '',
    _isFullPointsOnly: false,
    orderRequesting: false,
    store: { name: 'Quezon City', id: 1 }
  }

  it('render without exploding', () => {
    const renderComponent = wrapper(minProps)
    expect(
      renderComponent.length
    ).toEqual(1)
  })

  it('renders one <ProductReviewWrapper/> styled component', () => {
    const ShallowedWrapper = shallow(<OrderSummary {...minProps} />)
    expect(ShallowedWrapper.find(ProductReviewWrapper)).toHaveLength(1)
  })

  it('renders one <DetailsWrapper/> styled component', () => {
    const ShallowedWrapper = shallow(<OrderSummary {...minProps} />)
    expect(ShallowedWrapper.find(DetailsWrapper)).toHaveLength(1)
  })

  it('renders one <ButtonContainer/> styled component', () => {
    const ShallowedWrapper = shallow(<OrderSummary {...minProps} />)
    expect(ShallowedWrapper.find(ButtonContainer)).toHaveLength(1)
  })

  it('renders one <SelectMethodWrapper/> styled component', () => {
    const ShallowedWrapper = shallow(<OrderSummary {...minProps} />)
    expect(ShallowedWrapper.find(SelectMethodWrapper)).toHaveLength(1)
  })

  it('renders one <ProductItem/> styled component', () => {
    const ShallowedWrapper = shallow(<OrderSummary {...minProps} />)
    expect(ShallowedWrapper.find(ProductItem)).toHaveLength(1)
  })

  it('renders one <MethodTitle/> styled component', () => {
    const ShallowedWrapper = shallow(<OrderSummary {...minProps} />)
    expect(ShallowedWrapper.find(MethodTitle)).toHaveLength(1)
  })

  it('renders two <MethodTitle/> styled component if _isFullPointsOnly is "TRUE"', () => {
    const props = {
      ...minProps,
      _isFullPointsOnly: true
    }
    const ShallowedWrapper = shallow(<OrderSummary {...props} />)
    expect(ShallowedWrapper.find(MethodTitle)).toHaveLength(2)
  })

  it('renders one <StepWrapper/> styled component', () => {
    const ShallowedWrapper = shallow(<OrderSummary {...minProps} />)
    expect(ShallowedWrapper.find(StepWrapper)).toHaveLength(2)
  })

  it('renders one <LocationButton/> styled component', () => {
    const ShallowedWrapper = shallow(<OrderSummary {...minProps} />)
    expect(ShallowedWrapper.find(LocationButton)).toHaveLength(1)
  })

  it('renders one <CustomGrid/> styled component', () => {
    const ShallowedWrapper = shallow(<OrderSummary {...minProps} />)
    expect(ShallowedWrapper.find(CustomGrid)).toHaveLength(2)
  })
})
