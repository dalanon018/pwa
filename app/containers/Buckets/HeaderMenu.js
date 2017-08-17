import React, { PureComponent, PropTypes } from 'react'
import styled from 'styled-components'

import {
  Image,
  Button,
  // Icon,
  // Input,
  Grid
} from 'semantic-ui-react'

import { partial } from 'ramda'

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

// const InputWrapper = styled.div`
//   display: flex;
//   justify-content: flex-end;
//   input {
//     border-radius: 0 !important;
//     font-family: 'helveticalight' !important;
//     font-size: 18px;
//     height: 50px;
//     width: 490px;
//   }

//   button {
//     background-color: #F58322 !important;
//     border-radius: 0 !important;
//     padding: 10px 25px !important;
//     i {
//       color: #FFFFFF;
//       font-size: 30px;
//       margin: 0 !important;
//       padding-top: 5px;
//     }
//   }
// `

const NavMenu = styled.div`
  button {
    background-color: #F0F0F0 !important;
    color: #5B5B5B;
    font-family: 'helveticabold' !important;
    font-size: 18px !important;
    letter-spacing: 4px;
    padding: 20px 50px !important;
    width: 100%;

    &:hover {
      background: transparent !important;
      color: #5B5B5B !important;
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
    padding: 0 40px;
  }
`

const CategoryItem = styled.p`
  border-bottom: 1px solid #5B5B5B;
  padding: 20px 0;
  width: 100%;

  a {
    color: #5B5B5B;
    font-family: 'helveticalight';
    font-size: 18px;
    letter-spacing: 4px;
    line-height: 20px;
    text-transform: uppercase;

    &:hover {
      color: #F58322;
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

  constructor () {
    super()

    this.state = {
      show: false
    }

    this._handleBarcodeClick = this._handleBarcodeClick.bind(this)
    this._handlerHomeClick = this._handlerHomeClick.bind(this)
    this._handlerSearchClick = this._handlerSearchClick.bind(this)
    this._handleShowCategories = this._handleShowCategories.bind(this)
    this._handleHideCategories = this._handleHideCategories.bind(this)
    this._handleCategoryRoute = this._handleCategoryRoute.bind(this)
    this._handlerPreventDefault = this._handlerPreventDefault.bind(this)
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

  _handleCategoryRoute (id) {
    const { changeRoute } = this.props
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

  render () {
    const { leftButtonAction, hideBackButton, categories } = this.props
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
              {/*
                <Grid.Column>
                  <InputWrapper>
                    <Input type='text' placeholder='00001' />
                    <Button onClick={() => {}} >
                      <Icon name='search' />
                    </Button>
                  </InputWrapper>
                </Grid.Column>
              */}
            </Grid.Row>
          </Grid>
          <NavMenu>
            <Grid padded>
              <Grid.Row columns='equal'>
                <Grid.Column>
                  <Button onClick={this._handlerHomeClick}>HOME</Button>
                </Grid.Column>
                <Grid.Column>
                  <Button onClick={(e) => this._handlerPreventDefault(e)} onMouseOver={this._handleShowCategories} onMouseLeave={this._handleHideCategories}>CATEGORIES</Button>
                </Grid.Column>
                <Grid.Column>
                  <Button onClick={this._handleBarcodeClick}>RECEIPTS</Button>
                </Grid.Column>
              </Grid.Row>
            </Grid>
          </NavMenu>
          <CategoriesContainer display={this.state.show} onMouseOver={this._handleShowCategories} onMouseLeave={this._handleHideCategories}>
            <div className='wrapper'>
              <Grid padded>
                <Grid.Row columns={3}>
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
