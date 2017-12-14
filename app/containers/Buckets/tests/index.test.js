import React from 'react'

import { fromJS } from 'immutable'
import { shallow } from 'enzyme'
import { Buckets } from '../index'

const children = (<h1>Test</h1>)
const wrapper = (props = {}, enzyme = shallow) => enzyme(
  <Buckets {...props}>
    {children}
  </Buckets>
)

describe('<Buckets />', () => {
  const minProps = {
    isMobile: true,
    children: {},
    productCategories: fromJS({}),
    brands: fromJS({}),
    mobileNumbers: fromJS([]),
    receiptsUpdated: fromJS([]),
    toggleError: false,
    toggleMessage: null,
    pageTitle: null,
    showSearchIcon: false,
    showActivityIcon: false,
    isRegisteredPush: false,
    loyaltyToken: null,
    intl: {
      formatDate: () => {},
      formatTime: () => {},
      formatRelative: () => {},
      formatNumber: () => {},
      formatPlural: () => {},
      formatMessage: () => {},
      formatHTMLMessage: () => {},
      now: () => {}
    },
    match: {},
    location: {
      pathname: '/'
    },
    routeName: null,
    getCategories: () => {},
    getBrands: () => {},
    getUpdatedReceipts: () => {},
    setUpdatedReceipts: () => {},
    searchProduct: () => {},
    setProductSearchList: () => {},
    setNetworkError: () => {},
    dispatch: () => {},
    changeRoute: () => {},
    getRegisteredPush: () => {},
    registerPush: () => {},
    getLoyaltyToken: () => {},
    removeLoyaltyToken: () => {},
    headerMenuFullScreen: false
  }

  it('render without exploding', () => {
    const renderComponent = wrapper(minProps)
    expect(
      renderComponent.length
    ).toEqual(1)
  })
})
