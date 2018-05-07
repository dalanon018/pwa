import React from 'react'
import { shallow } from 'enzyme'

import HeaderNav from '../index'

const wrapper = (Component = HeaderNav, props = {}, enzyme = shallow) => enzyme(
  <Component {...props} />
)

describe('<HeaderNav />', () => {
  const minProps = {
    pageTitle: 'Test',
    headerMenuFullScreen: false,
    showSearchIcon: false,
    showPointsIcon: false,
    showActivityIcon: false,
    hideBackButton: false,
    leftButtonAction: () => {},
    changeRoute: () => {},
    intl: {
      formatMessage: () => {}
    }
  }

  it('render without exploding', () => {
    const renderComponent = wrapper(HeaderNav, minProps)
    expect(
      renderComponent.length
    ).toEqual(1)
  })
})
