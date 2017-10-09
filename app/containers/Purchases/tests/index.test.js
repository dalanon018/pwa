import React from 'react'

import { fromJS } from 'immutable'
import { shallow } from 'enzyme'
import { Purchases } from '../index'

const children = (<h1>Test</h1>)
const wrapper = (props = {}, enzyme = shallow) => enzyme(
  <Purchases {...props}>
    {children}
  </Purchases>
)

describe('<Purchases />', () => {
  const minProps = {
    loading: false,
    modalToggle: false,
    purchases: fromJS([]),
    activePurchases: fromJS([]),
    completedPurchases: fromJS([]),
    expiredPurchases: fromJS([]),
    getApiPurchases: () => {},
    getModalToggle: () => {},
    setModalToggle: () => {},
    setMobileNumber: () => {},
    dispatch: () => {},
    changeRoute: () => {},
    setPageTitle: () => {},
    setShowSearchIcon: () => {},
    setShowActivityIcon: () => {}
  }

  it('render without exploding', () => {
    const renderComponent = wrapper(minProps)
    expect(
      renderComponent.length
    ).toEqual(1)
  })
})
