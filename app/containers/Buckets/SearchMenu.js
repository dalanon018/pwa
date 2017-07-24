import React, { PureComponent, PropTypes } from 'react'
import styled from 'styled-components'

import { isEmpty } from 'lodash'
import { injectIntl, intlShape } from 'react-intl'
import {
  Icon,
  Grid
} from 'semantic-ui-react'

import messages from './messages'

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

const SearchColumnWrapper = styled(Grid.Column)`
  border: 1px solid  #F0F0F0;
`

const SearchContainer = styled.div`
  display: flex;
  justify-content: flex-start;
  align-items: center;
  height: 36px;
  padding: 0 5px;
`

const SearchInput = styled.input`
  color: #5B5B5B;
  font-size: 18px;
  letter-spacing: 1px;
  margin-left: 5px;
  width: 100%;

  &:focus {
    outline: none;
  }

  &::placeholder {
    letter-spacing: 1px;
    font-weight: 100;
  }
`

const CloseIcon = styled(Icon)`
  align-self: center;
`

class SearchMenu extends PureComponent {
  static propTypes= {
    hideBackButton: PropTypes.bool.isRequired,
    leftButtonAction: PropTypes.func.isRequired,
    intl: intlShape.isRequired
  }

  /**
   * handler wether to show the close button or not.
   */
  state = {
    dirty: false
  }

  _searchInput

  constructor () {
    super()

    this._inputReference = this._inputReference.bind(this)
    this._handleKeyPress = this._handleKeyPress.bind(this)
    this._clearInput = this._clearInput.bind(this)
  }

  _inputReference (inp) {
    this._searchInput = inp
  }

  _handleKeyPress (evt) {
    this.setState({
      dirty: !isEmpty(evt.target.value)
    })
  }

  _clearInput () {
    this._searchInput.value = ''
    this.setState({
      dirty: false
    })
  }

  render () {
    const { leftButtonAction, hideBackButton, intl } = this.props
    const { dirty } = this.state
    return (
      <Wrapper>
        <Grid>
          <Grid.Row>
            <Grid.Column verticalAlign='middle' width={2}>
              <LeftWrapper onClick={leftButtonAction} >
                <Hamburger>
                  <HamburgerSpan active={!hideBackButton}>toggle menu</HamburgerSpan>
                </Hamburger>
              </LeftWrapper>
            </Grid.Column>
            <SearchColumnWrapper className='padding__none' verticalAlign='middle' width={13}>
              <SearchContainer>
                <Icon name='search' color='black' size='large' />
                <SearchInput
                  innerRef={this._inputReference}
                  placeholder={intl.formatMessage(messages.searchPlaceHolder)}
                  onChange={this._handleKeyPress}
                />
                {
                  dirty &&
                  <CloseIcon
                    onClick={this._clearInput}
                    name='remove circle outline'
                    color='orange'
                    size='big' />
                }
              </SearchContainer>
            </SearchColumnWrapper>
          </Grid.Row>
        </Grid>
      </Wrapper>
    )
  }
}

export default injectIntl(SearchMenu)
