import React, { PureComponent, PropTypes } from 'react'
import styled from 'styled-components'

import {
  Image,
  Button,
  Icon,
  Input,
  Grid
} from 'semantic-ui-react'

import { partial } from 'ramda'

import messages from './messages'

import BarcodeImage from 'images/icons/barcode-header.svg'
import SearchImage from 'images/icons/search-header.svg'
import MainLogo from 'images/cliqq-logo.svg'

import A from 'components/A'

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

const SearchIcon = styled.div`
  display: flex;
  justify-content: flex-end;
  align-items: center;
  margin-right: 20px;
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
  border-bottom: 3px solid #8DC640;
  height: 49px;
  left: 0;
  padding: 7px 10px;
  position: fixed;
  top: 0;
  width: 100%;
  z-index: 99;
`

const DesktopMenu = styled.div`
  position: relative;

  .brand {
    display: inline-block !important;
    width: 160px;
  }
`

const InputWrapper = styled.div`
  display: flex;
  justify-content: flex-end;
  input {
    border-radius: 0 !important;
    font-family: 'helveticalight' !important;
    font-size: 18px;
    height: 50px;
    width: 490px;
  }

  button {
    background-color: #F58322 !important;
    border-radius: 0 !important;
    padding: 10px 25px !important;
    i {
      color: #FFFFFF;
      font-size: 30px;
      margin: 0 !important;
      padding-top: 5px;
    }
  }
`

const NavMenu = styled.div`
  button {
    background-color: #F0F0F0 !important;
    color: #5B5B5B;
    font-family: 'helveticabold' !important;
    font-size: 18px !important;
    letter-spacing: 4px;
    padding: 20px 50px !important;
    transition: all 0.3s ease !important;
    width: 100%;

    &.active {
      background-color: #F58322 !important;
      color: #FFFFFF !important;
    }

    &:hover {
      background-color: #f6a22d !important;
      color: #FFFFFF !important;
    }
  }
`

const CategoriesContainer = styled.div`
  background-color: #FFFFFF;
  display: ${props => props.display ? 'block' : 'none'};
  min-height:378px;
  padding: 10px 0;
  position: absolute;
  top: 170px;
  width: 100%;
  z-index: 999999;

  .wrapper {
    padding: 21px 15px 0;
  }

  .category-wrapper {
    background-color: #f6a22d;
    color: white;
    padding: 5px 30px 25px !important;
  }
`

const CategoryItem = styled.p`
  border-bottom: 1px solid #fff;
  padding: 20px 0;
  width: 100%;

  a {
    color: white;
    font-family: 'helveticalight';
    font-size: 17px;
    letter-spacing: 4px;
    line-height: 20px;
    text-transform: uppercase;


    &:hover {
      color: white;
      font-size: 19px;
      font-weight: 900;
    }
  }
`

export default class MainMenu extends PureComponent {
  static propTypes= {
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

    this._handleBarcodeClick = this._handleBarcodeClick.bind(this)
    this._handlerHomeClick = this._handlerHomeClick.bind(this)
    this._handlerSearchClick = this._handlerSearchClick.bind(this)
    this._handleShowCategories = this._handleShowCategories.bind(this)
    this._handleHideCategories = this._handleHideCategories.bind(this)
    this._handleCategoryRoute = this._handleCategoryRoute.bind(this)
    this._handlerPreventDefault = this._handlerPreventDefault.bind(this)
    this._handleActiveMenu = this._handleActiveMenu.bind(this)
    this._inputReference = this._inputReference.bind(this)
    this._handleSearchItem = this._handleSearchItem.bind(this)
    this._handleKeyPress = this._handleKeyPress.bind(this)
  }

  _handleBarcodeClick () {
    const { changeRoute } = this.props
    changeRoute('/purchases')
  }

  _handlerHomeClick () {
    const { changeRoute } = this.props
    changeRoute('/')
  }

  _handlerSearchClick () {
    const { changeRoute } = this.props
    changeRoute('/search')
  }

  _inputReference (inp) {
    this._searchInput = inp
  }

  _handleSearchItem () {
    const { searchProduct, changeRoute } = this.props

    if (this._searchInput.value) {
      changeRoute('/search')

      // we should emulate it.
      setTimeout(() =>
        searchProduct({ id: this._searchInput.value })
      , 1000)
    }
  }

  _handleKeyPress (e) {
    const code = e.keyCode || e.which

    if (code === 13 && e.target.value) {
      // we will update our search key here.
      this._handleSearchItem()
    }
    return true
  }

  _handleCategoryRoute (id) {
    const { changeRoute } = this.props
    this.setState({
      show: false
    })
    changeRoute(`/products-category/${id}`)
  }

  _handleShowCategories () {
    this.setState({
      show: true
    })
  }

  _handleHideCategories () {
    this.setState({
      show: false
    })
  }

  _handlerPreventDefault (e) {
    e.preventDefault()
  }

  _handleActiveMenu () {
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
    const { leftButtonAction, hideBackButton, categories, intl } = this.props
    const { activeMenu } = this.state

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
                  <ImageLogo src={MainLogo} onClick={this._handlerHomeClick} />
                </CenterWrapper>
              </Grid.Column>
              <Grid.Column verticalAlign='middle'>
                <RightWrapper>
                  <SearchIcon>
                    <Image src={SearchImage} size='mini' onClick={this._handlerSearchClick} />
                  </SearchIcon>
                  <Image src={BarcodeImage} size='mini' onClick={this._handleBarcodeClick} />
                </RightWrapper>
              </Grid.Column>
            </Grid.Row>
          </Grid>
        </MobileMenu>
        <DesktopMenu className='desktop-visibility'>
          <Grid padded>
            <Grid.Row columns='equal' verticalAlign='middle'>
              <Grid.Column>
                <A href='/'>
                  <Image className='brand' src={MainLogo} />
                </A>
              </Grid.Column>
              <Grid.Column>
                <InputWrapper>
                  <Input
                    type='text'
                    placeholder={intl.formatMessage(messages.search)}>
                    <input
                      ref={this._inputReference}
                      onKeyPress={this._handleKeyPress}
                    />
                    <Button onClick={this._handleSearchItem} >
                      <Icon name='search' />
                    </Button>
                  </Input>
                </InputWrapper>
              </Grid.Column>
            </Grid.Row>
          </Grid>
          <NavMenu>
            <Grid padded>
              <Grid.Row columns='equal'>
                <Grid.Column>
                  <Button
                    active={activeMenu === 'home'}
                    onClick={this._handlerHomeClick}>HOME</Button>
                </Grid.Column>
                <Grid.Column>
                  <Button
                    active={activeMenu === 'productsByCategory'}
                    onClick={(e) => this._handlerPreventDefault(e)}
                    onMouseOver={this._handleShowCategories}
                    onMouseLeave={this._handleHideCategories}>CATEGORIES</Button>
                </Grid.Column>
                <Grid.Column>
                  <Button
                    active={activeMenu === 'purchases'}
                    onClick={this._handleBarcodeClick}>RECEIPTS</Button>
                </Grid.Column>
              </Grid.Row>
            </Grid>
          </NavMenu>
          <CategoriesContainer display={this.state.show} onMouseOver={this._handleShowCategories} onMouseLeave={this._handleHideCategories}>
            <div className='wrapper'>
              <Grid padded>
                <Grid.Row columns={3} className='category-wrapper'>
                  {
                    categories &&
                    categories.map((item, index) => {
                      return (
                        <Grid.Column key={index}>
                          <CategoryItem>
                            <A onClick={partial(this._handleCategoryRoute, [item.get('id')])}>{item.get('name')}</A>
                          </CategoryItem>
                        </Grid.Column>
                      )
                    })
                  }
                </Grid.Row>
              </Grid>
            </div>
          </CategoriesContainer>
        </DesktopMenu>
      </Wrapper>
    )
  }
}
