import React from 'react'
import { shallow } from 'enzyme'

import OrderTipModal from '../index'

const wrapper = (Component = OrderTipModal, props = {}, enzyme = shallow) => enzyme(
  <Component {...props} />
)

describe('<OrderTipModal />', () => {
  const minProps = {
    bannerMap: false,
    toggle: true,
    intl: {
      formatMessage: () => {}
    },
    close: () => {},
    changeRoute: () => {}
  }

  it('render without exploding', () => {
    const renderComponent = wrapper(OrderTipModal, minProps)
    expect(
      renderComponent.length
    ).toEqual(1)
  })
})
