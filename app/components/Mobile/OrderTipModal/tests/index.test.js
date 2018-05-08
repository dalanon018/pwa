import React from 'react'
import { shallow } from 'enzyme'

import OrderTipModal, {
  DetailsWrapper,
  ButtonWrapper,
  BannerHeader,
  ModalContainer
} from '../index'

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

  it('should render DetailsWrapper', () => {
    const renderComponent = shallow(<DetailsWrapper />)
    expect(
      renderComponent.length
    ).toEqual(1)
  })

  it('should render ButtonWrapper', () => {
    const renderComponent = shallow(<ButtonWrapper />)
    expect(
      renderComponent.length
    ).toEqual(1)
  })

  it('should render BannerHeader', () => {
    const renderComponent = shallow(<BannerHeader />)
    expect(
      renderComponent.length
    ).toEqual(1)
  })

  it('should render ModalContainer', () => {
    const renderComponent = shallow(<ModalContainer />)
    expect(
      renderComponent.length
    ).toEqual(1)
  })
})
