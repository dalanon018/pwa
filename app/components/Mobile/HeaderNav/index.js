import React, { PureComponent } from 'react'
import PropTypes from 'prop-types'
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
import PointsIcon from 'images/icons/points-header-icon.svg'
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

// const CenterWrapper = styled.div`
//   display: flex;
//   justify-content: center;
// `

const ImageLogo = styled.img`
  height: 35px;
  left: 34px;
  position: absolute;
  top: 50%;
  transform: translate(-50%, -50%);
  width: 40px;
  z-index: 1;
`

const RightWrapper = styled.div`
  align-items: center;
  display: flex;
  justify-content: ${props => props.toggleSpace ? 'space-between' : 'flex-end'};

  .mini {
    height: 18px !important;
    width: 14px !important;
  }
  
  .small {
    height: 21px !important;
    width: 17px !important;
  }
`

const ActivitiesIcon = styled.div`
  margin: ${props => props.marginLeft ? '0 2px 0' : 0};

  @media screen and (max-width: 767px) {
    // margin-left: 9px !important;
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
  width: 21px;
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
    background-color: #FFFFFF;
    content: "";
  }

  &::before {
    transform-origin: top right;
    transition: transform 0.3s, width 0.3s, top 0.3s;
    top: ${({active}) => active ? '0' : '-5px'};
    transform: ${({active}) => active ? 'translateX(0) translateY(0) rotate(45deg)' : 'none'};
  }

  &::after {
    transform-origin: bottom right;
    transition: transform 0.3s, width 0.3s, bottom 0.3s;
    bottom: ${({active}) => active ? '0' : '-5px'};;
    transform: ${({active}) => active ? 'translateX(0) translateY(0) rotate(-45deg)' : 'none'};
  }
`

const MobileMenu = styled.div`
  ${props => props.shadow && 'box-shadow: 1px 1px 5px rgba(120,120,120, 0.7);'}
  padding-right: 10px;
  padding-left: 10px;
  height: ${({headerMenuFullScreen}) => headerMenuFullScreen ? '100vh' : '50px'};
  left: 0;
  position: fixed;
  top: 0;
  width: 100%;
  z-index: 99;
`

const SearchInput = styled(Input)`
  font-size: 18px;
  letter-spacing: 1px;
  margin: 0 5px;
  width: 100%;
  
  input {
    border-radius: 4.5px !important;
    border: 0 !important;
    line-height: 22px !important;
    padding-left: 60px !important;
    text-align: center !important;

    @media (min-width: 375px) {
      padding-left: 12.600px !important;
    }
  }
`

const PageTitle = styled.div`
  h1 {
    &.long-title {
      font-size: 18px;
      line-height: 18px;
    }
  }
`

const SearchContainer = styled.div`
  position: relative;
  width: 100%;
`

const CustomRow = styled(Grid.Row)`
  padding: 5px 0 !important;
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
    headerMenuFullScreen: PropTypes.bool.isRequired,
    showSearchIcon: PropTypes.bool.isRequired,
    showPointsIcon: PropTypes.bool.isRequired,
    showActivityIcon: PropTypes.bool.isRequired,
    hideBackButton: PropTypes.bool.isRequired,
    leftButtonAction: PropTypes.func.isRequired,
    changeRoute: PropTypes.func.isRequired
  }

  state = {
    activeItem: null,
    windowHeightOffset: 0,
    toggleSpace: false
  }

  _handleColumnSize = (currentRoute, place) => {
    const pageSetWidth = {
      home: {leftSide: 2, middle: 12, rightSide: 2},
      termsConditions: {leftSide: 2, middle: 11, rightSide: 3},
      productPage: {leftSide: 2, middle: 11, rightSide: 3}
    }

    if (pageSetWidth[currentRoute]) {
      return pageSetWidth[currentRoute][place]
    } else if (place === 'leftSide') {
      return 2
    } else if (place === 'rightSide') {
      return 3
    } else {
      return 11
    }
  }

  _handleGotoSearch = () => this.props.changeRoute('/search')

  _updateScrollPosition = (e) => {
    this.setState({
      windowHeightOffset: window.pageYOffset
    })
  }

  _handleUniqueHeader = () => {
    const { pageTitle, changeRoute, intl, currentRoute } = this.props

    const pageTitleParsed = () => {
      if (pageTitle && pageTitle.length > 17) {
        return <Header className='color__white margin__top-positive--3 long-title text__align--left' as='h1'> { pageTitle } </Header>
      }

      return <Header className='color__white margin__top-positive--3 text__align--left' as='h1'> { pageTitle } </Header>
    }

    const TitleShow = () => (
      <PageTitle>
        {pageTitleParsed()}
      </PageTitle>
    )

    const ShowSearchInputLogo = toggleComponent(
      <SearchContainer onClick={this._handleGotoSearch}>
        <ImageLogo alt='logo' src={MainLogo} onClick={changeRoute.bind(this, '/')} />
        <SearchInput
          // className='color__light-grey'
          placeholder={intl.formatMessage(messages.searchPlaceHolder)}
        />
      </SearchContainer>,
      TitleShow(!pageTitle)
    )

    return ShowSearchInputLogo(currentRoute === 'home')
  }

  _handleQuickLinks (a, b, c) {
    const filtered = [a, b, c].filter(el => el)

    if (filtered.length > 1) {
      this.setState({toggleSpace: true})
    } else {
      this.setState({toggleSpace: false})
    }
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

  componentDidUpdate () {
    const { showSearchIcon, showPointsIcon, showActivityIcon } = this.props

    this._handleQuickLinks(showSearchIcon, showPointsIcon, showActivityIcon)
  }

  componentDidMount () {
    const { showSearchIcon, showPointsIcon, showActivityIcon } = this.props

    window.addEventListener('scroll', this._updateScrollPosition)
    this._handleQuickLinks(showSearchIcon, showPointsIcon, showActivityIcon)
  }

  componentWillUnmount () {
    window.removeEventListener('scroll', this._updateScrollPosition)
  }

  render () {
    const { leftButtonAction, hideBackButton, changeRoute, showSearchIcon, showPointsIcon, showActivityIcon, currentRoute, headerMenuFullScreen } = this.props
    const { windowHeightOffset, toggleSpace } = this.state

    const homeRoute = currentRoute === 'home'

    const SearchToggle = toggleComponent(
      <Image alt='CLiQQ' src={SearchImage} size='small' onClick={changeRoute.bind(this, '/search')} />,
      null
    )

    const PointsToggle = toggleComponent(
      <Image alt='CLiQQ' src={PointsIcon} size='small' onClick={changeRoute.bind(this, '/wallet')} />,
      null
    )

    const ActivitiesToggle = toggleComponent(
      <ActivitiesIcon marginLeft={homeRoute}>
        <Image alt='Activities' src={BarcodeImage} size='mini' onClick={changeRoute.bind(this, '/purchases')} />
      </ActivitiesIcon>,
      null
    )

    return (
      <Wrapper>
        <MobileMenu className='header-wrapper background__primary' headerMenuFullScreen={headerMenuFullScreen} shadow={windowHeightOffset >= 53}>
          <Grid padded className='header-menu-grid'>
            <CustomRow>
              <Grid.Column
                className='custom-column'
                width={this._handleColumnSize(currentRoute, 'leftSide')}
                verticalAlign='middle'>
                <LeftWrapper onClick={leftButtonAction} >
                  <Hamburger>
                    <HamburgerSpan className='background__white' active={!hideBackButton}>toggle menu</HamburgerSpan>
                  </Hamburger>
                </LeftWrapper>
              </Grid.Column>
              <Grid.Column
                className={homeRoute ? 'no-padding-left' : null}
                width={this._handleColumnSize(currentRoute, 'middle')}
                verticalAlign='middle'>
                { this._handleUniqueHeader() }
              </Grid.Column>
              <Grid.Column
                width={this._handleColumnSize(currentRoute, 'rightSide')}
                verticalAlign='middle'>
                <RightWrapper toggleSpace={toggleSpace} marginLeft={homeRoute}>
                  { SearchToggle(showSearchIcon) }
                  { PointsToggle(showPointsIcon) }
                  { ActivitiesToggle(showActivityIcon) }
                </RightWrapper>
              </Grid.Column>
            </CustomRow>
          </Grid>
        </MobileMenu>
      </Wrapper>
    )
  }
}
