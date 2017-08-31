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
  border-bottom: 3px solid #8DC640;
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
  align-items: center;
  display: flex;
  height: 36px;
  justify-content: flex-start;
  padding: 0 5px;
`

const SearchInput = styled.input`
  border: 0;
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
    searchProduct: PropTypes.func.isRequired,
    clearSearch: PropTypes.func.isRequired,
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
    this._handleOnchange = this._handleOnchange.bind(this)
    this._handlePressSearch = this._handlePressSearch.bind(this)
    this._clearInput = this._clearInput.bind(this)
  }

  _inputReference (inp) {
    this._searchInput = inp
  }

  _handleOnchange (evt) {
    this.setState({
      dirty: !isEmpty(evt.target.value)
    })
  }

  _handlePressSearch () {
    const { searchProduct } = this.props
    if (this._searchInput.value) {
      // we will update our search key here.
      searchProduct({ id: this._searchInput.value })
    }
  }

  _handleKeyPress (e) {
    const { searchProduct } = this.props
    const code = e.keyCode || e.which

    if (code === 13 && e.target.value) {
      // we will update our search key here.
      searchProduct({ id: e.target.value })
    }
    return true
  }

  _clearInput () {
    const { clearSearch } = this.props
    this._searchInput.value = ''
    this.setState({
      dirty: false
    })
    clearSearch({})
  }

  componentDidMount () {
    // Evergreen event listener || IE8 event listener
    const addEvent = this._searchInput.addEventListener || this._searchInput.attachEvent
    addEvent('keypress', this._handleKeyPress, false)
  }

  componentWillUnmount () {
    if (this._searchInput) {
      // Reduce any memory leaks
      const removeEvent = this._searchInput.removeEventListener || this._searchInput.detachEvent
      removeEvent('keypress', this._handleKeyPress)
    }
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
            <SearchColumnWrapper className='padding__none--horizontal' verticalAlign='middle' width={13}>
              <SearchContainer>
                <Icon name='search' color='black' size='large' onClick={this._handlePressSearch} />
                <SearchInput
                  innerRef={this._inputReference}
                  placeholder={intl.formatMessage(messages.searchPlaceHolder)}
                  onChange={this._handleOnchange}
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
