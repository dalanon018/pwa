import React from 'react'
import { fromJS } from 'immutable'
import { shallow } from 'enzyme'

import Purchase, {
  PurchaseWrapper,
  PurchaseInfo,
  PurchaseImage,
  StatusWrapper,
  OtherInfo
} from '../index'

import {
  STATUSES,
  PURCHASE_ORDER,
  PURCHASE_USECASE
} from '../../../../containers/Buckets/constants'

const children = (<h1>Test</h1>)
const wrapper = (props = {}, enzyme = shallow) => enzyme(
  <Purchase {...props}>
    {children}
  </Purchase>
)

describe('<Purchase />', () => {
  const minProps = {
    receipt: fromJS({
      'amount': 590,
      'claimExpiry': '2017-09-27 16:09:20',
      'dateCreated': '2017-09-07 16:09:21',
      'payCode': '9956-4037-2166',
      'products': {
        'cliqqCode': '0004A',
        'image': 'https://cliqq.imgix.net/0004A.png',
        'name': 'Naviforce NF9028 30M Waterproof Analog Watch (Black/Brown/White)'
      },
      'status': 'RESERVED',
      'storeName': 'Kamias',
      'trackingNumber': '337508604184442831'
    }),
    statuses: STATUSES,
    purchaseUsecases: PURCHASE_USECASE,
    purchaseOrders: PURCHASE_ORDER,
    changeRoute: () => {}
  }

  it('render without exploding', () => {
    const renderComponent = wrapper(minProps)
    expect(
      renderComponent.length
    ).toEqual(1)
  })

  it('should render PurchaseWrapper', () => {
    const renderComponent = shallow(<PurchaseWrapper {...minProps} />)
    expect(
      renderComponent.length
    ).toEqual(1)
  })

  it('should render PurchaseInfo', () => {
    const renderComponent = shallow(<PurchaseInfo {...minProps} />)
    expect(
      renderComponent.length
    ).toEqual(1)
  })

  it('should render PurchaseImage', () => {
    const renderComponent = shallow(<PurchaseImage {...minProps} />)
    expect(
      renderComponent.length
    ).toEqual(1)
  })

  it('should render StatusWrapper', () => {
    const renderComponent = shallow(<StatusWrapper {...minProps} />)
    expect(
      renderComponent.length
    ).toEqual(1)
  })

  it('should render OtherInfo', () => {
    const renderComponent = shallow(<OtherInfo {...minProps} />)
    expect(
      renderComponent.length
    ).toEqual(1)
  })

  it('should not render a div', () => {
    const renderedComponent = shallow(
      <Purchase {...minProps} />
    )
    expect(renderedComponent.find('div').length).toEqual(0)
  })
})
