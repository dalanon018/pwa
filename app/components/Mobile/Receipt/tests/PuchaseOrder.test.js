import React from 'react'
import { shallow } from 'enzyme'
import { fromJS } from 'immutable'

import PurchaseOrder from '../PurchaseOrder'

const children = (<h1>Test</h1>)
const wrapper = (props = {}, enzyme = shallow) => enzyme(
  <PurchaseOrder {...props}>
    {children}
  </PurchaseOrder>
)

describe('<Receipt PurchaseOrder/>', () => {
  const minProps = {
    status: 'RESERVED',
    modePayment: 'CASH',
    storeName: 'Kamias',
    receipt: fromJS({
      'trackingNumber': '344760497230963792',
      'claimExpiry': '2017-08-13 00:17:08',
      'currency': 'CASH',
      'dateCreated': '2017-07-20 16:17:34',
      'amount': '450.00',
      'quantity': '1',
      'mobileNumber': '09052720567',
      'status': 'CONFIRMED',
      'location': {
        'store_id': '0001',
        'name': 'IBM PLAZA-EASTWOOD'
      },
      'products': {
        'product_id': '0001',
        'image': null,
        'brandLogo': null,
        'name': 'All Day Backpack | (wine)',
        'barcode': '718037806839',
        'price': '600',
        'discount': {
          'value': '25',
          'percentType': 'percentage',
          'thru': '2015-05-06 12:00:00'
        }
      }
    })
  }

  it('render without exploding', () => {
    const renderComponent = wrapper(minProps)
    expect(
      renderComponent.length
    ).toEqual(1)
  })
})
