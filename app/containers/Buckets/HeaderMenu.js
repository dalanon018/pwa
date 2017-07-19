import React, { PureComponent, PropTypes } from 'react'
import styled from 'styled-components'

import {
  Image,
  Grid
} from 'semantic-ui-react'

import BarcodeImage from 'images/icons/barcode-header.svg'
import SearchImage from 'images/icons/search-header.svg'
import MainLogo from 'images/cliqq-logo.svg'

const Wrapper = styled.div`
  background: #FFF;
  border-bottom: 3px solid #9bcb49;
  height: 49px;
  left: 0;
  padding: 7px 10px;
  position: fixed;
  top: 0;
  width: 100%;
  z-index: 99;
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

    this._handleBarcodeClick = this._handleBarcodeClick.bind(this)
    this._handlerHomeClick = this._handlerHomeClick.bind(this)
  }

  _handleBarcodeClick () {
    const { changeRoute } = this.props
    changeRoute('/barcodes')
  }

  _handlerHomeClick () {
    const { changeRoute } = this.props
    changeRoute('/')
  }

  render () {
    const { leftButtonAction, hideBackButton } = this.props

    return (
      <Wrapper>
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
                  <Image src={SearchImage} size='mini' onClick={this._handleBarcodeClick} />
                </SearchIcon>
                <Image src={BarcodeImage} size='mini' onClick={this._handleBarcodeClick} />
              </RightWrapper>
            </Grid.Column>
          </Grid.Row>
        </Grid>
      </Wrapper>
    )
  }
}
