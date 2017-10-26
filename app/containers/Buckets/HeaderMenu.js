import React, { PureComponent, PropTypes } from 'react'
import styled from 'styled-components'

import {
  Image,
  Grid,
  Header,
  Input
} from 'semantic-ui-react'

import { ifElse, identity, equals } from 'ramda'

import BarcodeImage from 'images/icons/barcode-header.svg'
import messages from './messages'
import SearchImage from 'images/icons/search-header.svg'
import MainLogo from 'images/cliqq-logo.svg'

const Wrapper = styled.div`
  display: block;
  position: relative;

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

const LeftWrapper = styled.div`
  display: flex;
  justify-content: flex-start;

  animation:fadeIn ease-in 1;
  animation-duration: .5s;
`

const CenterWrapper = styled.div`
  display: flex;
  justify-content: center;
`

const ImageLogo = styled.img`
  width: 80px;
  height: 35px;
`

const RightWrapper = styled.div`
  display: flex;
  justify-content: flex-end;

  .mini {
    height: 25px !important;
    width: 25px !important;
  }
`

const ActiviesIcon = styled.div`
  margin-left: ${props => props.marginLeft ? 0 : 20}px;

  @media screen and (max-width: 767px) {
    margin-left: 9px !important;
  }
  @media screen and (max-width: 320px) {
    margin-left: 4px !important;
  }
`

const Hamburger = styled.div`
  display: block;
  position: relative;
  overflow: hidden;
  margin: 0;
  padding: 0;
  width: 24px;
  height: 24px;
  font-size: 0;
  text-indent: -9999px;
  appearance: none;
  box-shadow: none;
  border-radius: none;
  border: none;
  cursor: pointer;
  transition: background 0.3s;

  &:focus {
    outline: none;
  }
`

const HamburgerSpan = styled.span`
  display: block;
  position: absolute;
  top: 12px;
  left: 2px;
  right: 2px;
  height: 2px;
  transition: transform 0.3s;
  transform: ${({active}) => active ? 'rotate(180deg)' : 'none'};

  &::before, &::after {
    position: absolute;
    display: block;
    right: 0;
    width: ${({active}) => active ? '50%' : '100%'};
    height: 2px;
    background-color: #5B5B5B;
    content: "";
  }

  &::before {
    transform-origin: top right;
    transition: transform 0.3s, width 0.3s, top 0.3s;
    top: ${({active}) => active ? '0' : '-7px'};
    transform: ${({active}) => active ? 'translateX(0) translateY(0) rotate(45deg)' : 'none'};
  }

  &::after {
    transform-origin: bottom right;
    transition: transform 0.3s, width 0.3s, bottom 0.3s;
    bottom: ${({active}) => active ? '0' : '-7px'};;
    transform: ${({active}) => active ? 'translateX(0) translateY(0) rotate(-45deg)' : 'none'};
  }
`

const MobileMenu = styled.div`
  background: #FFF;
  box-shadow: 1px 1px 5px rgba(174,174,174, 0.8);
  padding-right: 10px;
  padding-left: 10px;
  height: ${({headerMenuFullScreen}) => headerMenuFullScreen ? '100vh' : '49px'};
  left: 0;
  position: fixed;
  top: 0;
  width: 100%;
  z-index: 99;
`

const SearchInput = styled(Input)`
  border: 0;
  font-size: 18px;
  letter-spacing: 1px;
  margin: 0 5px;
  width: 100%;
`

const toggleComponent = (componentA, componentB) => (condition) => {
  return ifElse(
    identity,
    () => componentA,
    () => componentB
  )(condition)
}

export default class MainMenu extends PureComponent {
  static propTypes= {
    pageTitle: PropTypes.string,
    headerMenuFullScreen: PropTypes.bool,
    showSearchIcon: PropTypes.bool.isRequired,
    showActivityIcon: PropTypes.bool.isRequired,
    hideBackButton: PropTypes.bool.isRequired,
    leftButtonAction: PropTypes.func.isRequired,
    changeRoute: PropTypes.func.isRequired
  }

  state = {
    activeItem: null,
    windowHeightOffset: 0
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

    const TitleToggle = toggleComponent(
      <ImageLogo alt='logo' src={MainLogo} onClick={changeRoute.bind(this, '/')} />,
      <Header className='color__secondary' as='h1'> { pageTitle } </Header>
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

  componentWillUnmount () {
    const { currentRoute } = this.props
    const removeEventListener = ifElse(
      equals('home'),
      () => window.removeEventListener('scroll', this._updateScrollPosition),
      () => {}
    )

    removeEventListener(currentRoute)
  }

  componentDidMount = () => {
    const { currentRoute } = this.props
    const addEventListener = ifElse(
      equals('home'),
      () => window.addEventListener('scroll', this._updateScrollPosition),
      () => {}
    )

    addEventListener(currentRoute)
  }

  render () {
    const { leftButtonAction, hideBackButton, changeRoute, showSearchIcon, showActivityIcon, currentRoute, headerMenuFullScreen } = this.props

    const homeRoute = currentRoute === 'home'

    const SearchToggle = toggleComponent(
      <Image alt='Cliqq' src={SearchImage} size='mini' onClick={changeRoute.bind(this, '/search')} />,
      null
    )

    const ActivitiesToggle = toggleComponent(
      <ActiviesIcon marginLeft={homeRoute}>
        <Image alt='Activities' src={BarcodeImage} size='mini' onClick={changeRoute.bind(this, '/purchases')} />
      </ActiviesIcon>,
      null
    )

    return (
      <Wrapper>
        <MobileMenu className='header-wrapper background__white' headerMenuFullScreen={headerMenuFullScreen}>
          <Grid padded className='header-menu-grid'>
            <Grid.Row>
              <Grid.Column
                className='custom-column'
                width={this._handleColumnSize(currentRoute, 'side')}
                verticalAlign='middle'>
                <LeftWrapper onClick={leftButtonAction} >
                  <Hamburger>
                    <HamburgerSpan className='background__secondary' active={!hideBackButton}>toggle menu</HamburgerSpan>
                  </Hamburger>
                </LeftWrapper>
              </Grid.Column>
              <Grid.Column
                className={homeRoute ? 'no-padding-left' : null}
                width={this._handleColumnSize(currentRoute, 'middle')}
                verticalAlign='middle'>
                <CenterWrapper>
                  { this._handleUniqueHeader() }
                </CenterWrapper>
              </Grid.Column>
              <Grid.Column
                className='no-padding'
                width={this._handleColumnSize(currentRoute, 'side')}
                verticalAlign='middle'>
                <RightWrapper>
                  { SearchToggle(showSearchIcon) }
                  { ActivitiesToggle(showActivityIcon) }
                </RightWrapper>
              </Grid.Column>
            </Grid.Row>
          </Grid>
        </MobileMenu>
      </Wrapper>
    )
  }
}
