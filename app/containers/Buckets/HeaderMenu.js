import React, { PureComponent, PropTypes } from 'react'
import styled from 'styled-components'

import {
  Image,
  Grid,
  Header
} from 'semantic-ui-react'

import { ifElse, identity } from 'ramda'

import BarcodeImage from 'images/icons/barcode-header.svg'
import SearchImage from 'images/icons/search-header.svg'
import MainLogo from 'images/cliqq-logo.svg'

const Wrapper = styled.div`
  display: block;
  position: relative;
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
`

const ActiviesIcon = styled.div`
  margin-left: 20px;
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
  background: #5B5B5B;
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
    top: ${({active}) => active ? '0' : '-8px'};
    transform: ${({active}) => active ? 'translateX(0) translateY(0) rotate(45deg)' : 'none'};
  }

  &::after {
    transform-origin: bottom right;
    transition: transform 0.3s, width 0.3s, bottom 0.3s;
    bottom: ${({active}) => active ? '0' : '-8px'};;
    transform: ${({active}) => active ? 'translateX(0) translateY(0) rotate(-45deg)' : 'none'};
  }
`

const MobileMenu = styled.div`
  background: #FFF;
  box-shadow: 1px 1px 2px #AEAEAE;
  height: 49px;
  left: 0;
  padding: 7px 10px;
  position: fixed;
  top: 0;
  width: 100%;
  z-index: 99;
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
    showSearchIcon: PropTypes.bool.isRequired,
    showActivityIcon: PropTypes.bool.isRequired,
    hideBackButton: PropTypes.bool.isRequired,
    leftButtonAction: PropTypes.func.isRequired,
    changeRoute: PropTypes.func.isRequired
  }

  state = {
    activeItem: null
  }

  _searchInput

  constructor () {
    super()

    this.state = {
      show: false,
      activeMenu: 'home'
    }
  }

  _inputReference = (inp) => {
    this._searchInput = inp
  }

  _handleSearchItem = () => {
    const { searchProduct, changeRoute } = this.props

    if (this._searchInput.value) {
      changeRoute('/search')

      // we should emulate it.
      setTimeout(() =>
        searchProduct({ id: this._searchInput.value })
      , 1000)
    }
  }

  _handleKeyPress = (e) => {
    const code = e.keyCode || e.which

    if (code === 13 && e.target.value) {
      // we will update our search key here.
      this._handleSearchItem()
    }
    return true
  }

  _handleCategoryRoute = (id) => {
    const { changeRoute } = this.props
    this.setState({
      show: false
    })
    changeRoute(`/products-category/${id}`)
  }

  _handleShowCategories = () =>
    this.setState({
      show: true
    })

  _handleHideCategories = () =>
    this.setState({
      show: false
    })

  _handlerPreventDefault = (e) => e.preventDefault()

  _handleActiveMenu = () => {
    const { currentRoute } = this.props

    switch (currentRoute) {
      case 'home':
        this.setState({
          activeMenu: 'home'
        })
        break
      case 'purchases':
        this.setState({
          activeMenu: 'purchases'
        })
        break
      case 'productsByCategory':
        this.setState({
          activeMenu: 'productsByCategory'
        })
        break

      default:
        this.setState({
          activeMenu: ''
        })
        break
    }
  }

  componentDidUpdate () {
    this._handleActiveMenu()
  }

  render () {
    const { leftButtonAction, hideBackButton, changeRoute, pageTitle, showSearchIcon, showActivityIcon } = this.props

    const TitleToggle = toggleComponent(
      <ImageLogo alt='logo' src={MainLogo} onClick={changeRoute.bind(this, '/')} />,
      <Header as='h1'> { pageTitle } </Header>
    )

    const SearchToggle = toggleComponent(
      <Image alt='Cliqq' src={SearchImage} size='mini' onClick={changeRoute.bind(this, '/search')} />,
      null
    )

    const ActivitiesToggle = toggleComponent(
      <ActiviesIcon>
        <Image alt='Activities' src={BarcodeImage} size='mini' onClick={changeRoute.bind(this, '/purchases')} />
      </ActiviesIcon>,
      null
    )

    return (
      <Wrapper>
        <MobileMenu className='mobile-visibility'>
          <Grid columns={3}>
            <Grid.Row>
              <Grid.Column verticalAlign='middle'>
                <LeftWrapper onClick={leftButtonAction} >
                  <Hamburger>
                    <HamburgerSpan active={!hideBackButton}>toggle menu</HamburgerSpan>
                  </Hamburger>
                </LeftWrapper>
              </Grid.Column>
              <Grid.Column verticalAlign='middle'>
                <CenterWrapper>
                  { TitleToggle(!pageTitle) }
                </CenterWrapper>
              </Grid.Column>
              <Grid.Column verticalAlign='middle'>
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
