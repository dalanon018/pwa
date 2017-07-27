/**
*
* PopupSlide
*
*/

import React from 'react'
// import styled from 'styled-components';

import { FormattedMessage } from 'react-intl'
import messages from './messages'

import Button from 'components/Button'
import CloseButton from 'components/CloseButton'
import Input from 'components/InputField'
import Checkbox from 'components/CheckboxField'

import BannerBg from 'images/modal-bg-orange.png'
import MobileIcon from 'images/icons/mobile-icon.svg'

import { Image } from 'semantic-ui-react'

// import { setItem } from 'utils/localStorage'

import {
  PopupWrapper,
  PopupContainer,
  InputWrapper,
  BannerHeader,
  TitleHead,
  TextWrapper,
  PopupContent } from './styles'

class PopupSlide extends React.Component {
  constructor (props) {
    super(props)
    this.state = {
      value: '',
      toggle: true,
      check: false
    }
    this.handleInput = this.handleInput.bind(this)
    this.handleCheck = this.handleCheck.bind(this)
    this.handleDisable = this.handleDisable.bind(this)
    this.handleSubmit = this.handleSubmit.bind(this)
    // this.setLocalStorage = this.setLocalStorage.bind(this)
  }

  handleCheck (e, data) {
    this.setState({
      check: data.checked
    }, () => this.handleDisable())
  }

  handleInput (e) {
    if (e.target.value.length <= 10) {
      e.preventDefault()
      this.setState({
        value: e.target.value,
        inputed: this.state.value
      }, () => this.handleDisable())
    }
  }

  handleDisable () {
    if ((this.state.value.length === 10 && this.state.value.charAt(0) === '9') && this.state.check === true) {
      this.setState({
        toggle: false
      })
    } else {
      this.setState({
        toggle: true
      })
    }
  }

  // setLocalStorage () {
  //   console.log('asd', this.props.product)
  //   try {
  //     setItem('currentProduct', this.props.product)
  //   }
  //   catch {}
  // }

  handleSubmit () {
    this.props.submit()
  }

  render () {
    const { toggle, onClose } = this.props
    const label = `I have read and accepted the `

    return (
      <PopupWrapper toggle={toggle}>
        <BannerHeader background={BannerBg}>
          <span>
            <Image src={MobileIcon} />
          </span>
        </BannerHeader>
        <PopupContainer>
          <PopupContent>
            <TextWrapper>
              <TitleHead>
                <FormattedMessage {...messages.register} />
              </TitleHead>
              <p><FormattedMessage {...messages.label} /></p>
            </TextWrapper>

            <InputWrapper>
              <FormattedMessage {...messages.phonePrefix} />
              <Input
                type='number'
                value={this.state.value}
                onChange={this.handleInput}
                placeholder='9XXXXXXXXX' />
            </InputWrapper>
            <Checkbox
              className='margin__bottom-positive--20'
              onChange={this.handleCheck}
              label={label} />
            <Button
              type='submit'
              disabled={this.state.toggle}
              primary
              fluid
              onClick={this.handleSubmit}>
                SUBMIT
              </Button>

            <CloseButton close={onClose} />
          </PopupContent>
        </PopupContainer>
      </PopupWrapper>
    )
  }
}

PopupSlide.propTypes = {

}

export default PopupSlide
