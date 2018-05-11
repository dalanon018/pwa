import React, { PureComponent } from 'react'
import PropTypes from 'prop-types'
import styled from 'styled-components'
import { injectIntl, FormattedMessage } from 'react-intl'

import {
  Image,
  Grid,
  Header,
  Input,
  Container,
  List,
  Label
} from 'semantic-ui-react'

import { ifElse, identity, equals } from 'ramda'
import BarcodeImage from 'images/icons/barcode-header.svg'
import messages from './messages'
import MainLogo from 'images/cliqq-logo.svg'
import CliqqLogo from 'images/icons/cliqq.png'
import CategoryDock from 'images/icons/category-dock.svg'

import Logout from 'images/icons/drawer/signout.svg'

import SearchMenu from 'containers/Buckets/SearchMenu'
// import { FLASH_DEALS_LANDING_PAGE } from '../../../containers/Buckets/constants'

const Wrapper = styled.div`
  background-color: #FFFFFF;
  display: block;
  position: fixed;
  top: 0;
  width: 100%;
  z-index: 10;

  .no-padding {
    @media screen and (max-width: 767px) {
      padding-left: 0 !important;
    }
  }

  .no-padding-left {
    padding-left: 0 !important;
  }

  .header-menu-grid {
    height: 100%;
  }

  .custom-column {
    padding: 0 8px !important;
  }
`

const ImageLogo = styled.img`
  width: 80px;
  height: 35px;
`

const ActivitiesIcon = styled.div`
  margin-left: ${props => props.marginLeft ? 0 : 20}px;

  img {
    cursor: pointer;
    display: inline-block !important;
  }

  @media screen and (max-width: 767px) {
    margin-left: 9px !important;
  }
  @media screen and (max-width: 320px) {
    margin-left: 4px !important;
  }
`

const SearchInput = styled(Input)`
  border: 0;
  font-size: 18px;
  letter-spacing: 1px;
  margin: 0 5px;
  width: 100%;
`

const PageTitle = styled.div`
  h1 {
    &.long-title {
      font-size: 18px;
      line-height: 18px;
    }
  }
`

const SearchWrapper = styled.div`
  padding-right: 10px;
  padding-left: 10px;
`

const LogoWrapper = styled.div`
  img {
    cursor: pointer;
    width: 100px;
  }
`

const MainNav = styled.div`
  // margin-top: 87px;
  padding: 87px 15px 0;
  position: relative;
  z-index: 2;

  .label {
    cursor: pointer;
  }
`

const MenuWrapper = styled.div`
  font-family: 'Roboto', sans-serif;
  font-weight: 600;

  .list-wrapper {
    display: flex !important;
    justify-content: space-between;
    width: 500px !important;
  }
`

const SignOutWrapper = styled.div`
  display: inline-block;
  margin-left: 40px;
  position: relative;

  img {
    cursor: pointer;
    width: 21px !important;
  }
`
const OptionsWrapper = styled.div`
  align-items: center;
  display: flex;
  justify-content: flex-end;
`

const MagicBlock = styled.div`
  height: 100vh;
  left: 0;
  position: fixed;
  top: 0;
  width: 100%;
  z-index: 1;
`

const MenusContainer = styled.div`
  align-items: center;
  display: flex;
  justify-content: space-between;

  .category-menu {
    display: flex;
    align-items: center;

    &:after {
      content: '';
      width: 3px;
      height: 3px;
      border: solid #FFFFFF;
      border-width: 0 2px 2px 0;
      display: inline-block;
      padding: 3px;
      margin-left: 10px;

      ${
        props => props.arrowToggle
        ? 'transform: rotate(-135deg);margin-top: 3px;'
        : 'transform: rotate(45deg);'
      }
    }
  }
`

const CategoryDrop = styled.div`
  align-items: center;
  cursor: pointer;
  display: flex;

  img {
    margin-right: 10px;
  }
`

const CategoryListsWrapper = styled.div`
  display: flex;
  height: ${props => props.toggle ? '500px' : '0'};
  left: 0;
  overflow: ${props => props.toggle ? 'visible' : 'hidden'};
  position: absolute;
  top: 38px;
  transition: .3s ease;
  z-index: 1;

  .list {
    .item {
      cursor: pointer;
      margin-bottom: 20px;
      padding: 0 22px;
      position: relative;

      &:hover {
        p {
          color: #FF4813;
        }
      }

      // don't sort this
      &.category-nav {
        &:after {
          content: '';
          width: 8px;
          height: 8px;
          border: solid #FF4813;
          border-width: 0 2px 2px 0;
          display: inline-block;
          right: 20px;
          transform: rotate(-45deg);
          position: absolute;
          visibility: visible;
          top: 5px;
        }
      }
    }
  }
`

const CategoryList = styled.div`
  border-right: 1px solid #e8e8e8;
  direction: rtl;
  overflow-y: auto;
  padding: 22px 0;
  text-align: left;
  width: 250px;
  z-index: 3;
`

const SubCategoryList = styled.div`
  direction: rtl;
  height: 100%;
  left: ${props => props.toggle ? '250px' : '0'};
  overflow-y: auto;
  padding: 22px 0;
  position: absolute;
  text-align: left;
  transition: .3s ease;
  width: 250px;
  z-index: 2;
`

const CurrentPointsContainer = styled.div`
  align-items: center;
  display: flex;
  justify-content: center;

  .label {
    flex-grow: 1;
  }

  img {
    margin: 0 5px 0 10px;
    width: 15px;
  }
`

const LogoutWrapper = styled.div`
  align-items: center;
  background: #FFFFFF;
  display: flex;
  float: right;
  justify-content: flex-start;
  padding: 5px 10px;
  position: absolute;
  right: 0;
  top: 25px;
  width: 100%;

  img {
    margin-right: 10px;
  }
`

const toggleComponent = (componentA, componentB) => (condition) => {
  return ifElse(
    identity,
    () => componentA,
    () => componentB
  )(condition)
}

class HeaderNav extends PureComponent {
  static propTypes= {
    pageTitle: PropTypes.string,
    showActivityIcon: PropTypes.bool.isRequired,
    changeRoute: PropTypes.func.isRequired,
    loyaltyToken: PropTypes.string,
    currentPoints: PropTypes.number
  }

  state = {
    activeItem: null,
    windowHeightOffset: 0,
    subCategoryToggle: false,
    logout: false,
    subCategory: [],
    categoryId: ''
  }

  _handleShowLogoutButton = () => {
    const { isSignIn, mobileNumbers } = this.props

    const toggleLogout = () => {
      this.setState(prevState => ({logout: !prevState.logout}))
    }

    const toggleComponent = ifElse(
      identity,
      () => (
        <SignOutWrapper>
          <Label as='p' className='margin__none text__weight--500' basic size='large'>
            Signed in: <span className='color__primary cursor__pointer' onClick={toggleLogout}>{mobileNumbers.toJS().pop()}</span>
          </Label>
          {
              this.state.logout &&
              <LogoutWrapper className='box__shadow--primary cursor__pointer' onClick={this._handleSignOut}>
                <div>
                  <Image alt='help' size='mini' src={Logout} />
                </div>
                <div>
                  <Label as='p' className='margin__none text__weight--500' basic size='large'>Logout</Label>
                </div>
              </LogoutWrapper>
          }
        </SignOutWrapper>
      ),
      () => null
    )

    return toggleComponent(isSignIn)
  }

  _handleSignOut = () => {
    const { signOut } = this.props
    signOut()
  }

  _handleBrandsMenu = () => {
    this.setState((prevState) => ({
      brandsMenu: !prevState.brandsMenu
    }))
  }

  _handleCloseBrands = () => this.setState({ brandsMenu: false })

  _handleColumnSize = (currentRoute, place) => {
    const pageSetWidth = {
      home: {side: 2, middle: 12},
      termsConditions: {side: 2, middle: 12},
      productPage: {side: 3, middle: 10}
    }

    return pageSetWidth[currentRoute] ? pageSetWidth[currentRoute][place] : (place === 'side' ? 4 : 8)
  }

  _handleGotoSearch = () => this.props.changeRoute('/search')

  _updateScrollPosition = (e) => {
    this.setState({
      windowHeightOffset: window.pageYOffset
    })
  }

  _handleUniqueHeader = () => {
    const { pageTitle, changeRoute, intl, currentRoute } = this.props
    const { windowHeightOffset } = this.state

    const pageTitleParsed = () => {
      if (pageTitle && pageTitle.length > 17) {
        return <Header className='color__secondary long-title' as='h1'> { pageTitle } </Header>
      }

      return <Header className='color__secondary' as='h1'> { pageTitle } </Header>
    }

    const TitleToggle = toggleComponent(
      <ImageLogo alt='logo' src={MainLogo} onClick={changeRoute.bind(this, '/')} />,
      <PageTitle>
        {pageTitleParsed()}
      </PageTitle>
    )

    const ShowSearchInputLogo = toggleComponent(
      <SearchInput
        className='color__secondary'
        icon='search'
        placeholder={intl.formatMessage(messages.searchPlaceHolder)}
        onClick={this._handleGotoSearch}
      />,
      TitleToggle(!pageTitle)
    )

    return ShowSearchInputLogo((currentRoute === 'home' && windowHeightOffset >= 53))
  }

  _handleEnterChildren = (e, children, isChildren, id) => {
    const getId = () => {
      let classes = e.target.className.split(' ')
      return classes[classes.length - 1]
    }

    if (isChildren) {
      this.setState({
        subCategory: children,
        subCategoryToggle: true,
        categoryId: getId()
      })
    }
  }

  _handleLeaveChildren = () => this.setState({subCategoryToggle: false})

  _handleStayChildren = () => this.setState({subCategoryToggle: true})

  _handleHasArrow = (children, id) => {
    const { subCategoryToggle, categoryId } = this.state

    if (subCategoryToggle && children && categoryId === id) {
      return 'category-nav'
    }
  }

  _toggleDisplayCurrentPoints = () => {
    const { isSignIn, currentPoints } = this.props
    return toggleComponent(
      <CurrentPointsContainer>
        <div>
          <Label as='p' className='margin__none text__weight--500 color__white' basic size='large'>
            <FormattedMessage {...messages.currentCliqqPointsLabel} />
          </Label>
        </div>
        <div>
          <Image src={CliqqLogo} alt='CLiQQ' />
        </div>
        <div>
          <Label as='p' className='margin__none text__weight--500 color__white' basic size='large'>
            {currentPoints}
          </Label>
        </div>
      </CurrentPointsContainer>,
      null
    )(isSignIn)
  }

  _mainNavHeader = () => {
    const { categories, changeRoute, categoryToggle, _toggleCategoryDrop } = this.props
    const { subCategoryToggle, subCategory } = this.state

    const gotToProduct = (id) => () => {
      changeRoute(`/products-category/${id}`)
      _toggleCategoryDrop()
    }

    const goToPage = (slug) => () => {
      changeRoute(`/${slug}`)
    }

    return (
      <MenuWrapper className='position__relative'>
        <MenusContainer arrowToggle={categoryToggle}>
          <CategoryDrop onClick={_toggleCategoryDrop}>
            <Image src={CategoryDock} alt='CLiQQ' />
            <Label as='p' className='margin__none text__weight--500 color__white category-menu' basic size='large'>
              <FormattedMessage {...messages.categoriesMenu} />
            </Label>
          </CategoryDrop>
          <div>
            <List horizontal className='width__full list-wrapper'>
              <List.Item onClick={goToPage('flash-deals')}>
                <Label as='p' className='margin__none text__weight--500 color__white' basic size='large'>
                  <FormattedMessage {...messages.flashDealsMenu} />
                </Label>
              </List.Item>
              <List.Item onClick={goToPage('purchases')}>
                <Label as='p' className='margin__none text__weight--500 color__white' basic size='large'>
                  <FormattedMessage {...messages.myActivitiesMenu} />
                </Label>
              </List.Item>
              <List.Item onClick={goToPage('wallet')}>
                <Label as='p' className='margin__none text__weight--500 color__white' basic size='large'>
                  <FormattedMessage {...messages.pointsBalanceMenu} />
                </Label>
              </List.Item>
              <List.Item onClick={goToPage('brands')}>
                <Label as='p' className='margin__none text__weight--500 color__white' basic size='large'>
                  <FormattedMessage {...messages.brandsMenu} />
                </Label>
              </List.Item>
            </List>
          </div>
          { this._toggleDisplayCurrentPoints() }
        </MenusContainer>
        {
          <CategoryListsWrapper toggle={categoryToggle} className='box__shadow--primary'>
            <CategoryList className='border_right__one--light-grey background__white'>
              <List className='width__full'>
                {
                  categories && categories.map((category, index) => {
                    const isChildren = category.get('children').size !== 0

                    return (
                      <List.Item
                        key={index}
                        onClick={gotToProduct(category.get('id'))}
                        onMouseEnter={e => this._handleEnterChildren(e, category.get('children'), isChildren, category.get('id'))}
                        onMouseLeave={this._handleLeaveChildren}
                        className={`${this._handleHasArrow(isChildren, category.get('id'))} ${category.get('id')}`}>
                        <Label as='p' className={`margin__none text__weight--400 margin__none ${category.get('id')}`} basic size='large'>
                          {category.get('name')}
                        </Label>
                      </List.Item>
                    )
                  })
                }
              </List>
            </CategoryList>
            {
              <SubCategoryList toggle={subCategoryToggle} onMouseEnter={() => this._handleStayChildren()} onMouseLeave={() => this._handleLeaveChildren()} className='background__white'>
                <List className='width__full'>
                  {
                    subCategory.map(category => {
                      return (
                        <List.Item key={category.get('id')} onClick={gotToProduct(category.get('id'))}>
                          <Label as='p' className='margin__none text__weight--400 margin__none' basic size='large'>
                            {category.get('name')}
                          </Label>
                        </List.Item>
                      )
                    })
                  }
                </List>
              </SubCategoryList>
            }
          </CategoryListsWrapper>
        }
      </MenuWrapper>
    )
  }

  componentWillReceiveProps (nextProps) {
    const { currentRoute } = nextProps
    const willAddOrRemoveEvent = ifElse(
      equals('home'),
      () => window.addEventListener('scroll', this._updateScrollPosition),
      () => window.removeEventListener('scroll', this._updateScrollPosition)
    )

    willAddOrRemoveEvent(currentRoute)
  }

  componentDidMount () {
    window.addEventListener('scroll', this._updateScrollPosition)
  }

  componentWillUnmount () {
    window.removeEventListener('scroll', this._updateScrollPosition)
  }

  render () {
    const { changeRoute, showActivityIcon, currentRoute, clearSearchNav, searchProductNav, hideBackButtonNav, _handleSearchInputValueNav, leftButtonActionNav } = this.props

    const homeRoute = currentRoute === 'home'
    const pathname = window.location.pathname.split('/')[1] === 'search'

    const ActivitiesToggle = toggleComponent(
      <ActivitiesIcon marginLeft={homeRoute}>
        <Image alt='Activities' src={BarcodeImage} size='mini' onClick={changeRoute.bind(this, '/purchases')} />
      </ActivitiesIcon>,
      null
    )

    return (
      <div>
        { this.state.brandsMenu && <MagicBlock onClick={this._handleCloseBrands} /> }
        <Wrapper>
          <div className='padding__vertical--10'>
            <Container className='header__custom-padding'>
              <Grid>
                <Grid.Row columns={4} verticalAlign='middle'>
                  <Grid.Column width={4}>
                    <LogoWrapper>
                      <Image alt='CLiQQ' src={MainLogo} onClick={changeRoute.bind(this, '/')} />
                    </LogoWrapper>
                  </Grid.Column>
                  <Grid.Column width={8}>
                    <SearchWrapper>
                      {
                        pathname
                        ? <SearchMenu
                          clearSearch={clearSearchNav}
                          searchProduct={searchProductNav}
                          hideBackButton={hideBackButtonNav}
                          _handleSearchInputValue={_handleSearchInputValueNav}
                          leftButtonAction={leftButtonActionNav}
                          className='search-textfield'
                        />
                        : <Input
                          aria-label='search'
                          name='search'
                          fluid
                          onClick={changeRoute.bind(this, '/search')}
                          placeholder={this.props.intl.formatMessage(messages.searchPlaceHolder)}
                          icon='search'
                          className='search-textfield'
                        />
                      }
                    </SearchWrapper>
                  </Grid.Column>
                  <Grid.Column width={4} textAlign='right'>
                    <OptionsWrapper>
                      { ActivitiesToggle(showActivityIcon) }
                      { this._handleShowLogoutButton() }
                    </OptionsWrapper>
                  </Grid.Column>
                </Grid.Row>
              </Grid>
            </Container>
          </div>
        </Wrapper>

        <MainNav className='background__primary'>
          <Container className='header__custom-padding'>
            { this._mainNavHeader() }
          </Container>
        </MainNav>
      </div>
    )
  }
}

export default injectIntl(HeaderNav)
