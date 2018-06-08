import React from 'react'
import { shallow } from 'enzyme'
import { fromJS } from 'immutable'

import WalletSection, {
  ContentWrapper,
  PointsPreviewWrapper,
  UserPointsWrapper
} from '../index'

const wrapper = (Component = WalletSection, props = {}, enzyme = shallow) => enzyme(
  <Component {...props} />
)

describe('<WalletSection />', () => {
  const minProps = {
    lazyload: false,
    transactions: fromJS({}),
    wallet: fromJS({}),
    transactionsLoading: false,
    _displayEmptyLoadingIndicator: () => {},
    _displayTransactionsItems: () => {},
    intl: {
      formatMessage: () => {}
    }
  }

  it('render without exploding', () => {
    const renderComponent = wrapper(WalletSection, minProps)
    expect(
      renderComponent.length
    ).toEqual(1)
  })

  it('should render three div\'s', () => {
    const renderedComponent = wrapper(WalletSection, minProps)
    expect(renderedComponent.find('div').length).toEqual(3)
  })

  it('should render ContentWrapper', () => {
    const renderComponent = shallow(<ContentWrapper />)
    expect(renderComponent.length).toEqual(1)
  })

  it('should render PointsPreviewWrapper', () => {
    const renderComponent = shallow(<PointsPreviewWrapper />)
    expect(renderComponent.length).toEqual(1)
  })

  it('should render UserPointsWrapper', () => {
    const renderComponent = shallow(<UserPointsWrapper />)
    expect(renderComponent.length).toEqual(1)
  })
})
