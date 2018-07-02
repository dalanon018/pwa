import React from 'react'
import { shallow } from 'enzyme'
import { fromJS } from 'immutable'

import HeaderNav, {
  Wrapper,
  ImageLogo,
  ActivitiesIcon,
  SearchInput,
  PageTitle,
  SearchWrapper,
  LogoWrapper,
  MainNav,
  MenuWrapper,
  SignOutWrapper,
  OptionsWrapper,
  MagicBlock,
  MenusContainer,
  CategoryDrop,
  CategoryListsWrapper,
  CategoryList,
  SubCategoryList,
  CurrentPointsContainer,
  LogoutWrapper
} from '../index'

const wrapper = (Component = HeaderNav, props = {}, enzyme = shallow) => enzyme(
  <Component {...props} />
)

describe('<HeaderNav />', () => {
  const minProps = {
    pageTitle: 'Lorem Ipsum',
    showActivityIcon: false,
    changeRoute: () => {},
    loyaltyToken: 'qwerty',
    currentPoints: 123,
    mobileNumbers: fromJS([]),

    _handleSignOut: () => {},
    _handleShowLogoutButton: () => {},
    _handleGoToPage: () => {},
    _handleBrandsMenu: () => {},
    _handleCloseBrands: () => {},
    _handleColumnSize: () => {},
    _handleGotoSearch: () => {},
    _updateScrollPosition: () => {},
    _handleUniqueHeader: () => {},
    _handleEnterChildren: () => {},
    _handleLeaveChildren: () => {},
    _handleStayChildren: () => {},
    _handleHasArrow: () => {},
    _toggleDisplayCurrentPoints: () => {},
    _mainNavHeader: () => {},
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

  it('should render three div\'s', () => {
    const renderedComponent = wrapper(HeaderNav, minProps)
    expect(renderedComponent.find('div').length).toEqual(3)
  })

  it('should render <Wrapper />', () => {
    const renderComponent = shallow(<Wrapper />)
    expect(renderComponent.length).toEqual(1)
  })

  it('should render <ImageLogo />', () => {
    const renderComponent = shallow(<ImageLogo />)
    expect(renderComponent.length).toEqual(1)
  })

  it('should render <ActivitiesIcon />', () => {
    const renderComponent = shallow(<ActivitiesIcon />)
    expect(renderComponent.length).toEqual(1)
  })

  it('should render <SearchInput />', () => {
    const renderComponent = shallow(<SearchInput />)
    expect(renderComponent.length).toEqual(1)
  })

  it('should render <PageTitle />', () => {
    const renderComponent = shallow(<PageTitle />)
    expect(renderComponent.length).toEqual(1)
  })

  it('should render <SearchWrapper />', () => {
    const renderComponent = shallow(<SearchWrapper />)
    expect(renderComponent.length).toEqual(1)
  })

  it('should render <LogoWrapper />', () => {
    const renderComponent = shallow(<LogoWrapper />)
    expect(renderComponent.length).toEqual(1)
  })

  it('should render <MainNav />', () => {
    const renderComponent = shallow(<MainNav />)
    expect(renderComponent.length).toEqual(1)
  })

  it('should render <MenuWrapper />', () => {
    const renderComponent = shallow(<MenuWrapper />)
    expect(renderComponent.length).toEqual(1)
  })

  it('should render <SignOutWrapper />', () => {
    const renderComponent = shallow(<SignOutWrapper />)
    expect(renderComponent.length).toEqual(1)
  })

  it('should render <OptionsWrapper />', () => {
    const renderComponent = shallow(<OptionsWrapper />)
    expect(renderComponent.length).toEqual(1)
  })

  it('should render <MagicBlock />', () => {
    const renderComponent = shallow(<MagicBlock />)
    expect(renderComponent.length).toEqual(1)
  })

  it('should render <MenusContainer />', () => {
    const renderComponent = shallow(<MenusContainer />)
    expect(renderComponent.length).toEqual(1)
  })

  it('should render <CategoryDrop />', () => {
    const renderComponent = shallow(<CategoryDrop />)
    expect(renderComponent.length).toEqual(1)
  })

  it('should render <CategoryListsWrapper />', () => {
    const renderComponent = shallow(<CategoryListsWrapper />)
    expect(renderComponent.length).toEqual(1)
  })

  it('should render <CategoryList />', () => {
    const renderComponent = shallow(<CategoryList />)
    expect(renderComponent.length).toEqual(1)
  })

  it('should render <CurrentPointsContainer />', () => {
    const renderComponent = shallow(<CurrentPointsContainer />)
    expect(renderComponent.length).toEqual(1)
  })

  it('should render <LogoutWrapper />', () => {
    const renderComponent = shallow(<LogoutWrapper />)
    expect(renderComponent.length).toEqual(1)
  })

  it('should render <SubCategoryList />', () => {
    const renderComponent = shallow(<SubCategoryList />)
    expect(renderComponent.length).toEqual(1)
  })
})
