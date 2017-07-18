import React, { PureComponent, PropTypes } from 'react'
import styled from 'styled-components'

import {
  Image,
  Grid
} from 'semantic-ui-react'

import BarcodeImage from 'images/icons/barcode-header.svg'
import SearchImage from 'images/icons/search-header.svg'
import HamburgerImage from 'images/icons/hamburger-header.svg'
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
`

const CenterWrapper = styled.div`
  display: flex;
  justify-content: center;
`
const HamburgerWrapper = styled.img`
  width: 24px;
  height: 24px;
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

export default class MainMenu extends PureComponent {
  static propTypes= {
    toggleSidebarAction: PropTypes.func.isRequired,
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
    const { toggleSidebarAction } = this.props

    return (
      <Wrapper>
        <Grid columns={3}>
          <Grid.Row>
            <Grid.Column verticalAlign='middle'>
              <LeftWrapper onClick={toggleSidebarAction} >
                <HamburgerWrapper src={HamburgerImage} />
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
