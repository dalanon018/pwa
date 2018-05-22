import React from 'react'

import { shallow } from 'enzyme'
import { fromJS } from 'immutable'

import { WalletPage } from '../index'

describe('<WalletPage />', () => {
  const minProps = {
    changeRoute: () => {},
    getWallet: () => {},
    getMobileNumber: () => {},
    resetWallet: () => {},
    setPageTitle: () => {},
    setRouteName: () => {},
    setShowSearchIcon: () => {},
    setShowPointsIcon: () => {},
    setShowActivityIcon: () => {},
    transactionsLoading: false,
    lazyload: false,
    match: {
      params: {
        id: 'CAT1'
      }
    },
    transactionsCount: 0,
    transactions: fromJS([]),
    mobileNumber: null,
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

  it('should not render a div', () => {
    const renderedComponent = shallow(
      <WalletPage {...minProps} />
    )
    expect(renderedComponent.find('div').length).toEqual(0)
  })
})
