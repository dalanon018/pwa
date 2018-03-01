import React, { PureComponent } from 'react'
import PropTypes from 'prop-types'
import styled from 'styled-components'
import { injectIntl } from 'react-intl'
import { chunk } from 'lodash'

import {
  Dropdown,
  Image,
  Grid,
  Header,
  Input,
  Container,
  List,
  Label
} from 'semantic-ui-react'

import { categoriesGroup } from 'utils/categories-group'

import { ifElse, identity, equals, toPairs } from 'ramda'
import BarcodeImage from 'images/icons/barcode-header.svg'
import messages from './messages'
import MainLogo from 'images/cliqq-logo.svg'
// import Label from 'semantic-ui-react/dist/commonjs/elements/Label/Label';

import Logout from 'images/icons/drawer/signout.svg'

import SearchMenu from 'containers/Buckets/SearchMenu'

const Wrapper = styled.div`
  display: block;
  position: fixed;
  width: 100%;
  z-index: 10;
  background-color: #FFFFFF;

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
  padding: 0 15px;
  position: relative;
`

const MenuWrapper = styled.div`
  font-family: 'Roboto', sans-serif;
  font-weight: 600;

  .list {
    &>.item {
      cursor: pointer;
      height: 46px;
      margin-left: 30px !important;
      overflow: visible;
      padding: 15px 0 !important;
  
      &:hover {
        border-bottom: 2px solid #8DC640;
      }
    }
  }

  .float-right {
    float: right;
  }
`

const BrandLists = styled.div`
  display: flex;
  flex-wrap: wrap;
  justify-content: flex-start;
`

const BrandsMenuWrapper = styled.div`
  box-shadow: 2px 11px 13px -5px rgba(0,0,0,0.14);
  height: ${props => props.toggle ? '425px' : 0};
  left: 0;
  overflow: hidden;
  position: absolute;
  top: 46px;
  transition: height 0.3s ease-in;
  width: 100%;
  z-index: 10;
`

const BrandGroup = styled.div`
  align-items: top;
  border-top: 2px solid #ebebeb;
  display: flex;
  margin: 0 10px 50px;
  // padding: 0 10px;

  .brand-name {
    color: #057A5F !important;
    font-size: 16px !important;
    margin-right: 10px;
    margin-top: 7px;
  }

  .list-margin {
    margin: 0 10px;
    padding-top: 10px;
  }

  .sub-brands {
    cursor: pointer;
    font-size: 1rem;
    transition: all .3s ease;
  
    &:hover {
      color: #f58322;
      text-decoration: underline;
    }
  }
`

const BrandsContainer = styled.div`
  height: 415px;
  margin-left: -10px;
  overflow: auto;
  padding: 20px 0;
  width: 100%;
`

const SignOutWrapper = styled.div`
  display: inline-block;
  margin-left: 40px;

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
    changeRoute: PropTypes.func.isRequired
  }

  state = {
    activeItem: null,
    windowHeightOffset: 0,
    brandsMenu: false
  }

  _handleShowLogoutButton = () => {
    const { isSignIn } = this.props

    const toggleComponent = ifElse(
      identity,
      () => (
        <SignOutWrapper>
          <Image alt='help' size='mini' onClick={this._handleSignOut} src={Logout} />
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

  _handleBrandLists = () => {
    const { brands, changeRoute } = this.props
    const groupBrands = categoriesGroup(brands)
    const gotToBrands = (id) => () => {
      this.setState({
        brandsMenu: false
      })
      changeRoute(`/brands/${id}`)
    }

    return (
      <BrandLists>
        {
          toPairs(groupBrands).map(([title, item], key) => {
            // const isNumber = parseInt(title)
            const chunkItem = chunk(item, 5)

            return (
              <BrandGroup key={key}>
                {/* <Label as='span' className='brand-name' basic size='large'>{ !isNaN(isNumber) ? '#' : title }</Label> */}
                <Label as='span' className='brand-name' basic size='large'>{ title }</Label>
                {
                    chunkItem.map((entity, key) => {
                      return (
                        <List key={key} className='list-margin'>
                          {
                            entity.map((data, index) => {
                              return (
                                <List.Item key={index} onClick={gotToBrands(data.get('id'))} className='sub-brands'>
                                  { data.get('name') }
                                </List.Item>
                              )
                            })
                          }
                        </List>
                      )
                    })
                  }

              </BrandGroup>
            )
          })
        }
      </BrandLists>
    )
  }

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

  _filteredCategoryMenu = () => {
    const { categories, changeRoute } = this.props
    const gotToProduct = (id) => () => {
      this.setState({
        brandsMenu: false
      })
      changeRoute(`/products-category/${id}`)
    }

    return (
      <MenuWrapper>
        <List horizontal className='width__full'>
          {
            categories && categories.splice(8).map((item, index) => {
              return (
                <List.Item key={index} onClick={gotToProduct(item.get('id'))}>
                  { item.get('name') }
                </List.Item>
              )
            })
          }

          <List.Item>
            <Dropdown text='More'>
              <Dropdown.Menu>
                {
                  categories && categories.slice(8, -1).map((item, index) => {
                    return (
                      <Dropdown.Item key={index} text={item.get('name')} onClick={gotToProduct(item.get('id'))} />
                    )
                  })
                }
              </Dropdown.Menu>
            </Dropdown>

          </List.Item>

          <List.Item className='float-right' onClick={this._handleBrandsMenu}>
            Brands
          </List.Item>
        </List>
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
          <Container>
            <Grid>
              <Grid.Row columns={3} verticalAlign='middle'>
                <Grid.Column width={3}>
                  <LogoWrapper>
                    <Image alt='CLiQQ' src={MainLogo} onClick={changeRoute.bind(this, '/')} />
                  </LogoWrapper>
                </Grid.Column>
                <Grid.Column width={10}>
                  <SearchWrapper>
                    {
                      pathname
                      ? <SearchMenu
                        clearSearch={clearSearchNav}
                        searchProduct={searchProductNav}
                        hideBackButton={hideBackButtonNav}
                        _handleSearchInputValue={_handleSearchInputValueNav}
                        leftButtonAction={leftButtonActionNav}
                      />
                      : <Input
                        aria-label='search'
                        name='search'
                        fluid
                        onClick={changeRoute.bind(this, '/search')}
                        placeholder={this.props.intl.formatMessage(messages.searchPlaceHolder)}
                        icon='search'
                      />
                    }
                  </SearchWrapper>
                </Grid.Column>
                <Grid.Column width={3} textAlign='right'>
                  <OptionsWrapper>
                    { ActivitiesToggle(showActivityIcon) }
                    { this._handleShowLogoutButton() }
                  </OptionsWrapper>
                </Grid.Column>
              </Grid.Row>
            </Grid>
          </Container>
          <MainNav className='background__light-grey'>
            <Container className='padding__none--vertical'>
              { this._filteredCategoryMenu() }
            </Container>
            <BrandsMenuWrapper className='background__white' toggle={this.state.brandsMenu}>
              <Container>
                <BrandsContainer>
                  { this._handleBrandLists() }
                </BrandsContainer>
              </Container>
            </BrandsMenuWrapper>
          </MainNav>
        </Wrapper>
      </div>
    )
  }
}

export default injectIntl(HeaderNav)