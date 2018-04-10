import React, { PureComponent } from 'react'
import PropTypes from 'prop-types'
import styled from 'styled-components'

import { isEmpty } from 'lodash'
import { injectIntl, intlShape } from 'react-intl'
import {
  Icon,
  Grid,
  Input,
  Image
} from 'semantic-ui-react'

import { FbEventTracking } from 'utils/seo'

import AccessView from 'components/Shared/AccessMobileDesktopView'
import CloseIcon from 'images/icons/close-white.svg'

import messages from './messages'

const Wrapper = styled.div`
  box-shadow: 1px 1px 5px rgba(174,174,174, 0.8);
  height: 50px;
  left: 0;
  padding: 10px;
  position: fixed;
  top: 0;
  width: 100%;
  z-index: 99;
`

const LeftWrapper = styled.div`
  display: flex;
  padding-left: 10px;

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
  cursor: pointer;
  transition: background 0.3s;

  &:focus {
    outline: none;
  }
`

const HamburgerSpan = styled.span`
  background-color: #FFFFFF;
  display: block;
  height: 2px;
  left: 2px;
  position: absolute;
  right: 2px;
  top: 12px;
  transform: ${({active}) => active ? 'rotate(180deg)' : 'none'};
  transition: transform 0.3s;

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
    top: ${({active}) => active ? '0' : '-8px'};
    transform: ${({active}) => active ? 'translateX(0) translateY(0) rotate(45deg)' : 'none'};
  }

  &::after {
    transform-origin: bottom right;
    transition: transform 0.3s, width 0.3s, bottom 0.3s;
    bottom: ${({active}) => active ? '0' : '-8px'};
    transform: ${({active}) => active ? 'translateX(0) translateY(0) rotate(-45deg)' : 'none'};
  }

`

const SearchContainer = styled.div`
  align-items: center;
  display: flex;
  height: 36px;
  justify-content: flex-start;
  padding: 0 5px;
`

const SearchInput = styled(Input)`
  font-size: 18px;
  letter-spacing: 1px;
  margin: 0 5px;
  width: 100%;

  input {
    border-radius: 4.5px !important;
    border: 0 !important;
  }

  @media (min-width: 1024px) {
    margin: 0;
  }
`

const ImageIcon = styled(Image)`
  align-items: center;
  display: flex !important;
  justify-content: center;
  margin-left: 22px !important;
  margin-right: 0 !important;
  width: 16px;
`

const InputContainer = styled.div`
  position: relative;
  width: 100%;

  .magnifier {
    position: absolute;
    right: 0;
    top: 8px;
    margin: 0;
  }

  @media (min-width: 1024px) {
    .magnifier {
      top: 9.5px !important;
    }
  }

  @media (max-width: 767px) {
    input {
      height: 41px;
    }
    .magnifier {
      top: 11px;
    }
  }
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
    dirty: false,
    searchValue: ''
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
      dirty: !isEmpty(evt.target.value),
      searchValue: evt.target.value
    })
  }

  _handleSearchProcess = (keyword) => {
    const { searchProduct, _handleSearchInputValue } = this.props
    FbEventTracking('Search', {
      search_string: keyword
    })

    _handleSearchInputValue(this.state.searchValue)

    return searchProduct({ id: keyword })
  }

  _handlePressSearch () {
    const { searchValue } = this.state
    if (searchValue) {
      // we will update our search key here.
      this._handleSearchProcess(searchValue)
    }
  }

  _handleKeyPress (e) {
    const code = e.keyCode || e.which

    if (code === 13 && e.target.value) {
      // we will update our search key here.
      this._handleSearchProcess(e.target.value)
    }
    return true
  }

  _clearInput () {
    const { clearSearch } = this.props
    this._searchInput.value = ''
    this.setState({
      dirty: false,
      searchValue: ''
    })
    clearSearch({})
  }

  render () {
    const { leftButtonAction, hideBackButton, intl } = this.props
    const { dirty, searchValue } = this.state

    return (
      <AccessView
        mobileView={
          <Wrapper className='background__primary'>
            <Grid>
              <Grid.Row>
                <Grid.Column className='padding__right--none' verticalAlign='middle' width={2}>
                  <LeftWrapper onClick={leftButtonAction} >
                    <Hamburger className='border__none'>
                      <HamburgerSpan className='background__secondary' active={!hideBackButton}>toggle menu</HamburgerSpan>
                    </Hamburger>
                  </LeftWrapper>
                </Grid.Column>
                <Grid.Column className='padding__none--horizontal' verticalAlign='middle' width={13}>
                  <SearchContainer>
                    <InputContainer>
                      <SearchInput
                        className='border__none'
                        ref={this._inputReference}
                        onChange={this._handleOnchange}
                        value={searchValue}
                        onKeyPress={this._handleKeyPress}
                        placeholder={intl.formatMessage(messages.searchPlaceHolder)}
                      />
                      <Icon className='magnifier' name='search' onClick={this._handlePressSearch} />
                    </InputContainer>
                    {
                      dirty &&
                      <ImageIcon
                        onClick={this._clearInput}
                        src={CloseIcon}
                        alt='CliQQ' />
                    }
                  </SearchContainer>
                </Grid.Column>
              </Grid.Row>
            </Grid>
          </Wrapper>
        }
        desktopView={
          <InputContainer>
            <SearchInput
              className='color__secondary border__none'
              ref={this._inputReference}
              onChange={this._handleOnchange}
              onKeyPress={this._handleKeyPress}
              placeholder={intl.formatMessage(messages.searchPlaceHolder)}
            />
            <Icon className='magnifier cursor__pointer' name='search' onClick={this._handlePressSearch} />
          </InputContainer>
        }
      />
    )
  }
}

export default injectIntl(SearchMenu)
