import React from 'react'
import { shallow } from 'enzyme'

import { OrderTip, Wrapper, FlexContainer } from '../index'

const wrapper = (Component = OrderTip, props = {}, enzyme = shallow) => enzyme(
  <Component {...props} />
)

describe('<OrderTip />', () => {
  const minProps = {
    toggle: false,
    bannerMap: false,
    changeRoute: () => {},
    _handleOpenMap: () => {},
    _handleOpen: () => {},
    _handleClose: () => {},
    intl: {
      formatMessage: () => {}
    },
    windowWidth: 320
  }

  it('render without exploding', () => {
    const renderComponent = wrapper(OrderTip, minProps)
    expect(
      renderComponent.length
    ).toEqual(1)
  })

  it('renders without exploding', () => {
    expect(shallow(<Wrapper />).length).toEqual(1)
  })
  it('renders without exploding', () => {
    expect(shallow(<FlexContainer />).length).toEqual(1)
  })
})
