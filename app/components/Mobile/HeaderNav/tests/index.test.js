import React from 'react'
import { shallow } from 'enzyme'

import HeaderNav, {
  Wrapper,
  LeftWrapper,
  ImageLogo,
  RightWrapper,
  ActivitiesIcon,
  Hamburger,
  HamburgerSpan,
  MobileMenu,
  SearchInput,
  PageTitle,
  SearchContainer,
  CustomRow
} from '../index'

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

  it('should render Wrapper', () => {
    const renderComponent = shallow(<Wrapper />)
    expect(
      renderComponent.length
    ).toEqual(1)
  })

  it('should render LeftWrapper', () => {
    const renderComponent = shallow(<LeftWrapper />)
    expect(
      renderComponent.length
    ).toEqual(1)
  })

  it('should render ImageLogo', () => {
    const renderComponent = shallow(<ImageLogo />)
    expect(
      renderComponent.length
    ).toEqual(1)
  })

  it('should render RightWrapper', () => {
    const renderComponent = shallow(<RightWrapper />)
    expect(
      renderComponent.length
    ).toEqual(1)
  })

  it('should render ActivitiesIcon', () => {
    const renderComponent = shallow(<ActivitiesIcon />)
    expect(
      renderComponent.length
    ).toEqual(1)
  })

  it('should render Hamburger', () => {
    const renderComponent = shallow(<Hamburger />)
    expect(
      renderComponent.length
    ).toEqual(1)
  })

  it('should render HamburgerSpan', () => {
    const renderComponent = shallow(<HamburgerSpan />)
    expect(
      renderComponent.length
    ).toEqual(1)
  })

  it('should render MobileMenu', () => {
    const renderComponent = shallow(<MobileMenu />)
    expect(
      renderComponent.length
    ).toEqual(1)
  })

  it('should render SearchInput', () => {
    const renderComponent = shallow(<SearchInput />)
    expect(
      renderComponent.length
    ).toEqual(1)
  })

  it('should render PageTitle', () => {
    const renderComponent = shallow(<PageTitle />)
    expect(
      renderComponent.length
    ).toEqual(1)
  })

  it('should render SearchContainer', () => {
    const renderComponent = shallow(<SearchContainer />)
    expect(
      renderComponent.length
    ).toEqual(1)
  })

  it('should render CustomRow', () => {
    const renderComponent = shallow(<CustomRow />)
    expect(
      renderComponent.length
    ).toEqual(1)
  })
})
