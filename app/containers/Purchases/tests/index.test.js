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
    localLoading: false,
    apiLoading: false,
    purchases: fromJS([]),
    activePurchases: fromJS([]),
    completedPurchases: fromJS([]),
    expiredPurchases: fromJS([]),
    getApiPurchases: () => {},
    setMobileNumber: () => {},
    dispatch: () => {},
    changeRoute: () => {},
    setPageTitle: () => {},
    setRouteName: () => {},
    setShowSearchIcon: () => {},
    setShowPointsIcon: () => {},
    setShowActivityIcon: () => {},
    intl: {
      formatMessage: () => {}
    }
  }

  it('render without exploding', () => {
    const renderComponent = wrapper(minProps)
    expect(
      renderComponent.length
    ).toEqual(1)
  })
})
