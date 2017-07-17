import React, { PureComponent, PropTypes } from 'react'
import styled from 'styled-components'

import {
  Icon,
  Image,
  Grid
} from 'semantic-ui-react'

import BarcodeImage from 'images/icons/barcode-header.svg'
import MainLogo from 'images/cliqq-logo.svg'

const Wrapper = styled.div`
  background: #FFF;
  border-bottom: 3px solid lightgreen;
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
  margin-right: 10px;
`

export default class MainMenu extends PureComponent {
  static propTypes= {
    toggleSidebarAction: PropTypes.func.isRequired
  }

  state = {
    activeItem: null
  }

  constructor () {
    super()
    this._handleItemClick = this._handleItemClick.bind(this)
  }

  _handleItemClick (e, { name }) {
    this.setState({ activeItem: name })
  }

  render () {
    const { toggleSidebarAction } = this.props

    return (
      <Wrapper>
        <Grid columns={3}>
          <Grid.Row>
            <Grid.Column verticalAlign='middle'>
              <LeftWrapper onClick={toggleSidebarAction} >
                <Icon
                  size='large'
                  name='sidebar'
                />
              </LeftWrapper>
            </Grid.Column>
            <Grid.Column verticalAlign='middle'>
              <CenterWrapper>
                <ImageLogo src={MainLogo} />
              </CenterWrapper>
            </Grid.Column>
            <Grid.Column verticalAlign='middle'>
              <RightWrapper>
                <SearchIcon>
                  <Icon size='large' name='search' />
                </SearchIcon>
                <Image src={BarcodeImage} size='mini' />
              </RightWrapper>
            </Grid.Column>
          </Grid.Row>
        </Grid>
      </Wrapper>
    )
  }
}
