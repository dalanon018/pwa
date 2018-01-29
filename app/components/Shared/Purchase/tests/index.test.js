import React from 'react'
import { fromJS } from 'immutable'
import { shallow } from 'enzyme'

import Purchase from '../index'

import {
  STATUSES,
  PURCHASE_ORDER,
  PURCHASE_USECASE
} from '../../../containers/Buckets/constants'

const children = (<h1>Test</h1>)
const wrapper = (props = {}, enzyme = shallow) => enzyme(
  <Purchase {...props}>
    {children}
  </Purchase>
)

describe('<Purchase />', () => {
  const minProps = {
    receipt: fromJS({
      // 'trackingNumber': '344760497230963792',
      // 'claimExpiry': '2017-08-13 00:17:08',
      // 'currency': 'CASH',
      // 'dateCreated': '2017-07-20 16:17:34',
      // 'amount': '450.00',
      // 'quantity': '1',
      // 'mobileNumber': '09052720567',
      // 'status': 'CONFIRMED',
      // 'location': {
      //   'store_id': '0001',
      //   'name': 'IBM PLAZA-EASTWOOD'
      // },
      // 'products': {
      //   'product_id': '0001',
      //   'image': null,
      //   'brandLogo': null,
      //   'name': 'All Day Backpack | (wine)',
      //   'barcode': '718037806839',
      //   'price': '600',
      //   'discount': {
      //     'value': '25',
      //     'percentType': 'percentage',
      //     'thru': '2015-05-06 12:00:00'
      //   }
      // }

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
})
